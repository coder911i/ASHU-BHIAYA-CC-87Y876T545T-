# Codebase audit and production blockers

## Fixes included in the audit branch

- `/offers` is dynamic-rendered because it reads database-backed offer content; this prevents SQLite bootstrap from running during static prerender.
- Admin enquiry listing/update hardening: filter validation, safer pagination, input validation, bounded CSV export, spreadsheet formula neutralization, no-store headers, and audit IDs that avoid timestamp collisions.
- Investment detail pages: improved contrast for headings, body copy, objectives, eligibility, FAQs, and the statutory disclaimer.
- Added CI workflow, environment-variable template, repository map and deployment documentation.

## Known blockers / work remaining

### P0 — persistence and database architecture
The app uses `better-sqlite3` and writes to a local file under `data/`. Vercel serverless filesystem is not durable shared database storage. Before production lead capture, migrate to managed PostgreSQL, implement schema migrations, test concurrent writes, and define backup/restore.

### P1 — API abuse protection
Public enquiry and admin login need rate limiting and request-size limits. Duplicate detection currently depends on the database and should not be treated as complete spam protection.

### P1 — notification delivery
`lib/notifications/delivery.ts` records pending statuses but does not send email, WhatsApp, or SMS. Add provider adapters and only mark delivery confirmed after a successful provider response.

### P1 — API input validation
Admin offer/provider create and update routes should use Zod schemas and return consistent 400/404 responses for malformed input and missing records. Ensure every admin mutation has appropriate role checks and audit logs.

### P1 — deployment configuration
Set unique `ADMIN_JWT_SECRET` (32+ characters), bootstrap admin email/password (password 12+ characters), and canonical site URL in Vercel. Bootstrap credentials only seed an empty database; changing env values does not reset an existing account.

### P2 — verification
The GitHub integration cannot execute a local Node build in this workflow. The new CI workflow is intended to run lint, tests, and production build; inspect its actual results before merging. Browser QA and end-to-end tests are still required for admin login, enquiry creation, export, provider/offer management, and mobile layouts.

## Recommended validation order

1. `npm ci`
2. `npm run lint`
3. `npm test`
4. `npm run build`
5. Vercel Preview smoke tests
6. Database migration and end-to-end tests before Production
