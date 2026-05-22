# Netlify Deployment Guide

> Alternative to Vercel — excellent free tier, great for static + serverless Next.js.

---

## Why Netlify?

| Feature | Detail |
|---------|--------|
| Free tier | 100 GB bandwidth/month, unlimited sites |
| Custom domain | Free SSL certificate |
| Forms | Built-in form handling (replaces Formspree) |
| Auto-deploy | Push to GitHub → live in seconds |
| Branch deploys | Preview branches before merging |
| Edge functions | Serverless functions at the edge |

---

## Next.js on Netlify — important note

Netlify requires the **`@netlify/plugin-nextjs`** adapter for full Next.js 14 support (App Router, Server Components, API Routes).

Install it:

```bash
npm install -D @netlify/plugin-nextjs
```

Create `netlify.toml` in your project root:

```toml
[build]
  command   = "npm run build"
  publish   = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NODE_VERSION = "20"
```

Commit this file:

```bash
git add netlify.toml
git commit -m "chore: add Netlify config"
git push
```

---

## Method A — Deploy via Netlify Dashboard

### Step 1 — Create account

1. Go to [netlify.com](https://netlify.com)
2. Click **Sign up**
3. Choose **Sign up with GitHub**

---

### Step 2 — Import your project

1. On your Netlify dashboard, click **Add new site → Import an existing project**
2. Choose **GitHub**
3. Authorize Netlify to access your repositories
4. Select your `portfolio` repository

---

### Step 3 — Configure build settings

Netlify reads `netlify.toml` automatically. Verify:

| Setting | Value |
|---------|-------|
| Base directory | *(leave blank)* |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Node version | `20` |

---

### Step 4 — Add environment variables

Click **Advanced → Add variable** for each:

```
NEXT_PUBLIC_FORMSPREE_ID    →  your_value
```

---

### Step 5 — Deploy

Click **Deploy site**.

Your site will be live at:
```
https://random-name-12345.netlify.app
```

---

### Step 6 — Rename your Netlify subdomain

1. **Site configuration → Domain management**
2. Under **Netlify subdomain**, click **Options → Edit site name**
3. Change to: `nikesh-mandal` → URL becomes `nikesh-mandal.netlify.app`

---

## Method B — Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Inside your project
cd nikesh-portfolio

# Initialize (links to Netlify)
netlify init

# Deploy preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

---

## Setting up a Custom Domain on Netlify

### Step 1 — Add domain in Netlify

1. **Site configuration → Domain management → Add a domain**
2. Enter: `nikeshmandal.dev`
3. Click **Verify**
4. Click **Add domain**

### Step 2 — Configure DNS

**Option A — Use Netlify DNS (recommended):**

1. Netlify shows 4 nameservers, e.g.:
   ```
   dns1.p01.nsone.net
   dns2.p01.nsone.net
   dns3.p01.nsone.net
   dns4.p01.nsone.net
   ```
2. Go to your domain registrar → **Nameservers** → Replace with Netlify's
3. Wait 1–48 hours for propagation

**Option B — External DNS:**

Add these records at your registrar:
```
Type    Name    Value
────    ────    ──────────────────────────────────
A       @       75.2.60.5
CNAME   www     your-site.netlify.app
```

### Step 3 — Enable HTTPS

1. Back in Netlify → **Domain management → HTTPS**
2. Click **Verify DNS configuration**
3. Click **Provision certificate**

SSL is provisioned automatically via Let's Encrypt. ✅

---

## Using Netlify Forms (replaces Formspree)

Netlify has built-in form handling — no third-party service needed.

### Step 1 — Update your contact form

In `components/ContactSection.tsx`, update the submit handler:

```tsx
const handleSubmit = async (e: React.MouseEvent) => {
  e.preventDefault();
  const errs = validate();
  if (Object.keys(errs).length) { setErrors(errs); return; }

  setStatus("sending");

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        "form-name": "portfolio-contact",
        ...form,
      }).toString(),
    });

    if (response.ok) {
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("error");
    }
  } catch {
    setStatus("error");
  }
};
```

### Step 2 — Add a hidden HTML form for Netlify detection

Add to `app/page.tsx` (anywhere in the JSX, hidden):

```tsx
{/* Netlify form detection */}
<form name="portfolio-contact" data-netlify="true" hidden>
  <input name="name" />
  <input name="email" />
  <input name="projectType" />
  <textarea name="message" />
</form>
```

### Step 3 — View submissions

1. Netlify Dashboard → your site → **Forms**
2. All submissions appear here
3. Enable email notifications: **Forms → Form notifications → Add notification → Email**

---

## Branch previews

Netlify automatically creates preview URLs for branches:

```bash
git checkout -b feature/new-testimonials
# make changes
git push origin feature/new-testimonials
```

Netlify deploys a preview at:
```
https://feature-new-testimonials--nikesh-mandal.netlify.app
```

Share this link to review changes before merging to `main`.

---

## Comparison: Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Next.js support | ⭐⭐⭐⭐⭐ Native | ⭐⭐⭐⭐ Plugin needed |
| Free bandwidth | 100 GB/mo | 100 GB/mo |
| Build minutes | 6,000/mo | 300/mo |
| Serverless functions | ✅ | ✅ |
| Edge network | ✅ | ✅ |
| Built-in forms | ❌ | ✅ |
| Analytics | ✅ (paid) | ✅ (paid) |
| **Recommendation** | **Best for Next.js** | **Good alternative** |

**Verdict:** Use Vercel for this portfolio. Use Netlify if you prefer its form handling.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| Build fails: `@netlify/plugin-nextjs` missing | `npm install -D @netlify/plugin-nextjs` |
| 404 on all pages | Ensure `netlify.toml` is committed |
| Functions not working | Check Node version is 18+ in `netlify.toml` |
| Form submissions not appearing | Ensure hidden HTML form is in your build output |

---

*Next step: Share on LinkedIn → see [LINKEDIN_GUIDE.md](./LINKEDIN_GUIDE.md)*
