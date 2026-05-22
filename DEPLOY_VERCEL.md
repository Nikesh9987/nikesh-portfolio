# Vercel Deployment Guide

> Deploy your portfolio to Vercel in under 5 minutes — free, fast, automatic.

Vercel is the **recommended** platform for Next.js projects. It's built by the same team and handles all optimizations automatically.

---

## Why Vercel?

| Feature | Detail |
|---------|--------|
| Free tier | Unlimited personal projects |
| Custom domain | Free SSL + free `.vercel.app` subdomain |
| Auto-deploy | Every push to `main` deploys automatically |
| Edge network | CDN in 100+ cities worldwide |
| Analytics | Built-in performance monitoring |
| Preview URLs | Every PR gets its own preview link |

---

## Method A — Deploy via Vercel Dashboard (recommended)

### Step 1 — Create a Vercel account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **Continue with GitHub** — this links your repos automatically

---

### Step 2 — Import your repository

1. On your Vercel dashboard, click **Add New → Project**
2. Under **Import Git Repository**, find `nikesh-portfolio` (or `portfolio`)
3. Click **Import**

---

### Step 3 — Configure build settings

Vercel auto-detects Next.js. Verify these settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `.` (leave blank) |
| Build Command | `npm run build` |
| Output Directory | `.next` (auto-detected) |
| Install Command | `npm install` |

---

### Step 4 — Add environment variables (if using contact form)

Click **Environment Variables** and add:

```
NEXT_PUBLIC_FORMSPREE_ID    →  your_formspree_id
```

Or for EmailJS:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID   →  your_value
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID  →  your_value
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY   →  your_value
```

Click **Add** after each one.

---

### Step 5 — Deploy

Click **Deploy**. Vercel will:
1. Clone your repository
2. Run `npm install`
3. Run `npm run build`
4. Deploy to their global edge network

**Total time: ~60–90 seconds**

Your site will be live at:
```
https://nikesh-portfolio.vercel.app
```
(or similar — you can rename this)

---

### Step 6 — Rename your Vercel URL

1. Go to your project on Vercel → **Settings → Domains**
2. Your current domain looks like `nikesh-portfolio-xyz.vercel.app`
3. Click the pencil icon to rename it to something cleaner:
   ```
   nikesh-mandal.vercel.app
   ```

---

## Method B — Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login (opens browser)
vercel login

# Inside your project folder
cd nikesh-portfolio

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

---

## Setting up a Custom Domain

### If you have a domain (e.g., nikeshmandal.dev)

**On Vercel:**
1. Project → **Settings → Domains**
2. Click **Add**
3. Type your domain: `nikeshmandal.dev`
4. Click **Add**
5. Vercel shows you DNS records to configure

**On your domain registrar (GoDaddy / Namecheap / Google Domains):**

Add these DNS records:

```
Type    Name    Value
────    ────    ─────────────────────────────────
A       @       76.76.19.19
CNAME   www     cname.vercel-dns.com
```

> DNS propagation takes 5 minutes to 48 hours. Usually under 30 minutes.

**Verify:**
1. Back on Vercel, click **Verify** next to your domain
2. Once verified, Vercel auto-provisions a free SSL certificate
3. Your site is live at `https://nikeshmandal.dev` ✅

---

## If you don't have a domain yet

**Free options:**
- `yourname.vercel.app` — looks professional, zero cost
- `yourname.netlify.app` — alternative

**Paid domains (recommended for client work):**

| Registrar | Price/year | Best for |
|-----------|-----------|---------|
| [Namecheap](https://namecheap.com) | ~$9–12 | `.com`, `.dev` |
| [Porkbun](https://porkbun.com) | ~$8–10 | Cheapest overall |
| [Google Domains](https://domains.google) | ~$12 | Simple interface |
| [GoDaddy](https://godaddy.com) | ~$10–15 | Common choice |

**Recommended domain format:**
```
nikeshmandal.dev    ← Professional, tech-focused TLD
nikeshmandal.com    ← Most recognized
nikesh.dev          ← If available
```

---

## Auto-deployment workflow

Once connected, your workflow is:

```bash
# Make changes to your code
# Then push to GitHub:
git add .
git commit -m "feat: update projects section"
git push

# Vercel automatically:
# 1. Detects the push
# 2. Runs npm build
# 3. Deploys in ~60 seconds
# 4. Your live site updates
```

You'll get an email notification for each deployment.

---

## Vercel Analytics (optional, free)

1. Project → **Analytics** tab
2. Click **Enable Analytics**
3. Add to your `app/layout.tsx`:

```tsx
import { Analytics } from "@vercel/analytics/react";

// Inside <body>:
<Analytics />
```

```bash
npm install @vercel/analytics
```

This gives you real-time visitor data, page views, and performance metrics.

---

## Vercel Speed Insights (optional)

```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from "@vercel/speed-insights/next";

// Inside <body>:
<SpeedInsights />
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| Build fails: `Module not found` | Missing dependency | Run `npm install` locally first |
| `Error: NEXT_PUBLIC_*` undefined | Env var not set on Vercel | Add in Project → Settings → Environment Variables |
| Domain not resolving | DNS not propagated | Wait 30 min, then check with [whatsmydns.net](https://whatsmydns.net) |
| Build passes but site shows 404 | Wrong output directory | Ensure it's set to `.next` |
| TypeScript errors | Strict type checks | Fix all TS errors locally before pushing |

### Check build logs

Vercel shows full build logs:
1. Project → **Deployments**
2. Click the failing deployment
3. Click **Build Logs** to see the exact error

---

## Production checklist

Before sharing your URL:

- [ ] `public/resume.pdf` is your real, current resume
- [ ] All social links (GitHub, LinkedIn, WhatsApp) are correct
- [ ] Email address is real and you receive test messages
- [ ] `og-image.png` is present (1200×630 px) for social sharing
- [ ] `npm run build` passes with zero errors locally
- [ ] Site loads fast on mobile (test with Chrome DevTools)
- [ ] Contact form submits successfully

---

*Next step: Add your Vercel URL to LinkedIn → see [LINKEDIN_GUIDE.md](./LINKEDIN_GUIDE.md)*
