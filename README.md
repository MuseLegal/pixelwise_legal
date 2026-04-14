# Pixelwise Legal MVP

AI-native law firm web app for startups and growth-stage companies. Built with Next.js App Router, TypeScript, Tailwind, Supabase, Stripe, and Resend.

## Features

- Premium minimalist marketing site
- Auth portal (sign up / sign in)
- Engagement clickwrap flow with terms versioning and acceptance logging
- Client dashboard + matter intake + status tracking
- Matter details (comments/files/payments)
- Admin panel for matter operations
- Modular Slack service layer (mocked now, OAuth-ready later)
- Stripe checkout endpoint + webhook placeholder
- Resend transactional email service wrapper

## Tech Stack

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth, Postgres, Storage)
- Stripe
- Resend
- React Hook Form + Zod (dependencies included for form extension)

## Local Setup

1. Copy env file:

```bash
cp .env.example .env.local
```

2. Fill in Supabase/Stripe/Resend credentials.

3. Install dependencies:

```bash
npm install
```

4. Run app:

```bash
npm run dev
```

## Supabase Setup

1. Create Supabase project.
2. Run SQL migration in `supabase/migrations/001_init.sql`.
3. Run seed script in `supabase/seed.sql`.
4. Configure Storage bucket for matter files (e.g., `matter-files`) and tighten policies.

## Vercel Deployment

1. Import this repo to Vercel.
2. Add environment variables from `.env.example`.
3. Deploy.
4. Add Stripe webhook endpoint:
   - `https://<your-domain>/api/stripe/webhook`

## Stripe Notes

- Current checkout uses dynamic `price_data` and `PRICE_MAP` in `lib/stripe.ts`.
- For production, replace with fixed Stripe Price IDs and map by matter type.
- Webhook route includes signature verification and TODO hook for payment persistence.

## Slack Integration Notes

`lib/slack/service.ts` is intentionally modular for future production rollout:
- Slack OAuth token exchange
- workspace/channel provisioning
- posting matter updates to channel

## File Upload Notes

`/api/upload` is a placeholder route for signed URL generation. Implement Supabase signed upload URL flow and persist metadata to `matter_files`.
