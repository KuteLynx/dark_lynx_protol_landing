# ADR 0002: Split Frontend and Backend Deployments

**Status:** Accepted  
**Date:** 2025-2026

## Context

The journal feature requires a database-backed API. GitHub Pages only serves static files. Options: serverless functions on GitHub Pages, a separate backend, or a full-stack platform.

## Decision

Split into two deployments:

1. **Frontend**: GitHub Pages (static SvelteKit site via `adapter-static`)
2. **Backend**: Render.com (standalone Node.js HTTP server for journal API)

The frontend fetches journal data client-side from the Render endpoint. The backend is a minimal Node.js server using `@neondatabase/serverless` to query Neon PostgreSQL.

## Consequences

- Frontend remains purely static, fast, and free
- Backend requires a separate deployment and monitoring
- CORS must be configured on the backend for browser requests
- Two distinct domains: frontend (darklynxprotocol.com) and backend (dark-lynx-protol-landing.onrender.com)
- A GitHub Actions workflow builds the frontend and deploys to GitHub Pages
