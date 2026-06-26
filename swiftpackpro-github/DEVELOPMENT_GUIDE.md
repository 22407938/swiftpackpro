# SwiftPack Pro - Complete Setup & Development Guide

**AI-Powered Operations Platform for Cleaning & Logistics Services in Abuja**

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Requirements](#system-requirements)
3. [Installation](#installation)
4. [Environment Setup](#environment-setup)
5. [Database Setup](#database-setup)
6. [Project Structure](#project-structure)
7. [API Documentation](#api-documentation)
8. [Modules Overview](#modules-overview)
9. [Development Workflow](#development-workflow)
10. [Deployment Guide](#deployment-guide)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**SwiftPack Pro** is a comprehensive AI-powered operations management platform for cleaning and logistics services operating in Abuja, Nigeria. The platform integrates 9 major modules including compliance management, recruitment, operations scheduling, staff training, analytics, customer support, accounting, and admin dashboard.

### Key Features

- 🔐 JWT-based authentication with role-based access control
- 📊 Real-time analytics and business intelligence dashboards
- 🤖 AI-powered chatbots for bookings and customer support
- 👥 AI recruitment system with application screening
- 📍 GPS-enabled shift tracking and attendance verification
- 💰 Integrated accounting and payment processing
- 📱 WhatsApp integration for communication
- 🎓 Staff training and certification management
- ✅ Business compliance and verification system
- 🌙 Dark/light mode with glassmorphism UI design

### Service Coverage (18 Locations)

Kubwa, Lugbe, Wuse, Maitama, Apo, Karasana, Gwarinpa, Dutse, Asokoro, Nyanya, Zuba, Airport Road, Lokogoma, Jabi, Jahi, Garki, Utako, Games Village

---

## 💻 System Requirements

### Minimum Requirements

- **Node.js**: v18.17.0 or higher
- **npm**: v9.0.0 or higher
- **PostgreSQL**: v14.0 or higher
- **Docker** (optional, for containerization)

### Development Tools

- **Visual Studio Code** with TypeScript support
- **Git** for version control
- **Postman** or **Thunder Client** for API testing
- **pgAdmin** or **DBeaver** for database management

### API Keys Required

- OpenAI API key (for AI features)
- Anthropic Claude API key (alternative AI)
- Twilio API keys (for WhatsApp integration)
- Google Maps API key
- Stripe/Paystack keys (for payments)
- Cloudinary API keys (for file storage)

---

## 🚀 Installation

### Step 1: Clone/Setup Project

```bash
# Navigate to project directory
cd /path/to/swiftpack-pro

# Install dependencies
npm install

# Generate Prisma client
npm run prisma:generate
```

### Step 2: Environment Configuration

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit .env.local with your values
nano .env.local
```

### Step 3: Database Setup

```bash
# Run migrations
npm run prisma:migrate

# Seed database (optional, creates sample data)
npm run prisma:seed
```

### Step 4: Start Development Server

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in browser
```

---

## 🔧 Environment Setup

### Critical Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/swiftpack_pro
SHADOW_DATABASE_URL=postgresql://user:password@localhost:5432/swiftpack_pro_shadow

# Authentication
JWT_SECRET=your-super-secret-jwt-key-generate-with-openssl
NEXTAUTH_SECRET=your-nextauth-secret
JWT_EXPIRY=7d

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# AI APIs
OPENAI_API_KEY=sk-your-openai-key
ANTHROPIC_API_KEY=sk-ant-your-claude-key

# File Storage
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-secret

# Communication
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+234...

# Payments
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
```

### Generate Secure Secrets

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## 🗄️ Database Setup

### PostgreSQL Installation

**Windows:**
```bash
# Download from https://www.postgresql.org/download/windows/
# Or use Chocolatey
choco install postgresql
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

### Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE swiftpack_pro;

# Create shadow database for Prisma migrations
CREATE DATABASE swiftpack_pro_shadow;

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE swiftpack_pro TO your_user;
GRANT ALL PRIVILEGES ON DATABASE swiftpack_pro_shadow TO your_user;

# Exit
\q
```

### Supabase Alternative

If using Supabase instead of local PostgreSQL:

1. Go to https://supabase.com
2. Create new project
3. Copy connection string to `DATABASE_URL`
4. Copy anon key to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 📁 Project Structure

```
swiftpack-pro/
├── app/
│   ├── api/
│   │   ├── auth/                    # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   ├── compliance/              # Compliance module
│   │   │   ├── certificates/
│   │   │   └── verify/
│   │   ├── recruitment/             # Recruitment system
│   │   │   ├── jobs/
│   │   │   └── applications/
│   │   ├── operations/              # Operations & bookings
│   │   │   ├── bookings/
│   │   │   └── services/
│   │   ├── accounting/              # Financial management
│   │   │   └── invoices/
│   │   ├── analytics/               # Analytics APIs
│   │   ├── support/                 # Customer support
│   │   ├── training/                # Training module
│   │   └── admin/                   # Admin endpoints
│   ├── auth/                        # Auth pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/                   # User dashboards
│   │   ├── main/
│   │   ├── jobs/
│   │   ├── employees/
│   │   └── operations/
│   ├── admin/                       # Admin panel
│   │   ├── dashboard/
│   │   ├── compliance/
│   │   ├── staff/
│   │   ├── customers/
│   │   ├── analytics/
│   │   └── accounting/
│   ├── public-pages/               # Public pages
│   │   └── compliance-verification/
│   ├── components/                 # Reusable components
│   │   ├── ui/                     # UI components
│   │   ├── layout/                 # Layout components
│   │   ├── forms/                  # Form components
│   │   └── modules/                # Module-specific components
│   ├── lib/                        # Utilities & helpers
│   │   ├── auth/                   # Auth utilities
│   │   ├── db/                     # Database utilities
│   │   ├── api-clients/            # External API clients
│   │   ├── utils/                  # General utilities
│   │   └── constants/              # Constants
│   ├── types/                      # TypeScript types
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Home page
│   └── globals.css                 # Global styles
├── prisma/
│   ├── schema.prisma               # Database schema
│   └── migrations/                 # Migration files
├── styles/
│   └── globals.css                 # Tailwind CSS
├── public/                         # Static assets
├── config/                         # Configuration files
├── tailwind.config.js              # Tailwind configuration
├── postcss.config.js               # PostCSS configuration
├── next.config.mjs                 # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies
└── .env.local.example              # Environment template
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "phone": "+2348012345678",
  "role": "APPLICANT"
}

Response: 201 Created
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {...}
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {...}
  }
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <accessToken>

Response: 200 OK
{
  "success": true,
  "data": {
    "user": {...}
  }
}
```

### Recruitment Endpoints

#### Get Jobs
```
GET /api/recruitment/jobs?page=1&limit=10&status=OPEN

Response: 200 OK
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

#### Submit Job Application
```
POST /api/recruitment/applications
Authorization: Bearer <accessToken>

{
  "jobId": "job-123",
  "preferredLocations": ["Wuse", "Maitama"],
  "cv": "https://...",
  "coverLetter": "..."
}
```

### Operations Endpoints

#### Create Booking
```
POST /api/operations/bookings

{
  "serviceId": "service-123",
  "customerName": "Ahmed",
  "customerPhone": "+2348012345678",
  "customerEmail": "ahmed@example.com",
  "serviceDate": "2024-06-15T10:00:00Z",
  "address": "123 Main Street",
  "areaCode": "WUSE",
  "latitude": 9.0765,
  "longitude": 7.3986,
  "estimatedPrice": 50000
}
```

#### Get Services
```
GET /api/operations/services

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Deep Cleaning",
      "type": "DEEP_CLEANING",
      "basePrice": 50000,
      "estimatedDuration": 240
    },
    ...
  ]
}
```

### Compliance Endpoints

#### Create Certificate
```
POST /api/compliance/certificates
Authorization: Bearer <adminToken>

{
  "type": "CAC_REGISTRATION",
  "certificateNumber": "BN-12345678",
  "issuedDate": "2024-01-01T00:00:00Z",
  "expiryDate": "2026-01-01T00:00:00Z",
  "issuerName": "CAC Nigeria",
  "certificateDocument": "https://..."
}
```

#### Verify Certificate
```
GET /api/compliance/verify/[QR_CODE]

Response: 200 OK
{
  "success": true,
  "data": {
    "certificate": {
      "id": "...",
      "type": "CAC_REGISTRATION",
      "status": "VERIFIED",
      "isExpired": false,
      "isVerified": true
    }
  }
}
```

---

## 📦 Modules Overview

### 1. Authentication & Authorization
- JWT-based authentication
- Role-based access control (ADMIN, MANAGER, EMPLOYEE, APPLICANT, CUSTOMER)
- Secure password hashing
- Session management
- Token refresh mechanism

### 2. Business Compliance & Verification
- CAC Registration tracking
- FCT Business Permit management
- Environmental Health Certificates
- Tax Identification Number verification
- QR-based certificate verification
- Public verification page
- Expiry date reminders
- Audit logging

### 3. AI Recruitment & Employment System
- Job posting and management
- Online job application portal
- AI-powered application screening
- Interview scheduling
- Digital contract signing
- Employee onboarding
- Shift allocation
- Performance tracking
- 3-strike warning system

### 4. AI Operations Engine
- AI booking chatbot
- Automated quote generation
- Real-time scheduling
- Route optimization
- Staff assignment automation
- GPS check-in verification
- WhatsApp reminders
- Shift tracking

### 5. AI Training Center
- Video training delivery
- SOP documentation
- Interactive quizzes
- Certification system
- Progress tracking
- Performance analytics

### 6. AI Analytics Dashboard
- Revenue tracking by service and location
- Staff performance metrics
- Customer retention rates
- Booking trends analysis
- Customer lifetime value
- Google review integration

### 7. AI Customer Support System
- FAQ automation
- Complaint ticketing
- Feedback collection
- Escalation workflows
- WhatsApp integration
- Multi-channel support

### 8. Accounting & Finance
- Invoice generation
- Expense tracking
- Payment processing
- Monthly P&L reports
- Automated categorization
- Wave Accounting integration

### 9. Admin Super Dashboard
- Real-time system overview
- Staff management
- Job management
- Compliance tracking
- Revenue monitoring
- User activity logs
- System notifications

---

## 🛠️ Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# In another terminal, open Prisma Studio
npm run prisma:studio

# Run database migrations
npm run prisma:migrate

# Generate TypeScript types from Prisma
npm run prisma:generate
```

### Code Style & Linting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run tests (Jest)
npm test

# Run tests with coverage
npm test -- --coverage

# Run E2E tests (Playwright)
npm run test:e2e
```

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request on GitHub
```

---

## 🚀 Deployment Guide

### Prerequisites

- GitHub account and repository
- Vercel account (https://vercel.com)
- PostgreSQL database (cloud-hosted)
- Supabase project (optional)

### Deploy to Vercel

#### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/your-username/swiftpack-pro.git
git branch -M main
git push -u origin main
```

#### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Select "Next.js" template
3. Import GitHub repository
4. Configure environment variables
5. Deploy

#### Step 3: Set Environment Variables

In Vercel dashboard:

1. Go to Settings > Environment Variables
2. Add all variables from `.env.local.example`
3. Set separate values for production
4. Deploy

### Deploy with Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t swiftpack-pro .
docker run -p 3000:3000 --env-file .env.local swiftpack-pro
```

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] SSL certificate installed
- [ ] CDN configured
- [ ] Email service configured
- [ ] Payment processing tested
- [ ] Admin account created
- [ ] Monitoring and logging set up
- [ ] Backups configured
- [ ] Domain configured

### Domain Launch Readiness

The site is ready for a public domain launch once you purchase a domain. Keep the following workflow for connecting the domain:

1. Purchase your domain from any registrar (Namecheap, GoDaddy, Cloudflare, etc.).
2. Deploy the app to Vercel or another hosting provider using the existing `package.json` scripts.
3. In Vercel, add the custom domain and verify DNS records.
4. Update production environment variables for the live site.
5. Run Prisma migrations on the production database.
6. Confirm SSL is active and visit the custom URL.

> Note: The careers module is currently hidden from public navigation, but the jobs page and application logic remain preserved in the codebase for quick reactivation later.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "DATABASE_URL not found"
```
Solution: Ensure .env.local file exists and contains DATABASE_URL
cp .env.local.example .env.local
# Edit DATABASE_URL with your credentials
```

#### 2. "Prisma migration error"
```bash
# Reset database (WARNING: deletes all data)
npm run prisma:migrate -- --name init

# Check migration status
npx prisma migrate status
```

#### 3. "Port 3000 already in use"
```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

#### 4. "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run prisma:generate
```

#### 5. "JWT Token invalid"
- Ensure JWT_SECRET is set correctly
- Check token hasn't expired
- Verify Authorization header format: `Authorization: Bearer <token>`

### Debug Mode

```bash
# Enable debug logging
ENABLE_DEBUG_LOGS=true npm run dev

# Check Prisma queries
DATABASE_DEBUG=true npm run dev
```

### Performance Optimization

```bash
# Analyze bundle size
npm run build
# Check size in .next/static/

# Enable compression in next.config.mjs
compress: true

# Use SWR for data fetching
// Caches API responses automatically
```

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

---

## 📄 License

Copyright © 2024 SwiftPack Pro. All rights reserved.

---

## ✅ Next Steps

1. **Set up database** with PostgreSQL or Supabase
2. **Configure environment variables** in `.env.local`
3. **Run migrations** with `npm run prisma:migrate`
4. **Start development server** with `npm run dev`
5. **Test APIs** using Postman or Thunder Client
6. **Build frontend pages** using UI components
7. **Deploy to Vercel** for production

For issues or questions, contact: **support@swiftpack.pro**
