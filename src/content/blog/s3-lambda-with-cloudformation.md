---
title: "S3 upload to Lambda, defined in one CloudFormation template"
pubDate: 2026-10-12
description: "A small CloudFormation stack that triggers a Lambda function when a file lands in S3, and the three gotchas worth knowing before you write it."
tags: ["aws", "cloudformation", "lambda", "s3"]
---

I am currently working at Future ProTechY, where I work with AWS actively, and I am still learning it as I go. One pattern I keep running into is this one: a file lands in S3, a Lambda function runs. Writing it as a CloudFormation template instead of clicking through the console means the whole thing can be deleted and rebuilt in one command. This is a small, generic version of that pattern, written to make sure I understand it properly.

## The template

Four resources: a private bucket, a Lambda function, the IAM role the function runs as, and a permission that lets S3 invoke the function.

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: S3 upload triggers a Lambda function

Resources:
  UploadsBucket:
    Type: AWS::S3::Bucket
    DependsOn: InvokePermission
    Properties:
      BucketName: !Sub "${AWS::StackName}-uploads-${AWS::AccountId}"
      PublicAccessBlockConfiguration:
        BlockPublicAcls: true
        BlockPublicPolicy: true
        IgnorePublicAcls: true
        RestrictPublicBuckets: true
      NotificationConfiguration:
        LambdaConfigurations:
          - Event: "s3:ObjectCreated:*"
            Function: !GetAtt ProcessorFunction.Arn

  ProcessorRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: "2012-10-17"
        Statement:
          - Effect: Allow
            Principal:
              Service: lambda.amazonaws.com
            Action: "sts:AssumeRole"
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

  ProcessorFunction:
    Type: AWS::Lambda::Function
    Properties:
      FunctionName: !Sub "${AWS::StackName}-processor"
      Runtime: python3.12
      Handler: index.handler
      Role: !GetAtt ProcessorRole.Arn
      Code:
        ZipFile: |
          import urllib.parse

          def handler(event, context):
              for record in event["Records"]:
                  bucket = record["s3"]["bucket"]["name"]
                  key = urllib.parse.unquote_plus(record["s3"]["object"]["key"])
                  size = record["s3"]["object"].get("size", 0)
                  print(f"New object: s3://{bucket}/{key} ({size} bytes)")

  InvokePermission:
    Type: AWS::Lambda::Permission
    Properties:
      FunctionName: !Ref ProcessorFunction
      Action: "lambda:InvokeFunction"
      Principal: s3.amazonaws.com
      SourceAccount: !Ref AWS::AccountId
      SourceArn: !Sub "arn:aws:s3:::${AWS::StackName}-uploads-${AWS::AccountId}"
```

## Deploy and test

I wrote this template from the AWS documentation and have not yet run this exact version end to end, so treat it as a starting point and check the gotchas below if something fails.

```bash
aws cloudformation deploy \
  --template-file template.yaml \
  --stack-name s3-lambda-demo \
  --capabilities CAPABILITY_IAM

echo "hello" > hello.txt
aws s3 cp hello.txt s3://s3-lambda-demo-uploads-<your-account-id>/

aws logs tail /aws/lambda/s3-lambda-demo-processor --since 5m
```

The log line should show the bucket, the key and the size of `hello.txt`.

## Three gotchas

**1. The circular dependency.** The obvious way to write this is to point the permission's `SourceArn` at `!GetAtt UploadsBucket.Arn`. But the bucket's notification config needs the function, and S3 checks that it is allowed to invoke the function when the notification is created. So the permission has to exist before the bucket, and it cannot reference the bucket. The fix above is to build the bucket ARN from the same `!Sub` string used for the bucket name, and to add `DependsOn: InvokePermission` on the bucket.

**2. Keys in the event are URL-encoded.** A file called `my report.pdf` arrives as `my+report.pdf`. Run the key through `unquote_plus` before you use it to call `get_object`, or you will get a "key not found" error on perfectly good files.

**3. Do not write back to the same prefix you are watching.** If the function writes its output into the bucket and the trigger is `ObjectCreated:*` on the whole bucket, every output file triggers the function again. Use a separate bucket, or add a `Filter` on a prefix such as `incoming/` and write results elsewhere.

One more practical note: `aws cloudformation delete-stack` will fail on a bucket that still has files in it. Empty it first with `aws s3 rm s3://<bucket> --recursive`.

## What I would add next

- A prefix and suffix filter on the trigger, so only `incoming/*.csv` runs the function.
- A dead-letter queue, so failed invocations are kept instead of lost.
- Least-privilege read access for the function, if it needs to open the uploaded file.
