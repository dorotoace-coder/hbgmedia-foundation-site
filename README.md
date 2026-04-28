# Heartbeat of God Foundation / HBG Media Command Center

Next.js app for Heartbeat of God Foundation / Heartbeat of God Ministry.

Phase 1 includes the public landing page plus the first HBG Media Command Center dashboard structure.
Phase 2 adds Supabase-ready forms, schema, and server actions for ministry data intake.

## Routes

- `/` - public HBG Foundation landing page
- `/dashboard` - Media Command Center overview
- `/dashboard/sermons` - sermon intake structure
- `/dashboard/clt` - CLT devotional builder structure
- `/dashboard/video-studio` - Remotion/video template structure
- `/dashboard/calendar` - weekly posting rhythm
- `/dashboard/training` - media worker training academy structure
- `/dashboard/reports` - weekly reporting structure

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
```

## Deploy To Vercel

1. Create a new Vercel project.
2. Import this folder or push it to GitHub and import the repo.
3. Framework preset: `Next.js`
4. Build command: `npm run build`
5. Output directory: leave as Vercel default.
6. Deploy.

## Assets

- `public/assets/hbg-logo-reconstructed.svg` - reconstructed HBG logo
- `public/assets/pastor-amos-cinematic.png` - cinematic Pastor Amos portrait
- `assets/` - original source assets kept for reference

## Supabase Setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. In Supabase project settings, copy:
   - Project URL
   - anon public key
   - service role key
5. In Vercel project settings, add:

```text
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The service role key is used only in server actions. Do not expose it publicly.

## Phase 2 Data Tables

- `prayer_requests`
- `first_timers`
- `sermons`
- `clt_drafts`
- `media_tasks`
- `weekly_reports`

Current public forms:

- Prayer Request
- First-Timer Card

Current dashboard forms:

- Sermon Intake
- CLT Draft
- Media Task
- Weekly Report

## Connect Domain

In Vercel:

1. Open the project.
2. Go to `Settings` -> `Domains`.
3. Add `heartbeatofgod.foundation`.
4. Add `www.heartbeatofgod.foundation`.

In Namecheap DNS, use the records Vercel gives you. Usually:

```text
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic
```

```text
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

After DNS propagates, the site should load at:

- `https://heartbeatofgod.foundation`
- `https://www.heartbeatofgod.foundation`
