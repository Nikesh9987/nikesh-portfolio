# NIKESH.DEV

Personal portfolio site — built to showcase my work, skills, and experience as a full-stack developer. Live, fast, and fully custom (no templates).

**Live:** [nikesh.dev](https://nikesh.dev) <!-- update with actual domain -->

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Auth:** Firebase Authentication (admin-only)
- **Notifications:** Resend (email) + Twilio (WhatsApp)
- **Deployment:** Vercel

---

## What's in here

```
app/
  admin/          → private dashboard (login-protected)
  api/
    admin/session/  → login session handling
    contact/        → contact form endpoint (sends email + WhatsApp)
  page.tsx        → main portfolio page
  layout.tsx

components/
  HeroSection, AboutSection, ServicesSection, ExperienceSection,
  ProjectsSection, SkillsSection, TestimonialsSection, BlogSection,
  ContactSection, Navbar, Footer
  ui/             → shared building blocks (cards, headers, effects)

lib/
  firebase.ts             → Firebase init (auth)
  adminAuth.ts            → admin login/logout logic
  notifications/
    email.ts              → sends contact form emails via Resend
    whatsapp.ts            → sends contact form WhatsApp alerts via Twilio
  utils.ts

middleware.ts        → protects /admin/* routes
```

Every homepage section is its own component under `components/`, dropped into `app/page.tsx` in order. Want to add or remove a section? Just import/remove it there — nothing else depends on the order.

---

## Getting started

```bash
npm install
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env.local` and fill in your own values — none of this is committed to the repo (see `.gitignore`):

```bash
# Firebase (admin login)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Admin
ADMIN_EMAIL=
ADMIN_UID=
ADMIN_SESSION_SECRET=

# Contact form — email (Resend: https://resend.com)
RESEND_API_KEY=
CONTACT_EMAIL_TO=
CONTACT_EMAIL_FROM=

# Contact form — WhatsApp (Twilio: https://console.twilio.com)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=
TWILIO_WHATSAPP_TO=
```

---

## Contact form

Submissions from the site hit `app/api/contact/route.ts`, which:

1. Validates the input server-side (name, email, project type, message length)
2. Rate-limits repeat submissions from the same IP (5 per 10 minutes)
3. Sends a notification email (Resend) and a WhatsApp message (Twilio) in parallel

Email and WhatsApp are split into their own files under `lib/notifications/` on purpose — swapping either provider later (e.g. Resend → SendGrid, Twilio → Meta Cloud API) only touches that one file.

---

## Admin panel

`/admin` is a small private dashboard, protected by `middleware.ts` — anything under `/admin/*` redirects to `/admin/login` unless there's a valid session cookie.

Login flow: Firebase Authentication → server verifies the ID token → issues a signed JWT session cookie (24h expiry). Only the email set in `ADMIN_EMAIL` is allowed in.

---

## Deployment

Deployed on Vercel, connected to this repo — pushes to `main` deploy automatically.

Environment variables need to be added separately in **Vercel → Project → Settings → Environment Variables** (they don't come from `.env.local`, which is gitignored on purpose).

---

## Notes to self

- Tailwind's duration scale only has `100–1000` in steps of 100, minus a couple of gaps (no `duration-400`/`duration-600`) — stick to the standard scale.
- Internal links use `next/link`, not bare `<a>` tags.
- Keep new sections consistent with the existing pattern: one component per section, `SectionHeader` for the eyebrow/title, `useInView` for the scroll-fade-in.
