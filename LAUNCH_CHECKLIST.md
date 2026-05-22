# 🚀 Portfolio Launch Checklist

Complete these steps in order. Estimated total time: **~45 minutes**.

---

## Phase A — Local finalization (15 min)

### Personalization
- [ ] Replace `nikesh@example.com` with your real email (search all files)
- [ ] Replace `nikeshmandal` with your GitHub username (search all files)
- [ ] Replace `/in/nikeshmandal` with your LinkedIn slug
- [ ] Replace `+91 98765 43210` with your real WhatsApp number
- [ ] Replace `919876543210` with same number (no + or spaces)
- [ ] Replace `nikeshmandal.dev` with your actual domain (or Vercel URL)

### Content
- [ ] Add `public/resume.pdf` — your current resume
- [ ] Update `STAT_ITEMS` in `HeroSection.tsx` with real numbers
- [ ] Update `EDUCATION` in `AboutSection.tsx` with accurate dates
- [ ] Update `EXPERIENCES` in `ExperienceSection.tsx` with real achievements
- [ ] Update `PROJECTS` in `ProjectsSection.tsx` with real GitHub/demo links
- [ ] Update `TESTIMONIALS` in `TestimonialsSection.tsx` with real quotes (or keep demo)

### Build verification
- [ ] `npm run build` completes with zero errors
- [ ] `npm run start` — test production build at localhost:3000
- [ ] Test on mobile (Chrome DevTools → Toggle device toolbar)
- [ ] Test contact form validation
- [ ] Test video upload and playback
- [ ] Test all navigation links scroll correctly

---

## Phase B — GitHub (5 min)

- [ ] `git init` in project folder
- [ ] Add `.gitignore` file (from docs folder)
- [ ] `git add .` and `git commit -m "feat: initial portfolio v2.0"`
- [ ] Create repo on github.com (public, no README)
- [ ] `git remote add origin https://github.com/YOU/portfolio.git`
- [ ] `git push -u origin main`
- [ ] Verify all files appear on GitHub

---

## Phase C — Deployment (5 min)

- [ ] Create Vercel account at vercel.com (GitHub login)
- [ ] Import your repository
- [ ] Add environment variables (if using contact form)
- [ ] Click Deploy — wait ~90 seconds
- [ ] Site is live at `yourname.vercel.app`
- [ ] Test the live URL in incognito mode

---

## Phase D — Domain (optional, 10 min setup + propagation)

- [ ] Purchase domain (namecheap.com recommended — ~$10/yr for .dev)
- [ ] Add domain in Vercel → Settings → Domains
- [ ] Configure DNS A record: `76.76.19.19`
- [ ] Configure DNS CNAME: `www` → `cname.vercel-dns.com`
- [ ] Wait for propagation (5 min – 24 hours)
- [ ] SSL certificate auto-provisions ✅
- [ ] Update all portfolio links to use new domain

---

## Phase E — OG Image (5 min)

Create a 1200×630 social share image:

1. Go to [canva.com](https://canva.com) → Create design → Custom size → 1200×630
2. Dark background (#020409), your name in large bold text
3. Subtitle: "Full Stack Developer · Java · Python · React"
4. Export as PNG → save as `public/og-image.png`
5. Push to GitHub → Vercel auto-deploys

---

## Phase F — Contact form (5 min)

- [ ] Create free account at [formspree.io](https://formspree.io)
- [ ] Create a new form → copy the Form ID
- [ ] Add to Vercel: `NEXT_PUBLIC_FORMSPREE_ID` = your ID
- [ ] Update `ContactSection.tsx` with Formspree fetch call
- [ ] Test form submission end-to-end
- [ ] Verify email arrives in your inbox

---

## Phase G — LinkedIn (10 min)

- [ ] Add portfolio URL to LinkedIn Contact Info
- [ ] Update LinkedIn headline with portfolio URL
- [ ] Update LinkedIn About section
- [ ] Add portfolio to LinkedIn Featured section
- [ ] Upload resume to LinkedIn Featured section
- [ ] Customize LinkedIn URL to `/in/nikeshmandal`
- [ ] Enable Open To Work (if applicable)
- [ ] Publish launch post on LinkedIn

---

## Phase H — Final checks

- [ ] Share URL with a friend — get feedback
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) — target 90+
- [ ] Check [Web Accessibility Checker](https://wave.webaim.org/)
- [ ] Add portfolio URL to your email signature
- [ ] Add portfolio URL to your resume header
- [ ] Add portfolio URL to your GitHub profile bio

---

## 🎉 You're live!

Your portfolio at a glance:
- **URL:** `https://nikeshmandal.dev` (or your Vercel URL)
- **GitHub:** `https://github.com/nikeshmandal/portfolio`
- **LinkedIn:** `https://linkedin.com/in/nikeshmandal`

Share it confidently. You've built something premium. 🚀

---

## Ongoing maintenance

| Frequency | Task |
|-----------|------|
| After each project | Add to Projects section, push to GitHub |
| Monthly | Add real testimonials from clients/colleagues |
| Quarterly | Update resume PDF |
| When available | Record project demo videos and upload |
| Yearly | Update skills, refresh About section |
