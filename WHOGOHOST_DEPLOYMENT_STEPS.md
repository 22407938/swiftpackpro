# SwiftPack Pro - WhogoHost Deployment Guide

## ✅ What's Ready (Saved Locally)

Your complete project is backed up at:
- **Location**: `c:\Users\PANCHO\Desktop\`
- **Backup File**: `swiftpackpro-deploy-2026-06-25.zip` (46 MB)
- **Production Build**: `.next/` folder (ready to deploy)
- **All Source Code**: `app/`, `prisma/`, `config/`, `styles/` folders

## 📋 Quick Deployment Checklist

### Step 1: Prepare WhogoHost
- [ ] Log in to WhogoHost cPanel
- [ ] Note your FTP credentials or SSH access
- [ ] Check your username (e.g., `u12345` or similar)

### Step 2: Upload Files (Choose One Method)

**Method A - FTP (Easiest)**
1. Open FileZilla or WinSCP
2. Connect with WhogoHost FTP credentials
3. Navigate to `/public_html/`
4. Extract `swiftpackpro-deploy-2026-06-25.zip`
5. Upload all folders and files

**Method B - SSH (Faster)**
```bash
# Replace USERNAME with your WhogoHost username
scp swiftpackpro-deploy-2026-06-25.zip USERNAME@your-whogohost-ip:/home/USERNAME/public_html/swiftpackpro/

# Then SSH in and extract
ssh USERNAME@your-whogohost-ip
cd ~/public_html/swiftpackpro
unzip swiftpackpro-deploy-2026-06-25.zip
```

### Step 3: Install Dependencies on Server
```bash
cd ~/public_html/swiftpackpro
npm install
npm run prisma:generate
```

### Step 4: Create Production Environment File
In WhogoHost cPanel Terminal or SSH:
```bash
nano .env.production
```

Copy and paste the content from `.env.production` template, then update:
- `DATABASE_URL` = your PostgreSQL credentials
- `NEXTAUTH_SECRET` = a secure random string (min 32 chars)
- `NEXTAUTH_URL` = https://swiftpackprocleaningservice.ng

### Step 5: Configure Domain in cPanel
1. Go to **Addon Domains** or **Domains**
2. Add: `swiftpackprocleaningservice.ng`
3. Point to: `/home/USERNAME/public_html/swiftpackpro`
4. Save

### Step 6: Enable Node.js App
In cPanel > **Node.js**:
1. Click **Create New App**
2. **App name**: SwiftPackPro
3. **Node.js version**: 18.x
4. **App root**: `/home/USERNAME/public_html/swiftpackpro`
5. **App startup file**: `node_modules/.bin/next start`
6. **Port**: Leave as auto
7. Click **Create**

### Step 7: Start the App
```bash
# In WhogoHost Terminal/SSH
cd ~/public_html/swiftpackpro
npm start
```

### Step 8: Install SSL Certificate
In cPanel > **AutoSSL** or **Let's Encrypt**:
1. Select `swiftpackprocleaningservice.ng`
2. Install certificate
3. Wait for activation (usually instant)

### Step 9: Verify It's Live
Visit: `https://swiftpackprocleaningservice.ng`

## 🆘 Troubleshooting

**Port Already in Use?**
```bash
# Find what's using the port
lsof -i :3000
# Kill the process
kill -9 PID
```

**Database Connection Failed?**
- Verify DATABASE_URL is correct
- Check PostgreSQL is running on WhogoHost
- Test connection: `psql $DATABASE_URL`

**Module Not Found Errors?**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npm run prisma:generate
```

**Can't See Changes?**
- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Restart app in cPanel Node.js manager

## 📞 Support

Your WhogoHost support: [Contact WhogoHost](https://whogohost.com/support)

---

**All files saved and ready!** Once you have your WhogoHost username and FTP/SSH details, you're ready to upload and go live. 🚀
