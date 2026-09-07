---
title: "What I learned debugging a race condition I didn't know I'd written"
pubDate: 2026-09-01
description: "A short post-mortem on a concurrent bug that looked fine in the logs."
---

The logs said the job had finished. The database said it had finished twice.

I had written a scheduled task that checked "is this still pending?" and then marked it complete. Under load, two workers both saw pending, both did the work, and both wrote success. Nothing crashed. The numbers just drifted.

What I would do differently next time:

- Treat the status update as the lock. One `UPDATE … WHERE status = pending` that returns a row count, not a read followed by a write.
- Add an idempotency key so the same work cannot land twice even if the scheduler retries.
- Log the worker id on every transition. "It's fine" is not a state; it is a missing field.

I am still early at this. The useful part was slower than the panic: read the two timestamps, then the two writes, then admit the code I trusted was racing with a copy of itself.
