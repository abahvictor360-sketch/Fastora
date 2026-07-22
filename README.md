# Fastora

Digital services & social media agency site. Next.js 16 (App Router) + Payload CMS 3 + Supabase Postgres, deployed on Vercel.

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript + Tailwind CSS v4
- **Payload CMS 3** embedded in the same app, admin panel at `/admin`
- **Supabase Postgres** via `@payloadcms/db-postgres`
- **Supabase Storage** (S3-compatible) for media in production, local `/public/media` in dev
- **Resend** for the contact-form admin notification email

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in real values (see below).
3. Run migrations: `npm run payload -- migrate` (see the pooler note below — use the **session** pooler, port 5432, just for this command).
4. `npm run dev` and visit `http://localhost:3000/admin` to create the first admin user.
5. Optional: `npm run seed` to populate Site Settings, sample services, case studies, testimonials, and a blog post.

### Environment variables

All variables are documented inline in [`.env.example`](.env.example). The important ones:

| Variable | Notes |
|---|---|
| `DATABASE_URI` | Supabase **Transaction pooler** connection string (port **6543**) — for `next dev`, `next build`, and Vercel. Next.js opens several parallel connection pools at once (build workers, dev, serverless functions); the session-mode pooler (5432) and direct connection both cap total clients too low for that and you'll hit "max clients reached". Only switch to the session pooler transiently to run `payload migrate`. |
| `PAYLOAD_SECRET` | Random string, e.g. `openssl rand -base64 32`. |
| `PREVIEW_SECRET` | Random string, same command. Required for draft/live-preview links. |
| `SUPABASE_S3_*` | Only needed for persistent media storage (required in production — Vercel's filesystem is ephemeral and read-only). Get these from Supabase → Project Settings → Storage → S3 Connection, after creating a bucket. |
| `RESEND_API_KEY`, `ADMIN_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL` | Contact form emails. Ships with a placeholder key — replace before going live. If unset, submissions still save to the CMS, just without an email notification. |

## Deploying (Vercel + Supabase)

1. **Supabase**: create a project (or use the existing one), then in Project Settings → Database, grab the **Transaction pooler** connection string (port 6543) for `DATABASE_URI`.
2. **Vercel**: import this GitHub repo as a new project (vercel.com → Add New → Project → import from Git).
3. In the Vercel project's Settings → Environment Variables, add every variable from `.env.example` with real values (same `DATABASE_URI`, a fresh `PAYLOAD_SECRET`/`PREVIEW_SECRET`, real Supabase Storage S3 credentials, real Resend key). Set `NEXT_PUBLIC_SERVER_URL` to the production domain Vercel gives you (or your custom domain).
4. Deploy. Vercel will build with `next build`.
5. Run migrations against the production database once, from your machine: point `.env`'s `DATABASE_URI` at the **session pooler** (port 5432) temporarily, run `npm run payload -- migrate`, then switch back to 6543.
6. Visit `https://<your-domain>/admin` and create the first admin user, then (optionally) `npm run seed` against the production `DATABASE_URI` to seed initial content — or just build it out by hand in the admin panel.

## Admin guide

**Log in**: go to `/admin` and sign in with the account you created on first run (Users collection).

**Change the logo**: `/admin` → Site Settings → Brand tab → upload "Logo (for light backgrounds)" and "Logo (for dark backgrounds)". Changes apply across the whole site immediately.

**Edit page text**: `/admin` → Pages → open **Home**, **About**, or **Contact** → edit the Hero tab and the block list under the Content tab. Each block (Services Overview, Why Fastora, Selected Work, Testimonials, FAQ, Latest Insights, CTA) has its own editable fields. Services, Case Studies, and Testimonials are edited in their own collections in the sidebar, not inside Pages.

**Recolor the site**: `/admin` → Site Settings → Colors tab. Every field is a hex value; leave any field blank to fall back to the built-in theme. Saves apply site-wide.

**Publish a blog post**: `/admin` → Posts → Create New → fill in title, hero image, content, category, tags, and SEO tab → set status to **Published** (top-right) → Save. It's live at `/insights/<slug>` immediately (or use "Schedule publish" to publish later).

**View contact form submissions**: `/admin` → Inquiries.
