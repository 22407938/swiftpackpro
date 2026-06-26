// prisma/seed.ts
import { PrismaClient, UserRole, ServiceType, EmploymentType } from '@prisma/client';
import { hashPassword } from '../app/lib/auth/password';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create admin user
  console.log('📝 Creating admin user...');
  const adminPassword = await hashPassword('Admin@123456');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@swiftpack.pro' },
    update: {},
    create: {
      email: 'admin@swiftpack.pro',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      emailVerified: true,
      isActive: true,
      phone: '+2348012345678',
    },
  });
  console.log(`✅ Admin created: ${admin.email}`);

  // 2. Create services
  console.log('📋 Creating services...');
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'service-deep-cleaning' },
      update: {},
      create: {
        id: 'service-deep-cleaning',
        name: 'Deep Cleaning',
        type: ServiceType.DEEP_CLEANING,
        description: 'Professional deep cleaning for homes and offices',
        basePrice: 50000,
        estimatedDuration: 240,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-move-in-out' },
      update: {},
      create: {
        id: 'service-move-in-out',
        name: 'Move In/Out Cleaning',
        type: ServiceType.MOVE_IN_OUT,
        description: 'Complete cleaning for moving scenarios',
        basePrice: 80000,
        estimatedDuration: 360,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-logistics' },
      update: {},
      create: {
        id: 'service-logistics',
        name: 'Logistics & Packing',
        type: ServiceType.LOGISTICS_PACKING,
        description: 'Professional packing and logistics services',
        basePrice: 100000,
        estimatedDuration: 480,
        isActive: true,
      },
    }),
    prisma.service.upsert({
      where: { id: 'service-commercial' },
      update: {},
      create: {
        id: 'service-commercial',
        name: 'Commercial Cleaning',
        type: ServiceType.COMMERCIAL_CLEANING,
        description: 'Professional cleaning for commercial spaces',
        basePrice: 150000,
        estimatedDuration: 300,
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Created ${services.length} services`);

  // 3. Create locations
  console.log('📍 Creating locations...');
  const locations = [
    { code: 'KUBWA', name: 'Kubwa' },
    { code: 'LUGBE', name: 'Lugbe' },
    { code: 'WUSE', name: 'Wuse' },
    { code: 'MAITAMA', name: 'Maitama' },
    { code: 'APO', name: 'Apo' },
    { code: 'KARASANA', name: 'Karasana' },
    { code: 'GWARINPA', name: 'Gwarinpa' },
    { code: 'DUTSE', name: 'Dutse' },
    { code: 'ASOKORO', name: 'Asokoro' },
    { code: 'NYANYA', name: 'Nyanya' },
    { code: 'ZUBA', name: 'Zuba' },
    { code: 'AIRPORT_ROAD', name: 'Airport Road' },
    { code: 'LOKOGOMA', name: 'Lokogoma' },
    { code: 'JABI', name: 'Jabi' },
    { code: 'JAHI', name: 'Jahi' },
    { code: 'GARKI', name: 'Garki' },
    { code: 'UTAKO', name: 'Utako' },
    { code: 'GAMES_VILLAGE', name: 'Games Village' },
  ];

  await Promise.all(
    locations.map((loc) =>
      prisma.location.upsert({
        where: { code: loc.code },
        update: {},
        create: loc,
      })
    )
  );
  console.log(`✅ Created ${locations.length} locations`);

  // 4. Create sample job
  console.log('💼 Creating sample jobs...');
  await prisma.job.upsert({
    where: { id: 'job-cleaner-wuse' },
    update: {},
    create: {
      id: 'job-cleaner-wuse',
      title: 'Professional Cleaner - Wuse Area',
      description: 'We are looking for experienced cleaners for our Wuse operations.',
      employmentType: EmploymentType.FREELANCE,
      locations: JSON.stringify(['Wuse', 'Maitama']),
      salary: 50000,
      salaryMin: 45000,
      salaryMax: 60000,
      requirements: JSON.stringify(['1+ years experience', 'Attention to detail', 'Reliability']),
      responsibilities: JSON.stringify([
        'Perform cleaning tasks',
        'Maintain equipment',
        'Report issues',
      ]),
      status: 'OPEN',
      positionsOpen: 5,
      closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
  });
  console.log('✅ Created sample job');

  // 5. Create sample test user
  console.log('👤 Creating test user...');
  const testUserPassword = await hashPassword('Test@123456');
  await prisma.user.upsert({
    where: { email: 'test@swiftpack.pro' },
    update: {},
    create: {
      email: 'test@swiftpack.pro',
      password: testUserPassword,
      firstName: 'Test',
      lastName: 'User',
      role: UserRole.APPLICANT,
      emailVerified: true,
      isActive: true,
      phone: '+2349012345678',
    },
  });
  console.log('✅ Test user created: test@swiftpack.pro');

  // 6. Create FAQs
  console.log('❓ Creating FAQs...');
  const faqs = [
    {
      question: 'How do I book a service?',
      answer: 'Visit our website, select your service, choose date/time, and complete payment. You will receive instant confirmation.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept bank transfers, Paystack, Stripe, and cash on delivery.',
    },
    {
      question: 'Are your staff verified?',
      answer: 'Yes, all staff undergo background checks and professional training.',
    },
  ];

  await Promise.all(
    faqs.map((faq) =>
      prisma.faq.upsert({
        where: { id: `faq-${faqs.indexOf(faq)}` },
        update: {},
        create: {
          id: `faq-${faqs.indexOf(faq)}`,
          question: faq.question,
          answer: faq.answer,
          category: 'General',
        },
      })
    )
  );
  console.log(`✅ Created ${faqs.length} FAQs`);

  console.log('🎉 Seed completed successfully!');
  console.log('\n📚 Test Credentials:');
  console.log('Admin:  admin@swiftpack.pro / Admin@123456');
  console.log('User:   test@swiftpack.pro / Test@123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
