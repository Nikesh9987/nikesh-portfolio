# Nikesh Mandal — Portfolio v2.0

> **Full Stack Developer · Freelance Software Engineer · AI/LLM Specialist**
> Built with Next.js 14, TypeScript, Tailwind CSS & Framer Motion

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nikeshmandal/portfolio)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Sections](#sections)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Performance](#performance)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

A premium, dark-themed personal portfolio website designed to attract freelance clients, impress recruiters, and showcase software engineering work professionally. Features a futuristic cyber-noir aesthetic with glassmorphism, particle animations, scroll-triggered reveals, and a fully interactive project/video showcase.

**Key features at a glance:**

- ⚡ Next.js 14 App Router with full TypeScript
- 🎨 Dark futuristic UI — glassmorphism + gradient highlights
- 🌌 Canvas particle background with mouse interaction
- ⌨️ Typing effect cycling through professional roles
- 📁 Dynamic project filtering by category + search
- 🎥 Drag-and-drop video upload with localStorage persistence
- 📊 Animated skill bars + SVG radar chart
- 💬 Auto-advancing testimonial carousel
- 📬 Contact form with full client-side validation
- 🔍 SEO-optimized with JSON-LD structured data
- ♿ Accessibility: skip links, focus-visible, reduced-motion
- 📱 Fully responsive — mobile-first design

---

## Live Demo

🌐 **[nikeshmandal.dev](https://nikeshmandal.dev)** *(update with your actual URL)*

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion + CSS |
| Icons | Lucide React |
| Fonts | Orbitron · DM Sans · JetBrains Mono |
| Deployment | Vercel / Netlify |

---

## Project Structure

```
nikesh-portfolio/
│
├── app/
│   ├── globals.css          # Global styles, CSS variables, animations
│   ├── layout.tsx           # Root layout — SEO metadata, JSON-LD
│   └── page.tsx             # Main page — section composition
│
├── components/
│   ├── Navbar.tsx           # Sticky nav with scroll glass effect
│   ├── HeroSection.tsx      # Animated intro, typing effect, CTA
│   ├── AboutSection.tsx     # Story, education, highlight cards
│   ├── ServicesSection.tsx  # 6 animated service cards (flip on hover)
│   ├── ExperienceSection.tsx # Accordion timeline
│   ├── ProjectsSection.tsx  # Filterable project grid
│   ├── VideoShowcase.tsx    # Drag-drop video upload + gallery
│   ├── SkillsSection.tsx    # Skill bars + badge cloud + radar chart
│   ├── TestimonialsSection.tsx # Auto-carousel testimonials
│   ├── BlogSection.tsx      # Blog placeholder cards
│   ├── ContactSection.tsx   # Validated contact form + social links
│   ├── Footer.tsx           # 4-col footer + back-to-top
│   └── LoadingScreen.tsx    # Boot-sequence loading animation
│
├── components/ui/
│   ├── SectionHeader.tsx    # Reusable section heading
│   ├── TypingEffect.tsx     # Typewriter component
│   ├── ScrollProgress.tsx   # RAF-optimized progress bar
│   ├── CursorGlow.tsx       # Mouse-follow radial glow
│   ├── ParticleBackground.tsx # Canvas particle system
│   └── VideoModal.tsx       # Fullscreen video player modal
│
├── lib/
│   └── utils.ts             # cn() classname helper
│
├── public/
│   ├── resume.pdf           # Your resume (add manually)
│   ├── og-image.png         # 1200×630 social share image
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   └── site.webmanifest
│
├── tailwind.config.ts       # Custom cyber theme tokens
├── tsconfig.json
├── next.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js **18.17+** (required by Next.js 14)
- npm **9+** or yarn/pnpm

```bash
# Check your Node version
node --version

# If needed, install via nvm
nvm install 20
nvm use 20
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/nikeshmandal/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Add your resume
cp /path/to/your/resume.pdf public/resume.pdf

# 4. Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Scripts

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Environment Variables

The portfolio works out of the box without any environment variables.

For optional integrations, create a `.env.local` file:

```env
# Contact form — Formspree (free tier available)
NEXT_PUBLIC_FORMSPREE_ID=your_form_id

# Contact form — EmailJS (alternative)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# Video uploads — Cloudinary (optional, replaces localStorage)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Video uploads — Firebase (alternative)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
```

> **Never commit `.env.local` to git.** It is already in `.gitignore` by default.

---

## Sections

| # | Section | Key Features |
|---|---------|-------------|
| 1 | Hero | Typing effect, CTA buttons, tech icon grid, stats |
| 2 | About | Story, education, 4 specialty cards, trait badges |
| 3 | Services | 6 cards with hover flip, tech pills, color-coded |
| 4 | Experience | Accordion timeline, achievements, skill tags |
| 5 | Projects | Filter by category, search, featured toggle, GitHub/demo links |
| 6 | Videos | Drag-drop upload, gallery, modal player, localStorage |
| 7 | Skills | Animated bars, 20-badge cloud, SVG radar chart |
| 8 | Testimonials | Auto-carousel, mini previews, directional slide |
| 9 | Blog | Placeholder cards, coming soon, LinkedIn CTA |
| 10 | Contact | Validated form, WhatsApp, LinkedIn, Email links |
| 11 | Footer | 4-col grid, social icons, back-to-top |

---

## Customization Guide

### 1. Update personal information

Edit the data arrays at the top of each component:

```
components/HeroSection.tsx       → TYPING_ROLES, STAT_ITEMS, SOCIAL_LINKS
components/AboutSection.tsx      → EDUCATION, HIGHLIGHTS, TRAITS
components/ServicesSection.tsx   → SERVICES[]
components/ExperienceSection.tsx → EXPERIENCES[]
components/ProjectsSection.tsx   → PROJECTS[]
components/SkillsSection.tsx     → SKILL_CATEGORIES, TECH_BADGES
components/TestimonialsSection.tsx → TESTIMONIALS[]
components/ContactSection.tsx    → CONTACT_LINKS
components/Footer.tsx            → SOCIAL_LINKS, QUICK_LINKS
```

### 2. Update contact details

Search and replace these placeholders across all files:

```
nikesh@example.com        → your real email
nikeshmandal              → your GitHub username
/in/nikeshmandal          → your LinkedIn slug
+91 98765 43210           → your WhatsApp number
919876543210              → same number, no spaces/+
nikeshmandal.dev          → your actual domain
```

### 3. Enable the contact form

**Option A — Formspree (easiest, free):**

```tsx
// In ContactSection.tsx, replace the simulated call:
const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});
if (!response.ok) throw new Error("Send failed");
setStatus("success");
```

**Option B — Next.js API route:**

Create `app/api/contact/route.ts`:

```ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, projectType, message } = await req.json();

  const transporter = nodemailer.createTransporter({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: email,
    to: process.env.EMAIL_USER,
    subject: `Portfolio Inquiry: ${projectType} from ${name}`,
    text: message,
  });

  return NextResponse.json({ success: true });
}
```

### 4. Add real projects

In `components/ProjectsSection.tsx`, edit the `PROJECTS` array:

```ts
{
  id: 0,
  title: "Your Project Name",
  description: "One-liner description shown by default.",
  longDesc: "Full description shown on hover.",
  category: "Full Stack",           // matches a CATEGORIES tab
  color: "#00e5ff",                 // accent color
  gradient: "linear-gradient(...)", // card header background
  tech: ["React", "Node.js"],
  github: "https://github.com/you/project",
  demo: "https://yourproject.com",
  status: "live",                   // "live" | "demo" | "wip"
  featured: true,                   // shows FEATURED badge
}
```

### 5. Add your resume

```bash
cp /path/to/YourResume.pdf public/resume.pdf
```

### 6. Add OG image for social sharing

Create a 1200×630 PNG (use Figma or Canva) and save as `public/og-image.png`.

---

## Deployment

See the full deployment guides:

- 📄 [Vercel Deployment Guide](./DEPLOY_VERCEL.md)
- 📄 [Netlify Deployment Guide](./DEPLOY_NETLIFY.md)
- 📄 [GitHub Upload Guide](./GITHUB_GUIDE.md)
- 📄 [LinkedIn Integration Guide](./LINKEDIN_GUIDE.md)

---

## Performance

Built with performance as a first-class concern:

- **Canvas particles** — `requestAnimationFrame` loop, never blocks main thread
- **Scroll progress** — RAF-debounced, no layout thrash
- **Cursor glow** — Only activates on `hover: hover` devices (no mobile cost)
- **IntersectionObserver** — Scroll animations trigger without scroll listeners
- **Font loading** — Google Fonts with `display=swap` to prevent FOIT
- **Images** — Next.js `<Image>` for automatic WebP conversion and lazy loading
- **CSS animations** — `will-change` only on animated elements

Target Lighthouse scores: **Performance 95+ · Accessibility 98+ · SEO 100 · Best Practices 100**

---

## License

MIT © 2024 Nikesh Mandal

---

*Built with ❤️ in Mumbai using Next.js 14, Tailwind CSS, and too much caffeine.*
