# VSR Associates

Next.js website for Vrinda Shree Radha Associates: financial-services discovery, loan/insurance/investment information, EMI calculator, enquiry capture, provider comparisons, and a staff administration portal.

## Project status

This repository is being prepared for production. **Do not treat the current SQLite setup as production-ready on Vercel.** Serverless instances have ephemeral filesystems; enquiry/admin data can be lost or split across instances. Move the database to managed PostgreSQL (or another supported persistent service) before accepting live customer enquiries.

Email, WhatsApp, and SMS delivery adapters are not implemented yet. The app records notification attempts as pending; setting provider credentials alone does not send messages.

## Stack

- Next.js App Router 16, React 19, TypeScript
- Tailwind CSS 4, Framer Motion, React Three Fiber / Three.js
- SQLite via `better-sqlite3` (local/dev only until persistent DB migration)
- Zod validation, bcrypt password hashing, JWT admin sessions
- Vitest unit tests, ESLint, GitHub Actions CI

## Quick start

Requirements: Node.js 20.9+ (use Node 22 LTS for local development and CI).

```bash
npm ci
cp .env.example .env.local
# Replace all example credentials with unique local-only values.
npm run dev
```

Open http://localhost:3000.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |
| `npm run build` | Create an optimized production build |
| `npm start` | Serve the production build locally |

Run all checks before proposing a change:

```bash
npm run lint
npm test
npm run build
```

## Environment variables

See [`.env.example`](./.env.example) for the full variable list. Never commit `.env.local`, production credentials, JWT secrets, API tokens, or database URLs.

- `ADMIN_JWT_SECRET`: at least 32 characters in production.
- `ADMIN_DEFAULT_EMAIL` and `ADMIN_DEFAULT_PASSWORD`: used only when the database is first initialized and no admin account exists; password must be at least 12 characters.
- Changing bootstrap credentials does not change an existing admin's password.
- `NEXT_PUBLIC_SITE_URL`: canonical site URL used for metadata.

## Repository map

```text
app/                 App Router pages, layouts, API routes, sitemap/robots
  api/               Public enquiry endpoint and admin APIs
  admin/             Staff dashboard and management screens
  loans/             Loan discovery and detail pages
  insurance/         Insurance discovery and detail pages
  investments/       Investment discovery and detail pages
components/
  3d/                Three.js hero scene and fallback
  brand/             Brand and logo components
  calculator/        EMI calculator UI
  forms/             Reusable enquiry form
  layout/             Navbar and footer
  providers/         Provider comparison UI
lib/
  auth/              JWT session and role permissions
  calculator/        EMI calculation functions
  data/              Service directory content
  db/                Database schema initialization and seed data
  notifications/     Notification logging/dispatch adapter
  validation/        Zod request schemas
tests/               Unit tests for auth, calculations and validation
docs/                Deployment notes and codebase audit
public/              Static assets
```

## Local database

The development database defaults to `data/vsr.db` and is ignored by Git. Keep it backed up locally. SQLite is not suitable for durable writes on Vercel serverless functions; use managed PostgreSQL and a proper migration before production.

## Deployment checklist

1. Configure the correct GitHub repository and a single Vercel production project.
2. Set production environment variables in Vercel; never use the sample values from `.env.example`.
3. Migrate SQLite data access to a persistent managed database and verify migrations/backups.
4. Add rate limiting and abuse protection to public enquiry and admin login endpoints.
5. Configure real email/WhatsApp/SMS integrations and verify provider-confirmed delivery.
6. Run CI (lint, tests, production build), test the Vercel Preview, then promote to production.
7. Verify admin login, enquiry creation, CSV export, offers/providers management, mobile layouts, metadata, sitemap and robots.
8. Confirm the custom domain's ownership/DNS and HTTPS before announcing launch.

## Financial content disclaimer

Rates, eligibility and offer terms must be verified against current lender/insurer sources before publishing. Never imply that VSR Associates itself sanctions loans, underwrites insurance, or guarantees investment returns.
