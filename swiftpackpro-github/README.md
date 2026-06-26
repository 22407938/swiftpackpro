# SwiftPack Pro

**Professional Cleaning & Courier Services Website**

---

## 📋 Project Info

- **Business:** SwiftPack Pro
- **Services:** Deep cleaning, moving logistics, Airbnb turnover, commercial sanitization
- **Location:** Abuja, Nigeria
- **Contact:** 07044 933 807 | akokasort@gmail.com

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (React)
- **Language:** TypeScript
- **Styling:** CSS-in-JS
- **Hosting:** Vercel
- **Version Control:** Git/GitHub

---

## 🚀 Quick Start

### Development (Local)
```bash
npm run dev
# Opens at http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
# Preview production version locally
```

### Deploy to Vercel
```bash
git push origin main
# Automatic deployment on GitHub push
```

---

## 📁 Project Structure

```
swiftpack-pro/
├── app/
│   ├── page.tsx          # Main website (all sections)
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── public/               # Static assets (if needed)
├── package.json          # Dependencies & scripts
├── tsconfig.json         # TypeScript config
├── next.config.mjs       # Next.js config
├── .env.local.example    # Environment template
└── DEPLOYMENT_GUIDE.md   # Full deployment instructions
```

---

## 🔧 Configuration

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_WHATSAPP_NUMBER=2347044933807
NEXT_PUBLIC_BUSINESS_EMAIL=akokasort@gmail.com
NEXT_PUBLIC_BUSINESS_PHONE=07044 933 807
```

---

## 📚 Pages & Sections

The entire site is contained in `app/page.tsx`:

- **Navbar** — Navigation with dark mode toggle
- **Home** — Hero section with CTA buttons
- **Services** — 6 cleaning service packages
- **Booking** — Multi-step booking form
- **Testimonials** — 5-star customer reviews
- **FAQs** — Common questions
- **Blog** — 3 featured articles
- **Footer** — Contact & links

---

## 🎨 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Dark mode support
- ✅ Smooth animations & transitions
- ✅ WhatsApp integration button
- ✅ Booking form with date/time picker
- ✅ Toast notifications
- ✅ Service filtering & selection
- ✅ SEO optimized metadata

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.2.5 | Framework |
| react | 18.3.1 | UI Library |
| typescript | 5.6.3 | Type safety |

---

## 🚢 Deployment

### Automatic (Recommended)

1. Push code to GitHub
2. Vercel auto-detects and deploys
3. Live in 2-5 minutes

### Manual

```bash
npm run build
# Creates optimized production bundle in .next/
```

For full deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

---

## 📞 Contact

- **WhatsApp:** 2347044933807
- **Email:** akokasort@gmail.com
- **Phone:** 07044 933 807
- **Address:** No 3 Commonwealth Avenue, Arab Kubwa, Abuja

---

## 📄 License

Private project - All rights reserved © 2026 SwiftPack Pro

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **TypeScript:** https://www.typescriptlang.org/docs

---

**Last Updated:** May 24, 2026  
**Status:** ✅ Live & Operational
