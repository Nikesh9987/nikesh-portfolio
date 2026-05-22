# GitHub Upload Guide

> Get your portfolio code onto GitHub in under 10 minutes.

---

## Prerequisites

- [Git installed](https://git-scm.com/downloads) on your machine
- [GitHub account](https://github.com) (free)
- Your portfolio project folder ready locally

---

## Step 1 — Verify Git is installed

```bash
git --version
# Should print: git version 2.x.x
```

If not installed, download from [git-scm.com/downloads](https://git-scm.com/downloads).

---

## Step 2 — Configure Git identity (first time only)

```bash
git config --global user.name "Nikesh Mandal"
git config --global user.email "nikesh@example.com"
```

---

## Step 3 — Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Fill in the details:
   - **Repository name:** `portfolio` (or `nikesh-portfolio`)
   - **Description:** `My personal portfolio — Full Stack Developer & Freelance Software Engineer`
   - **Visibility:** ✅ Public *(required for free Vercel/Netlify deployment)*
   - **Initialize:** ❌ Do NOT check "Add a README" (you already have one)
3. Click **Create repository**
4. Copy the repository URL — looks like:
   ```
   https://github.com/nikeshmandal/portfolio.git
   ```

---

## Step 4 — Initialize Git in your project

Open your terminal inside your portfolio folder:

```bash
cd nikesh-portfolio

# Initialize git
git init

# Create .gitignore (if not already present)
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnp
.pnp.js

# Next.js build output
.next/
out/

# Environment variables — NEVER commit these
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS files
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Vercel
.vercel
EOF
```

---

## Step 5 — Stage, commit, and push

```bash
# Stage all files
git add .

# Review what will be committed
git status

# Create first commit
git commit -m "feat: initial portfolio v2.0 — Next.js 14 + Tailwind CSS"

# Set branch name to main
git branch -M main

# Link to your GitHub repository
git remote add origin https://github.com/nikeshmandal/portfolio.git

# Push to GitHub
git push -u origin main
```

Visit `https://github.com/nikeshmandal/portfolio` — you should see all your files.

---

## Step 6 — Set up repository details on GitHub

1. Go to your repository page
2. Click **⚙️ Settings** (top right of repo, not account settings)
3. Under **General**:
   - Add **Description:** `Full Stack Developer Portfolio — Next.js 14, TypeScript, Tailwind CSS`
   - Add **Website:** your Vercel/Netlify URL (fill in after deployment)
   - Add **Topics:** `portfolio`, `nextjs`, `tailwindcss`, `typescript`, `react`, `java-developer`, `full-stack`
4. Click **Save changes**

---

## Ongoing workflow — pushing updates

Every time you make changes:

```bash
# Check what changed
git status

# Stage changes
git add .

# Commit with a descriptive message
git commit -m "feat: add real project screenshots"
# or
git commit -m "fix: contact form email integration"
# or
git commit -m "chore: update resume PDF"

# Push to GitHub
git push
```

If you connected Vercel, **every push to `main` triggers an automatic re-deployment.**

---

## Recommended commit message format

```
feat:  add new feature
fix:   bug fix
chore: maintenance (update deps, add files)
style: visual/design changes
docs:  documentation updates
perf:  performance improvements
```

---

## Protecting secrets — important

Your `.gitignore` already excludes `.env.local`. Double-check by running:

```bash
git status
```

You should **never** see `.env.local` in the output. If you do:

```bash
# Remove from tracking (does not delete the file)
git rm --cached .env.local
git commit -m "chore: remove env file from tracking"
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `git push` asks for password | Use a [Personal Access Token](https://github.com/settings/tokens/new) instead of password |
| `remote origin already exists` | `git remote set-url origin https://github.com/nikeshmandal/portfolio.git` |
| Large files rejected | Keep files under 100 MB; use Cloudinary for videos |
| Branch name wrong | `git branch -M main` then push again |

---

*Next step: Deploy to Vercel → see [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)*
