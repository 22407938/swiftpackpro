# 🚀 Quick Command Reference

## Local Development

```powershell
# Start dev server
npm run dev

# Visit http://localhost:3000
```

## Building for Production

```powershell
# Create optimized production build
npm run build

# Test production build locally
npm start
```

## Version Control (Git)

```powershell
# First time setup
git init
git config user.name "Your Name"
git config user.email "your@email.com"

# Add files & commit
git add .
git commit -m "Your message"

# Push to GitHub
git push origin main

# Check status
git status

# View commit history
git log
```

## Deployment

### If using Vercel:
```powershell
# Just push to GitHub - Vercel auto-deploys
git push origin main
```

### If using another host:
```powershell
# Build production bundle
npm run build

# Upload .next/ folder to hosting server
# Or use SCP/FTP for file transfer
```

## Troubleshooting

```powershell
# Clear Next.js cache
rm -r .next

# Reinstall dependencies
rm -r node_modules
npm install

# Check for errors
npm run build

# View port 3000 processes
Get-NetTCPConnection -LocalPort 3000

# Kill process on port 3000 (if needed)
Get-Process | Where-Object {$_.ProcessName -eq "node"} | Stop-Process
```

## Environment Setup

```powershell
# Copy example env file
Copy-Item .env.local.example .env.local

# Edit with your values
notepad .env.local
```

## Node.js Commands (If npm not in PATH)

```powershell
# Run with explicit paths
& "C:\Program Files\nodejs\node.exe" ".\node_modules\next\dist\bin\next" dev

# Or add to PATH permanently (Admin PowerShell):
$env:Path += ";C:\Program Files\nodejs"
[Environment]::SetEnvironmentVariable("Path", $env:Path, "User")
```

---

## 📊 File Locations

| Purpose | Location |
|---------|----------|
| Main code | `app/page.tsx` |
| Layout | `app/layout.tsx` |
| Styles | `app/globals.css` |
| Config | `next.config.mjs` |
| Env vars | `.env.local` |
| Build output | `.next/` |
| Dependencies | `node_modules/` |

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| GitHub | https://github.com |
| Vercel | https://vercel.com |
| NPM Packages | https://npmjs.com |
| Node.js | https://nodejs.org |
| Next.js Docs | https://nextjs.org/docs |

---

**Bookmark this file for quick reference!** 📌
