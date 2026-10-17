# Vrinda Shree Radha Associates (VSR Associates)

A Next.js financial-services discovery website with loan, insurance and investment information, 3D hero visuals, EMI calculators, provider comparisons, customer enquiry capture, and a staff administration portal.

## Stack

- Next.js App Router, React, TypeScript
- Tailwind CSS, Framer Motion, React Three Fiber / Three.js
- SQLite via `better-sqlite3`
- Zod validation, bcrypt password hashing, JWT admin sessions
- Vitest unit tests and ESLint

## Local setup

Use a Node.js version compatible with the project's Next.js version.

```bash
npm ci
```

Create a local `.env.local` (never commit it) with unique values:

```dotenv
ADMIN_JWT_SECRET=replace-with-a-random-secret-at-least-32-characters
ADMIN_DEFAULT_EMAIL=your-admin-email@example.com
ADMIN_DEFAULT_PASSWORD=replace-with-a-unique-password-at-least-12-chars
# Optional: create an enquiry-manager account on first database initialization
ADMIN_MANAGER_EMAIL=your-manager-email@example.com
ADMIN_MANAGER_PASSWORD=another-unique-password-at-least-12-chars
ADMIN_NOTIFICATION_EMAIL=your-team@example.com
```

The admin accounts are bootstrapped only when the database has no admin users. If a database already exists, changing bootstrap variables does **not** change existing passwords; use a controlled password-reset procedure.

```bash
npm run dev
npm run lint
npm test
npm run build
```

The SQLite database is stored at `data/vsr.db`. Keep that directory on persistent storage. Serverless deployments with ephemeral filesystems can lose data or create separate databases across instances; use a managed persistent database before production deployment.

## Notification integrations

Enquiry notifications are currently logged as pending unless a real provider integration is implemented. Setting SMTP, WhatsApp, or SMS environment variables alone does not send messages. Do not tell customers a notification was delivered until a provider API call confirms it.

## Production checklist

- Configure `ADMIN_JWT_SECRET` (at least 32 characters) and unique admin credentials in deployment environment variables.
- Use persistent database storage; verify backups and restore procedures.
- Configure real email/WhatsApp/SMS providers and test delivery end-to-end.
- Add rate limiting and abuse protection to public enquiry and admin-login endpoints.
- Review lender/insurer rate claims and source dates before publishing.
- Run lint, unit tests, and a production build before release.

## Project routes

- `/` – public landing page
- `/loans`, `/insurance`, `/investments` – service discovery
- `/emi-calculator` – EMI estimator
- `/apply`, `/contact` – enquiry flows
- `/admin/login`, `/admin/dashboard` – staff portal
