# Production Node.js API Starter

[![CI](https://github.com/ManikandaMkM/node-production-api-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/ManikandaMkM/node-production-api-starter/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-0B6E63)](LICENSE)

A deliberately small Express 5 starter demonstrating production concerns often missing from hello-world APIs: validated configuration, structured logging, request IDs, secure defaults, consistent errors, health probes, graceful shutdown, tests, CI, and a non-root container.

## Quick start

```bash
cp .env.example .env
npm install
npm run dev
```

```bash
curl http://localhost:3000/health/ready
curl -X POST http://localhost:3000/api/v1/echo \
  -H 'content-type: application/json' \
  -d '{"message":"hello"}'
```

## Included patterns

- Express 5 with versioned routes
- Zod environment and request validation
- Helmet security headers and disabled framework fingerprinting
- JSON logs with sensitive-header redaction
- Request correlation through `x-request-id`
- Stable error envelopes that avoid leaking internals
- Separate liveness and readiness endpoints
- Bounded JSON bodies and configurable proxy trust
- Graceful `SIGTERM`/`SIGINT` shutdown
- Vitest and Supertest coverage
- Least-privilege container runtime
- Dependency-cached GitHub Actions CI

## Response shape

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body is invalid",
    "requestId": "d36760ab-5a5d-45e3-aaf7-0c58ad6d020e"
  }
}
```

## Production checklist

This starter provides foundations, not a universal security claim. Before launch, add authentication and authorization for your domain, datastore readiness checks, rate limiting at the edge, CORS rules, secret management, observability export, backups, dependency scanning, and a deployment-specific rollback plan.

## Design principles

1. Fail fast when configuration is invalid.
2. Make every request traceable without logging secrets.
3. Keep operational probes independent from business routes.
4. Return useful client errors and private server errors.
5. Make shutdown behavior explicit and testable.

Built as a public engineering reference by [Manikandan Menon](https://github.com/ManikandaMkM).
