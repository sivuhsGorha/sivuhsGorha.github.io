export type Project = {
    id: string;
    title: string;
    summary: string;
    stack: string[];
    repoUrl?: string;
    liveUrl?: string;
    badge?: string;
    client?: string;
    deliverables?: string[];
    metrics?: string[];
    architectureDiagram?: {
        nodes: { id: string; label: string; type: 'client' | 'gateway' | 'app' | 'db' | 'cloud' }[];
        flow: string;
    };
    architectureDeepDive?: {
        overview: string;
        schemaHighlights?: string;
        securityFocus?: string;
    };
};

export const projects: Project[] = [
    {
        id: 'P.01',
        title: 'Asante Financial Services Engine & Loan Portal',
        badge: 'Commercial Financial Platform · Freelance Delivery',
        client: 'Asante Financial Services (PTY) LTD',
        summary:
            'Engineered the complete commercial web platform and multi-step customer loan application engine for Asante Financial Services — a South African short-term personal loans provider. Built a 3NF normalized MySQL database schema featuring field-level AES-256-GCM encryption for customer PII (ID numbers, bank details, salary), blind index searching (_hash), custom RBAC back-office management, TOTP/SMS Multi-Factor Authentication, POPIA/DSAR compliance tools, WhatsApp/WinSMS notification integrations, and security middleware (CSP nonces, CSRF protection, rate limiting). Delivered the complete platform independently end-to-end: from architectural design through to production server hardening and backup automation scripts.',
        stack: ['PHP 8.x', 'MySQL (3NF)', 'AES-256-GCM Encryption', 'JavaScript (ES6+)', 'Apache / Nginx', 'TailwindCSS', 'WhatsApp & WinSMS API', 'POPIA / DSAR'],
        metrics: [
            'AES-256-GCM PII Encryption',
            'POPIA & DSAR Compliance',
            'Sub-15ms Query Latency',
            'RBAC & Multi-Factor Auth'
        ],
        deliverables: [
            'Dynamic multi-step borrower loan application engine with document upload MIME validation',
            'AES-256-GCM field-level PII encryption architecture with blind indexing (_hash) for exact search',
            'Customer portal with TOTP/SMS MFA, application tracking, auto-save drafts & DSAR export',
            'Admin back-office dashboard with role-based access control (RBAC), session event tracking & audit logs',
            'Automated WhatsApp API & WinSMS integration for instant customer status notifications',
            'Operational shell utilities for automated MySQL backups, log rotation, cron setup & DB indexing'
        ],
        architectureDiagram: {
            nodes: [
                { id: 'client', label: 'Borrower Portal / Web Client', type: 'client' },
                { id: 'gateway', label: 'Security Middleware (CSP Nonce, CSRF, RateLimiter)', type: 'gateway' },
                { id: 'app', label: 'PHP 8 Engine (Auth, RBAC, PiiEncryptor)', type: 'app' },
                { id: 'db', label: 'MySQL Relational Database (AES-256-GCM PII + 3NF)', type: 'db' }
            ],
            flow: 'Borrower Payload → Security Middleware (CSRF + CSP) → PiiEncryptor (AES-256-GCM) → 3NF MySQL Database'
        },
        architectureDeepDive: {
            overview: 'Designed with an enterprise-grade security posture including defensive middleware (SecurityHeaders.php, RateLimiter.php), session event logging (AuditLogger.php), and role-based permissions (RbacMiddleware.php).',
            schemaHighlights: '3NF normalized relational schema protecting sensitive PII (id_number, bank_account_number, salary_details, residential_address) with field-level AES-256-GCM encryption and blind index searching (_hash) to enable sub-15ms queries without storing unencrypted PII.',
            securityFocus: 'Fully compliant with South African POPIA legislation featuring Data Subject Access Request (DSAR) export utilities, automated account deletion/anonymization workflows, TOTP/SMS Multi-Factor Authentication (MfaManager.php), and automated database backup/restore scripts (backup-db.sh, restore-db.sh).'
        },
        liveUrl: 'https://asantefs.co.za',
    },
    {
        id: 'P.02',
        title: 'Production AWS Cloud Infrastructure & Automated CI/CD Pipeline',
        badge: 'Cloud Architecture · Systems & DevOps',
        client: 'Future ProTechY / Enterprise Deployment',
        summary:
            'Hands-on practical AWS cloud infrastructure setup for high-availability application hosting. Designed isolated Virtual Private Cloud (VPC) subnets, security group rules, EC2 compute instances with Nginx reverse proxies, and automated GitHub Actions CI/CD workflows for seamless code deployment.',
        stack: ['AWS VPC', 'AWS EC2', 'Application Load Balancer', 'Route 53', 'Docker', 'GitHub Actions', 'Linux', 'Nginx'],
        metrics: [
            'Multi-Subnet VPC Zoning',
            'Zero-Downtime Deployments',
            'Strict Security Group Rules',
            'Nginx Reverse Proxy Tuning'
        ],
        deliverables: [
            'Isolated VPC architecture with public/private subnet zoning & NAT gateway routing',
            'EC2 instance provisioning, system hardening, SSH key rotation & Nginx reverse proxy',
            'Automated CI/CD build, test & deployment pipeline triggered via GitHub Actions',
            'Route 53 DNS routing, ACM SSL/TLS certificate termination & automated health checks'
        ],
        architectureDiagram: {
            nodes: [
                { id: 'dns', label: 'Route 53 / SSL Gateway', type: 'cloud' },
                { id: 'alb', label: 'Application Load Balancer', type: 'gateway' },
                { id: 'ec2', label: 'EC2 Instances (Docker Container Clusters)', type: 'app' }
            ],
            flow: 'User Request → Route 53 DNS → ALB SSL Termination → EC2 Docker Containers'
        },
        architectureDeepDive: {
            overview: 'Built using AWS infrastructure best practices with clear separation between public-facing entrypoints and internal compute nodes.',
            schemaHighlights: 'Automated GitHub Actions runner executes linting, container builds, and SSH deployment commands to update live services smoothly.',
            securityFocus: 'Strict security group rules opening port 443/80 only to ALB, and port 22 restricted exclusively to VPN/bastion access.'
        },
        repoUrl: 'https://github.com/sivuhsGorha',
    },
];
