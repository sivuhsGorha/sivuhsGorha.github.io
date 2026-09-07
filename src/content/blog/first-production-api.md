---
title: "Notes on writing my first production-facing API"
pubDate: 2026-08-18
description: "What changed when an API stopped being a tutorial and started having callers."
---

A tutorial API can return whatever JSON you like. A production-facing one has callers who cache, retry, and file tickets when a field moves.

The first pass I shipped was a happy path: one resource, one verb, one 200. The second pass was the actual work:

- Status codes that match the failure. 400 for a bad body, 404 when the id does not exist, 409 when the state cannot change.
- Validation at the edge, not after the database round-trip.
- A request id on every response so a report of "it failed" has something to grep.

I still over-design sometimes. The correction I keep making is: name the contract, freeze it, then keep the internals boring. Callers should not have to know how I store a row.
