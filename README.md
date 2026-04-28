# Heartbeat of God Foundation Landing Page

Static Vercel-ready landing page for Heartbeat of God Foundation / Heartbeat of God Ministry.

## Files

- `index.html` - main public landing page
- `assets/hbg-logo-reconstructed.svg` - reconstructed HBG logo
- `assets/hbg-logo.png` - original logo reference
- `assets/pastor-amos-cinematic.png` - cinematic portrait asset
- `vercel.json` - Vercel static routing and asset cache configuration

## Deploy To Vercel

1. Create a new Vercel project.
2. Import this folder or push it to GitHub and import the repo.
3. Framework preset: `Other`
4. Build command: leave empty
5. Output directory: leave empty or `.`
6. Deploy.

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
