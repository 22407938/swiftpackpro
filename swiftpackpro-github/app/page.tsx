'use client';

import Link from 'next/link';
import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import Button from './components/ui/Button';
import Card from './components/ui/Card';

interface Service {
  id: string;
  icon: string;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
};

type Stat = {
  value: string;
  label: string;
  icon: string;
};

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  img: string;
};

type ProcessStep = {
  step: string;
  title: string;
  desc: string;
};

type BookingSelection = {
  service: Service | null;
  date: string | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  payment: 'card' | 'transfer' | 'cash';
};

type ToastState = {
  msg: string;
  type: 'success' | 'error';
};

const BRAND = {
  name: 'SwiftPack Pro',
  tagline: 'Swift. Precise. Impeccable.',
  sub: 'Cleaning & Courier Services',
  phone: '07044 933 807',
  email: 'akokasort@gmail.com',
  address: 'No 3 Commonwealth Avenue, Arab Kubwa, Abuja',
  whatsapp: '2347044933807',
  instagram: '@swiftpackpro',
  facebook: 'SwiftPackPro',
};

const SERVICES: Service[] = [
  {
    id: 1,
    icon: '✦',
    tag: 'Most Popular',
    name: 'Deep Clean+',
    short: 'Spotless transformation, guaranteed.',
    desc: 'Full interior steam cleaning — carpets, sofas, curtains, and hard surfaces deep-scrubbed to showroom condition.',
    features: [
      'Carpet & upholstery steam extraction',
      'Bathroom & kitchen sanitisation',
      'Window interior cleaning',
      'Deodorising treatment',
      'Post-clean inspection report',
    ],
    price: 35000,
    priceNote: 'per session',
    duration: '4–6 hrs',
    ideal: 'Homes, apartments, Airbnb properties',
    color: '#1e40af',
  },
  {
    id: 2,
    icon: '◈',
    tag: 'Premium',
    name: 'Post-Construction+',
    short: 'Build complete. Now make it pristine.',
    desc: 'Heavy-duty construction debris removal and fine-detail surface cleaning. Move-in ready within 24 hours.',
    features: [
      'Construction dust & debris removal',
      'Paint splatter & adhesive removal',
      'Tile grout polishing',
      'Fixture deep cleaning',
      'Final handover inspection',
    ],
    price: 65000,
    priceNote: 'per project',
    duration: '6–12 hrs',
    ideal: 'New builds, renovated spaces, offices',
    color: '#0f766e',
  },
  {
    id: 3,
    icon: '◉',
    tag: 'Bundle Save',
    name: 'Pack-Out Logistics+',
    short: 'Move out clean. Move in ready.',
    desc: 'Complete move management — pack-out cleaning at your old address, courier logistics, and deep clean at the new destination.',
    features: [
      'Origin property full clean',
      'Packing & inventory assistance',
      'Insured courier transport',
      'Destination move-in clean',
      'Same-day available',
    ],
    price: 45000,
    priceNote: 'per move',
    duration: 'Full day',
    ideal: 'Relocating families, corporate transfers',
    color: '#7c3aed',
  },
  {
    id: 4,
    icon: '◆',
    tag: 'Corporate',
    name: 'Office Cleaning+',
    short: 'Professional spaces, professionally cleaned.',
    desc: 'Recurring corporate cleaning with executive washroom sanitisation, workstation care, and scheduled maintenance.',
    features: [
      'Daily / weekly / monthly plans',
      'Executive washroom deep clean',
      'Common area maintenance',
      'Workstation sanitising',
      'Restocking of supplies',
    ],
    price: 28000,
    priceNote: 'per session',
    duration: '2–4 hrs',
    ideal: 'Offices, co-working spaces, commercial',
    color: '#b45309',
  },
  {
    id: 5,
    icon: '★',
    tag: 'Specialty',
    name: 'Airbnb Turnover+',
    short: 'Guest checks out. Next guest wows.',
    desc: 'Fast-turnaround cleaning between Airbnb guests. Linen change, restocking, and photo-ready staging included.',
    features: [
      'Express 2-hour turnover',
      'Linen washing & bed making',
      'Guest amenity restocking',
      'Photo-ready staging',
      'Host coordination app',
    ],
    price: 18000,
    priceNote: 'per turnover',
    duration: '1–3 hrs',
    ideal: 'Airbnb hosts, short-let operators',
    color: '#be185d',
  },
  {
    id: 6,
    icon: '⬡',
    tag: 'New',
    name: 'Commercial Sanitisation+',
    short: 'High-traffic spaces. Zero compromise.',
    desc: 'Hospital-grade disinfection for retail, restaurants, gyms, and high-footfall commercial environments.',
    features: [
      'WHO-approved disinfectants',
      'Electrostatic spraying',
      'Air quality treatment',
      'Contact surface audit',
      'Certification document',
    ],
    price: 55000,
    priceNote: 'per space',
    duration: '3–5 hrs',
    ideal: 'Restaurants, clinics, gyms, retail',
    color: '#0369a1',
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Emeka Okafor',
    role: 'CEO, NovaTech Ltd',
    rating: 5,
    text: 'SwiftPack Pro handled our entire office relocation in Abuja — packing, courier, and cleaning at the new site. Absolutely seamless. Our team walked into a spotless office on Monday morning.',
    avatar: 'EO',
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Property Manager',
    rating: 5,
    text: "I manage 12 Airbnb units. SwiftPack's turnover team is the only reason I maintain a 4.9 rating. Fast, reliable, and the attention to detail is unmatched in Abuja.",
    avatar: 'FA',
  },
  {
    name: 'Dr. Chidi Nwosu',
    role: 'Dental Clinic Owner',
    rating: 5,
    text: "For a medical facility, cleanliness is non-negotiable. SwiftPack Pro's commercial sanitisation team meets our standards every single time. Worth every naira.",
    avatar: 'CN',
  },
  {
    name: 'Amaka Eze',
    role: 'Interior Designer',
    rating: 5,
    text: 'Post-construction clean is where most companies fail. SwiftPack Pro delivered a truly spotless finish on a 5-bedroom duplex. My client was in tears — the good kind.',
    avatar: 'AE',
  },
  {
    name: 'Bashir Musa',
    role: 'Real Estate Developer',
    rating: 5,
    text: "We've used SwiftPack Pro on 6 development handovers now. Consistent quality, professional team, and they actually show up on time. That alone sets them apart in Abuja.",
    avatar: 'BM',
  },
];

const FAQS: FAQ[] = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking 24–48 hours ahead for standard services. For post-construction or full-day logistics, 3–5 days is ideal. Same-day emergency bookings are available for an additional fee.',
  },
  {
    q: 'Do you bring your own cleaning equipment?',
    a: 'Yes. Our teams arrive with professional-grade equipment — industrial steam cleaners, HEPA vacuums, and WHO-approved cleaning agents. You do not need to provide anything.',
  },
  {
    q: 'Are your staff vetted and insured?',
    a: 'Every SwiftPack Pro team member undergoes background verification, professional training, and is covered under our company insurance policy. Your property is protected.',
  },
  {
    q: 'What areas do you serve in Abuja?',
    a: 'We cover all of Abuja FCT — Maitama, Asokoro, Gwarinpa, Wuse, Garki, Jabi, Kubwa, Lugbe, Katampe, Apo, and surrounding districts. Contact us for areas not listed.',
  },
  {
    q: 'Can I reschedule or cancel a booking?',
    a: 'Yes. Cancel or reschedule up to 24 hours before your appointment at no charge. Same-day cancellations may incur a 20% fee to cover team logistics.',
  },
  {
    q: 'Do you offer recurring service discounts?',
    a: 'Absolutely. Monthly contracts receive 15% off. Weekly plans save 20%. Corporate accounts are quoted separately with dedicated account management.',
  },
  {
    q: 'How do I pay?',
    a: 'We accept bank transfer, Paystack card payment, USSD, and cash on completion. A 30% deposit confirms your booking for larger jobs.',
  },
  {
    q: 'What if I am not satisfied with the result?',
    a: 'We have a 24-hour re-clean guarantee. If you are not satisfied with any aspect of the service, we return within 24 hours at zero additional cost.',
  },
];

const STATS: Stat[] = [
  { value: '2,400+', label: 'Homes & Offices Cleaned', icon: '🏠' },
  { value: '98.7%', label: 'Client Satisfaction Rate', icon: '⭐' },
  { value: '4 yrs', label: 'Serving Abuja', icon: '📍' },
  { value: '< 2hr', label: 'Average Response Time', icon: '⚡' },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: '5 Signs Your Office Needs a Deep Clean (Not Just a Daily Wipe-Down)',
    excerpt: 'Most offices clean surfaces daily but miss the invisible buildup that affects air quality and staff health. Here is what to look for.',
    date: 'May 14, 2026',
    category: 'Office Cleaning',
    readTime: '4 min',
    img: 'office',
  },
  {
    id: 2,
    title: "Airbnb Hosting in Abuja: How a 5-Star Turnover Process Gets You 5-Star Reviews",
    excerpt: 'The #1 complaint on Airbnb reviews is not price or location — it is cleanliness. Here is how top Abuja hosts stay ahead.',
    date: 'May 7, 2026',
    category: 'Airbnb',
    readTime: '6 min',
    img: 'airbnb',
  },
  {
    id: 3,
    title: 'Post-Construction Cleaning: The 7 Mistakes Developers Make (And How to Avoid Them)',
    excerpt: 'Cutting corners on post-construction cleaning costs developers in delays, complaints, and client trust. Do not make these errors.',
    date: 'Apr 28, 2026',
    category: 'Construction',
    readTime: '5 min',
    img: 'construction',
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'Book Online', desc: 'Choose your service, pick a date and time that works for you. Confirmation in 60 seconds.' },
  { step: '02', title: 'We Prepare', desc: 'Our team reviews your brief, assigns the right specialists, and loads all necessary equipment.' },
  { step: '03', title: 'We Arrive & Clean', desc: 'Punctual, professional, fully equipped. You can stay or step out — we work either way.' },
  { step: '04', title: 'Inspect & Sign Off', desc: 'Walkthrough with our team lead. 100% satisfied? We close out and send your digital receipt.' },
];

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,900;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:       #0a1628;
      --navy-2:     #0f2044;
      --navy-3:     #162a55;
      --gold:       #c9a84c;
      --gold-light: #e4c97a;
      --gold-dark:  #a8882c;
      --white:      #ffffff;
      --off-white:  #f8f6f1;
      --gray-100:   #f1f0ed;
      --gray-400:   #9ca3af;
      --gray-600:   #6b7280;
      --gray-900:   #111827;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Outfit', sans-serif;
      background: var(--white);
      color: var(--navy);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    body.dark-mode {
      background: var(--navy);
      color: var(--off-white);
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--navy); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

    .font-display { font-family: 'Playfair Display', serif; }

    @keyframes fadeUp     { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn     { from { opacity:0; } to { opacity:1; } }
    @keyframes slideRight { from { opacity:0; transform:translateX(-24px); } to { opacity:1; transform:translateX(0); } }
    @keyframes float      { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
    @keyframes shimmer    { 0% { background-position:-400px 0; } 100% { background-position:400px 0; } }
    @keyframes marquee    { 0% { transform:translateX(0); } 100% { transform:translateX(-50%); } }
    @keyframes pulse-ring { 0% { transform:scale(1); opacity:1; } 100% { transform:scale(1.6); opacity:0; } }
    @keyframes spin       { to { transform:rotate(360deg); } }
    @keyframes slideDown  { from { opacity:0; transform:translateY(-16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes countUp    { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
    @keyframes gradMove   { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }

    .anim-fadeUp     { animation: fadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
    .anim-fadeIn     { animation: fadeIn 0.5s ease both; }
    .anim-slideRight { animation: slideRight 0.6s cubic-bezier(.22,1,.36,1) both; }
    .anim-float      { animation: float 5s ease-in-out infinite; }
    .anim-spin       { animation: spin 1.2s linear infinite; }

    .delay-1 { animation-delay: 0.1s; }
    .delay-2 { animation-delay: 0.2s; }
    .delay-3 { animation-delay: 0.3s; }
    .delay-4 { animation-delay: 0.4s; }
    .delay-5 { animation-delay: 0.5s; }
    .delay-6 { animation-delay: 0.6s; }

    .gold-text {
      background: linear-gradient(135deg, #c9a84c 0%, #e4c97a 40%, #c9a84c 70%, #a8882c 100%);
      background-size: 300% 100%;
      animation: shimmer 4s linear infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .glass {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(201,168,76,0.2);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    .glass-dark {
      background: rgba(10,22,40,0.8);
      border: 1px solid rgba(201,168,76,0.15);
      backdrop-filter: blur(16px);
    }

    .btn-primary {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      background: linear-gradient(135deg, #c9a84c, #a8882c);
      color: #0a1628; border: none; border-radius: 8px;
      font-family: 'Outfit', sans-serif; font-weight: 700; cursor: pointer;
      transition: all 0.3s cubic-bezier(.22,1,.36,1);
      position: relative; overflow: hidden;
    }
    .btn-primary::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, #e4c97a, #c9a84c);
      opacity: 0; transition: opacity 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.4); }
    .btn-primary:hover::before { opacity: 1; }
    .btn-primary span { position: relative; z-index: 1; }

    .btn-outline {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      background: transparent; color: #c9a84c;
      border: 1.5px solid rgba(201,168,76,0.5); border-radius: 8px;
      font-family: 'Outfit', sans-serif; font-weight: 600; cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-outline:hover {
      border-color: #c9a84c; background: rgba(201,168,76,0.1);
      transform: translateY(-2px);
    }

    .btn-white {
      display: inline-flex; align-items: center; justify-content: center; gap: 8px;
      background: white; color: #0a1628; border: none; border-radius: 8px;
      font-family: 'Outfit', sans-serif; font-weight: 700; cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-white:hover { background: #f8f6f1; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

    .card-hover {
      transition: all 0.35s cubic-bezier(.22,1,.36,1);
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 64px rgba(0,0,0,0.12);
    }

    .section-label {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
      text-transform: uppercase; color: #c9a84c;
    }
    .section-label::before, .section-label::after {
      content: ''; display: block; width: 24px; height: 1px; background: #c9a84c;
    }

    .divider { width: 64px; height: 2px; background: linear-gradient(90deg, #c9a84c, transparent); }

    .input {
      width: 100%; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(201,168,76,0.25); border-radius: 10px;
      color: white; padding: 14px 18px;
      font-family: 'Outfit', sans-serif; font-size: 14px; outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input:focus {
      border-color: rgba(201,168,76,0.6);
      box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
    }
    .input::placeholder { color: rgba(255,255,255,0.3); }
    .input-light {
      background: white; border: 1.5px solid #e5e7eb; color: #0a1628;
    }
    .input-light::placeholder { color: #9ca3af; }
    .input-light:focus { border-color: #c9a84c; }
    select.input option { background: #0f2044; }
    select.input-light option { background: white; color: #0a1628; }

    .nav-link {
      font-size: 13px; font-weight: 500; letter-spacing: 0.04em;
      color: rgba(255,255,255,0.75); cursor: pointer; transition: color 0.2s;
      text-decoration: none; position: relative; padding-bottom: 2px;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px;
      background: #c9a84c; transition: width 0.3s;
    }
    .nav-link:hover { color: #c9a84c; }
    .nav-link:hover::after { width: 100%; }
    .nav-link.active { color: #c9a84c; }
    .nav-link.active::after { width: 100%; }

    .progress-track { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
    .progress-fill  { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #c9a84c, #e4c97a); transition: width 1.2s ease; }

    .whatsapp-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 999;
      width: 58px; height: 58px; border-radius: 50%;
      background: #25D366; border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 8px 32px rgba(37,211,102,0.4);
      transition: all 0.3s ease;
    }
    .whatsapp-fab:hover { transform: scale(1.1); box-shadow: 0 12px 40px rgba(37,211,102,0.5); }
    .whatsapp-fab::before {
      content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%;
      background: rgba(37,211,102,0.4); animation: pulse-ring 2s ease-out infinite;
    }

    .dark-toggle {
      width: 44px; height: 24px; border-radius: 12px; cursor: pointer;
      border: none; position: relative; transition: background 0.3s;
    }
    .dark-toggle-thumb {
      position: absolute; top: 3px; width: 18px; height: 18px; border-radius: 50%;
      background: white; transition: transform 0.3s; box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    }

    .marquee-track { display: flex; width: max-content; animation: marquee 20s linear infinite; }

    .accordion-body {
      overflow: hidden; transition: max-height 0.4s cubic-bezier(.22,1,.36,1), opacity 0.3s;
    }

    .stars { color: #c9a84c; letter-spacing: 2px; font-size: 14px; }

    .grid-bg {
      background-image: linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px);
      background-size: 64px 64px;
    }

    .noise-bg::after {
      content: ''; position: absolute; inset: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      opacity: 0.4;
    }

    @media (max-width: 768px) {
      .hide-mobile  { display: none !important; }
      .mobile-stack { flex-direction: column !important; }
      .mobile-full  { width: 100% !important; }
      .hide-desktop { display: inline-flex !important; }
    }
    @media (max-width: 480px) {
      .hide-small { display: none !important; }
    }

    .hide-desktop { display: none !important; }

    .admin-card { background: white; border: 1px solid #f1f0ed; border-radius: 12px; }
    .admin-table th { background: #f8f6f1; color: #6b7280; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; padding: 12px 16px; font-weight: 700; }
    .admin-table td { padding: 14px 16px; font-size: 14px; border-bottom: 1px solid #f1f0ed; }
    .admin-table tr:last-child td { border: none; }
    .admin-table tr:hover td { background: #f8f6f1; }

    .cal-day {
      aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
      border-radius: 8px; font-size: 13px; cursor: pointer; transition: all 0.2s;
      border: 1px solid transparent;
    }
    .cal-day:hover:not(.disabled):not(.selected) { background: rgba(201,168,76,0.1); border-color: rgba(201,168,76,0.3); }
    .cal-day.selected { background: #c9a84c; color: #0a1628; font-weight: 700; }
    .cal-day.today { border-color: #c9a84c; color: #c9a84c; font-weight: 600; }
    .cal-day.disabled { opacity: 0.3; cursor: not-allowed; }

    .toast {
      position: fixed; bottom: 90px; right: 28px; z-index: 9999;
      background: #0f2044; border: 1px solid rgba(201,168,76,0.4);
      border-radius: 12px; padding: 16px 20px;
      animation: slideDown 0.4s ease both;
      box-shadow: 0 12px 40px rgba(0,0,0,0.3);
      max-width: 320px;
    }

    .dark { background: var(--navy) !important; }
    .dark-text { color: var(--off-white) !important; }
    .dark-border { border-color: rgba(201,168,76,0.2) !important; }
  `}</style>
);

const Logo = ({ size = 38 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
    <rect width="40" height="40" rx="8" fill="url(#lg)" />
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="40" y2="40">
        <stop stopColor="#c9a84c" />
        <stop offset="1" stopColor="#e4c97a" />
      </linearGradient>
    </defs>
    <path d="M8 14h16l5 5-5 5H8V14z" fill="#0a1628" opacity="0.9" />
    <path d="M15 24h14l3 3-3 3H15v-6z" fill="#0a1628" opacity="0.7" />
    <circle cx="31" cy="29" r="3" fill="#0a1628" />
    <circle cx="12" cy="28" r="2.5" fill="#0a1628" opacity="0.5" />
  </svg>
);

const useDark = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [dark]);

  return [dark, setDark];
};

const Navbar = ({ page, setPage, dark, setDark }: { page: string; setPage: (page: string) => void; dark: boolean; setDark: (value: boolean) => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mOpen, setMOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Home', 'Services', 'Pricing', 'About', 'Compliance', 'Blog', 'FAQ', 'Contact'];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        background: scrolled ? 'rgba(10,22,40,0.97)' : 'rgba(10,22,40,0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(201,168,76,0.15)' : 'none',
        transition: 'all 0.4s ease',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center', gap: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer', flexShrink: 0 }} onClick={() => { setPage('home'); setMOpen(false); }}>
          <Logo size={36} />
          <div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: 'white', lineHeight: 1.1 }}>
              SwiftPack <span style={{ color: '#c9a84c' }}>Pro</span>
            </div>
            <div style={{ fontSize: 8, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
              Cleaning & Courier
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        <div className="hide-mobile" style={{ display: 'flex', gap: 28 }}>
          {links.map((l) => (
            <span
              key={l}
              className={`nav-link${page === l.toLowerCase() || (page === 'home' && l === 'Home') ? ' active' : ''}`}
              onClick={() => { setPage(l.toLowerCase()); setMOpen(false); }}
            >
              {l}
            </span>
          ))}
        </div>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="dark-toggle" onClick={() => setDark(!dark)} style={{ background: dark ? '#c9a84c' : 'rgba(255,255,255,0.15)' }}>
            <div className="dark-toggle-thumb" style={{ transform: dark ? 'translateX(20px)' : 'translateX(3px)' }} />
          </button>
          <button className="btn-outline" style={{ padding: '9px 18px', fontSize: 13 }} onClick={() => { setPage('login'); setMOpen(false); }}>
            Login
          </button>
          <button className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }} onClick={() => { setPage('booking'); setMOpen(false); }}>
            <span>Book Now</span>
          </button>
        </div>

        <button
          onClick={() => setMOpen(!mOpen)}
          style={{ background: 'none', border: 'none', color: '#c9a84c', fontSize: 22, cursor: 'pointer', padding: 4 }}
          className="hide-desktop"
          aria-label="Menu"
        >
          {mOpen ? '✕' : '☰'}
        </button>
      </div>

      {mOpen && (
        <div style={{ background: 'rgba(10,22,40,0.99)', padding: '16px 28px 24px', borderTop: '1px solid rgba(201,168,76,0.1)', animation: 'slideDown 0.2s ease' }}>
          {links.map((l) => (
            <div
              key={l}
              style={{ padding: '13px 0', color: 'rgba(255,255,255,0.8)', fontSize: 15, cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
              onClick={() => { setPage(l.toLowerCase()); setMOpen(false); }}
            >
              {l}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <button className="btn-outline" style={{ flex: 1, padding: '11px' }} onClick={() => { setPage('login'); setMOpen(false); }}>
              Login
            </button>
            <button className="btn-primary" style={{ flex: 1, padding: '11px' }} onClick={() => { setPage('booking'); setMOpen(false); }}>
              <span>Book Now</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setStatsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #0a1628 0%, #0f2044 50%, #162a55 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '120px 28px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {[
          { w: 500, h: 500, top: '-15%', left: '-10%', opacity: 0.06 },
          { w: 350, h: 350, top: '50%', right: '-8%', opacity: 0.05 },
          { w: 200, h: 200, top: '20%', left: '60%', opacity: 0.04 },
        ].map((o, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: o.w,
              height: o.h,
              borderRadius: '50%',
              top: o.top,
              left: o.left,
              right: o.right,
              background: `radial-gradient(circle, rgba(201,168,76,${o.opacity}) 0%, transparent 70%)`,
              animation: `float ${6 + i * 1.5}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`,
              pointerEvents: 'none',
            }}
          />
        ))}

        <div className="grid-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: 300,
            height: 300,
            border: '1px solid rgba(201,168,76,0.1)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: '7%',
            width: 240,
            height: 240,
            border: '1px solid rgba(201,168,76,0.08)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', position: 'relative' }}>
          <div style={{ maxWidth: 760 }}>
            <div className="anim-slideRight" style={{ marginBottom: 28 }}>
              <span className="section-label">Premium Service · Abuja, Nigeria</span>
            </div>

            <h1 className="font-display anim-fadeUp delay-1" style={{ fontSize: 'clamp(44px,7vw,88px)', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: 8 }}>
              Your Space,
            </h1>
            <h1 className="font-display anim-fadeUp delay-2" style={{ fontSize: 'clamp(44px,7vw,88px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 8 }}>
              <span className="gold-text">Immaculately</span>
            </h1>
            <h1 className="font-display anim-fadeUp delay-3" style={{ fontSize: 'clamp(44px,7vw,88px)', fontWeight: 900, lineHeight: 1.05, color: 'white', marginBottom: 32 }}>
              Restored.
            </h1>

            <p className="anim-fadeUp delay-4" style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, maxWidth: 560, marginBottom: 44, fontWeight: 300 }}>
              Abuja's premier cleaning and pack-out logistics company. Deep cleans, post-construction, Airbnb turnovers, office care — delivered with precision.
            </p>

            <div className="anim-fadeUp delay-5" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ padding: '16px 36px', fontSize: 16 }} onClick={() => setPage('booking')}>
                <span>📅 Book a Service</span>
              </button>
              <button className="btn-outline" style={{ padding: '16px 36px', fontSize: 16 }} onClick={() => setPage('services')}>
                View Services
              </button>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '16px 24px',
                  fontSize: 16,
                  borderRadius: 8,
                  background: 'rgba(37,211,102,0.15)',
                  border: '1.5px solid rgba(37,211,102,0.4)',
                  color: '#25D366',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          <div className="anim-fadeUp delay-6" style={{ display: 'flex', gap: 0, marginTop: 72, flexWrap: 'wrap' }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 160px',
                  padding: '24px 28px',
                  borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}
              >
                <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: '#c9a84c', animation: statsVisible ? `countUp 0.6s ease ${i * 0.1}s both` : 'none' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Scroll</div>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(180deg, rgba(201,168,76,0.6), transparent)', animation: 'float 2s ease-in-out infinite' }} />
        </div>
      </section>

      <div style={{ background: 'linear-gradient(135deg, #c9a84c, #a8882c)', padding: '14px 0', overflow: 'hidden' }}>
        <div className="marquee-track">
          {[...Array(2)].map((_, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 48, paddingRight: 48, flexShrink: 0 }}>
              {['Deep Clean+', 'Post-Construction+', 'Pack-Out Logistics+', 'Office Cleaning+', 'Airbnb Turnover+', 'Same-Day Available', '98.7% Satisfaction', "Abuja's #1 Choice"].map((t, i) => (
                <span key={i} style={{ color: '#0a1628', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                  ✦ {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section style={{ padding: '100px 28px', background: '#f8f6f1' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center', color: '#c9a84c' }}>
              What We Offer
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: '#0a1628', marginBottom: 16 }}>
              Services Built for <span style={{ color: '#c9a84c' }}>Abuja</span>
            </h2>
            <p style={{ fontSize: 17, color: '#6b7280', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
              From single-room cleans to full commercial sanitisation — every service comes with our 24-hour re-clean guarantee.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {SERVICES.slice(0, 4).map((s, i) => (
              <div
                key={s.id}
                className="card-hover"
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 32,
                  border: '1px solid #f1f0ed',
                  cursor: 'pointer',
                  animationDelay: `${i * 0.1}s`,
                }}
                onClick={() => setPage('booking')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 12, background: `${s.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: s.color }}>
                    {s.icon}
                  </div>
                  <span style={{ background: '#f8f6f1', color: '#6b7280', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase' }}>
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>
                  {s.name}
                </h3>
                <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 16, fontStyle: 'italic' }}>{s.short}</p>
                <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 24 }}>{s.desc}</p>
                <div style={{ borderTop: '1px solid #f1f0ed', paddingTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#9ca3af', marginBottom: 2 }}>From</div>
                    <div className="font-display" style={{ fontSize: 24, fontWeight: 700, color: '#c9a84c' }}>
                      ₦{s.price.toLocaleString()}
                    </div>
                  </div>
                  <button className="btn-primary" style={{ padding: '9px 18px', fontSize: 13 }}>
                    <span>Book →</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button className="btn-outline" style={{ padding: '14px 36px', fontSize: 15, borderColor: '#0a1628', color: '#0a1628' }} onClick={() => setPage('services')}>
              View All Services →
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 28px', background: '#0a1628' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center' }}>Simple Process</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(30px,5vw,48px)', fontWeight: 700, color: 'white' }}>
              Booked in Minutes. <span className="gold-text">Cleaned to Perfection.</span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 2 }}>
            {PROCESS_STEPS.map((s, i) => (
              <div key={i} style={{ padding: '40px 32px', position: 'relative' }}>
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hide-mobile" style={{ position: 'absolute', right: 0, top: 52, width: 2, height: 1, background: 'rgba(201,168,76,0.2)', transform: 'scaleX(40)' }} />
                )}
                <div className="font-display" style={{ fontSize: 56, fontWeight: 900, color: 'rgba(201,168,76,0.15)', marginBottom: 16, lineHeight: 1 }}>
                  {s.step}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: 'white', marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <button className="btn-primary" style={{ padding: '16px 40px', fontSize: 16 }} onClick={() => setPage('booking')}>
              <span>Start Your Booking →</span>
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 28px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center', color: '#c9a84c' }}>
              Client Stories
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(30px,5vw,48px)', fontWeight: 700, color: '#0a1628' }}>
              Trusted by Abuja's <span style={{ color: '#c9a84c' }}>Best</span>
            </h2>
          </div>

          <div style={{ maxWidth: 720, margin: '0 auto', marginBottom: 40 }}>
            <div style={{ background: '#0a1628', borderRadius: 20, padding: 48, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 24, right: 32, fontFamily: 'Playfair Display, serif', fontSize: 120, color: 'rgba(201,168,76,0.08)', lineHeight: 1, userSelect: 'none' }}>
                "
              </div>
              <div className="stars" style={{ marginBottom: 20 }}>{'★'.repeat(5)}</div>
              <p className="font-display" style={{ fontSize: 20, color: 'white', lineHeight: 1.7, fontStyle: 'italic', marginBottom: 28 }}>
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'linear-gradient(135deg, #c9a84c, #e4c97a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700, color: '#0a1628', flexShrink: 0 }}>
                  {TESTIMONIALS[activeTestimonial].avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: 15 }}>{TESTIMONIALS[activeTestimonial].name}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{TESTIMONIALS[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{
                    width: i === activeTestimonial ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    background: i === activeTestimonial ? '#c9a84c' : '#e5e7eb',
                  }}
                />
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} style={{ background: '#f8f6f1', borderRadius: 14, padding: 24 }}>
                <div className="stars" style={{ fontSize: 12, marginBottom: 10 }}>{'★'.repeat(t.rating)}</div>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7, marginBottom: 16 }}>
                  "{t.text.slice(0, 120)}..."
                </p>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0a1628' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        style={{
          padding: '72px 28px',
          background: 'linear-gradient(135deg, #c9a84c 0%, #e4c97a 40%, #c9a84c 70%, #a8882c 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradMove 6s ease infinite',
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(10,22,40,0.6)', marginBottom: 8 }}>Book a Service Today</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(26px,4vw,44px)', fontWeight: 700, color: '#0a1628', lineHeight: 1.2 }}>
              Reserve Your Slot Now
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(10,22,40,0.7)', marginTop: 8 }}>Same-day and weekend bookings available.</p>
          </div>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#0a1628', letterSpacing: '-0.02em' }}>{BRAND.phone}</div>
              <div style={{ fontSize: 12, color: 'rgba(10,22,40,0.6)' }}>7 days a week · 7am–9pm</div>
            </div>
            <button className="btn-white" style={{ padding: '14px 28px', fontSize: 15 }} onClick={() => setPage('booking')}>
              Book Online →
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 28px', background: '#f8f6f1' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center', color: '#c9a84c' }}>
              FAQ
            </div>
            <h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#0a1628' }}>
              Questions Answered
            </h2>
          </div>

          {FAQS.slice(0, 5).map((faq, i) => (
            <div key={i} style={{ borderBottom: '1px solid #e5e7eb', padding: '4px 0' }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%', background: 'none', border: 'none', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 16,
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0a1628', textAlign: 'left', lineHeight: 1.4 }}>{faq.q}</span>
                <span style={{ color: '#c9a84c', fontSize: 20, flexShrink: 0, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div className="accordion-body" style={{ maxHeight: openFaq === i ? 300 : 0, opacity: openFaq === i ? 1 : 0 }}>
                <p style={{ paddingBottom: 20, fontSize: 14, color: '#6b7280', lineHeight: 1.8 }}>{faq.a}</p>
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button className="btn-outline" style={{ padding: '12px 28px', borderColor: '#0a1628', color: '#0a1628' }} onClick={() => setPage('faq')}>
              View All FAQs →
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 28px', background: 'white' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12, color: '#c9a84c' }}>
                From Our Blog
              </div>
              <h2 className="font-display" style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 700, color: '#0a1628' }}>
                Cleaning Tips & Insights
              </h2>
            </div>
            <button className="btn-outline" style={{ padding: '11px 24px', borderColor: '#0a1628', color: '#0a1628' }} onClick={() => setPage('blog')}>
              All Posts →
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                className="card-hover"
                style={{ background: '#f8f6f1', borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => setPage('blog')}
              >
                <div
                  style={{
                    height: 200,
                    background: `linear-gradient(135deg, #0a1628 0%, ${['#1e40af', '#0f766e', '#7c3aed'][post.id - 1]} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 48,
                  }}
                >
                  {['🏢', '🏠', '🏗'][post.id - 1]}
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                    <span style={{ background: '#0a162815', color: '#0a1628', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: 11, color: '#9ca3af' }}>{post.readTime} read</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0a1628', lineHeight: 1.4, marginBottom: 10 }}>{post.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{post.excerpt}</p>
                  <div style={{ marginTop: 16, fontSize: 12, color: '#9ca3af' }}>{post.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<BookingSelection>({
    service: null,
    date: null,
    time: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
    payment: 'card',
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const [calMonth, setCalMonth] = useState(today.getMonth());
  const [calYear, setCalYear] = useState(today.getFullYear());

  const TIMES = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDay = (m: number, y: number) => new Date(y, m, 1).getDay();

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', paddingTop: 100 }}>
        <div style={{ textAlign: 'center', maxWidth: 520 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '2px solid #c9a84c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>
            ✦
          </div>
          <h2 className="font-display" style={{ fontSize: 36, fontWeight: 700, color: 'white', marginBottom: 12 }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 28, fontSize: 16 }}>
            Your {sel.service?.name} has been scheduled for {sel.date} at {sel.time}. A confirmation SMS and email has been sent to {sel.phone || sel.email}.
          </p>
          <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, padding: 20, marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Booking Reference</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#c9a84c', letterSpacing: '0.1em' }}>
              SWP-{Date.now().toString().slice(-6)}
            </div>
          </div>
          <button
            className="btn-primary"
            style={{ padding: '14px 32px', fontSize: 15 }}
            onClick={() => {
              setDone(false);
              setStep(1);
              setSel({ service: null, date: null, time: null, name: '', email: '', phone: '', address: '', notes: '', payment: 'card' });
            }}
          >
            <span>Book Another Service</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a1628', paddingTop: 100 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 28px' }}>
        <div style={{ marginBottom: 40 }}>
          <div className="section-label" style={{ marginBottom: 12 }}>
            Online Booking
          </div>
          <h1 className="font-display" style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 700, color: 'white' }}>
            Reserve Your <span className="gold-text">Service Slot</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
          {['Choose Service', 'Select Date & Time', 'Your Details', 'Confirm'].map((label, i) => (
            <div key={label} style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: step > i + 1 ? '#c9a84c' : step === i + 1 ? 'linear-gradient(135deg, #c9a84c, #a8882c)' : 'rgba(255,255,255,0.08)',
                    border: `1px solid ${step >= i + 1 ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                    fontSize: 12,
                    fontWeight: 700,
                    color: step >= i + 1 ? '#0a1628' : 'rgba(255,255,255,0.3)',
                    transition: 'all 0.3s',
                  }}
                >
                  {step > i + 1 ? '✓' : i + 1}
                </div>
                {i < 3 && <div style={{ flex: 1, height: 1, background: step > i + 1 ? '#c9a84c' : 'rgba(255,255,255,0.08)', transition: 'background 0.3s' }} />}
              </div>
              <div style={{ fontSize: 10, color: step === i + 1 ? '#c9a84c' : 'rgba(255,255,255,0.3)', marginTop: 6, paddingRight: 8 }}>{label}</div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="anim-fadeUp">
            <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Select a Service</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {SERVICES.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSel((current) => ({ ...current, service: s }))}
                  style={{
                    padding: 22,
                    borderRadius: 14,
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    border: `1.5px solid ${sel.service?.id === s.id ? '#c9a84c' : 'rgba(255,255,255,0.08)'}`,
                    background: sel.service?.id === s.id ? 'rgba(201,168,76,0.1)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{ fontSize: 22, color: '#c9a84c' }}>{s.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'white', fontSize: 15 }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.duration} · {s.ideal}</div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#c9a84c', marginTop: 6 }}>₦{s.price.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="btn-primary"
              style={{ marginTop: 28, padding: '14px 36px', fontSize: 15, width: '100%' }}
              disabled={!sel.service}
              onClick={() => setStep(2)}
            >
              <span>Continue →</span>
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="anim-fadeUp">
            <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 20 }}>Pick Your Date & Time</h3>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <button
                  onClick={() => {
                    if (calMonth === 0) {
                      setCalMonth(11);
                      setCalYear((y) => y - 1);
                    } else {
                      setCalMonth((m) => m - 1);
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 18 }}
                >
                  ‹
                </button>
                <div style={{ color: 'white', fontWeight: 600 }}>{MONTHS[calMonth]} {calYear}</div>
                <button
                  onClick={() => {
                    if (calMonth === 11) {
                      setCalMonth(0);
                      setCalYear((y) => y + 1);
                    } else {
                      setCalMonth((m) => m + 1);
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 18 }}
                >
                  ›
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', padding: '4px 0', fontWeight: 600 }}>{d}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {[...Array(getFirstDay(calMonth, calYear))].map((_, i) => <div key={`e${i}`} />)}
                {[...Array(getDaysInMonth(calMonth, calYear))].map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isPast = new Date(dateStr) < new Date(today.toDateString());
                  const isSelected = sel.date === dateStr;
                  const isToday = dateStr === today.toISOString().split('T')[0];
                  return (
                    <div
                      key={day}
                      className={`cal-day${isPast ? ' disabled' : ''}${isSelected ? ' selected' : ''}${isToday && !isSelected ? ' today' : ''}`}
                      onClick={() => !isPast && setSel((current) => ({ ...current, date: dateStr }))}
                      style={{ color: isPast ? 'rgba(255,255,255,0.2)' : isSelected ? '#0a1628' : 'rgba(255,255,255,0.7)' }}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            {sel.date && (
              <div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, marginBottom: 12 }}>Available Times — {sel.date}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
                  {TIMES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSel((current) => ({ ...current, time: t }))}
                      style={{
                        padding: '11px',
                        borderRadius: 10,
                        border: `1.5px solid ${sel.time === t ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                        background: sel.time === t ? 'rgba(201,168,76,0.15)' : 'transparent',
                        color: sel.time === t ? '#c9a84c' : 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        fontSize: 13,
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        fontFamily: 'Outfit, sans-serif',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <button className="btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="btn-primary" style={{ flex: 2, padding: '14px' }} disabled={!sel.date || !sel.time} onClick={() => setStep(3)}>
                <span>Continue →</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="anim-fadeUp">
            <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Your Contact Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { k: 'name', l: 'Full Name *', p: 'John Adeyemi' },
                { k: 'phone', l: 'Phone Number *', p: '08012345678' },
              ].map((f) => (
                <div key={f.k}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>{f.l}</label>
                  <input className="input" placeholder={f.p} value={sel[f.k as 'name' | 'phone']} onChange={(e) => setSel((current) => ({ ...current, [f.k]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>Email Address</label>
              <input className="input" type="email" placeholder="john@example.com" value={sel.email} onChange={(e) => setSel((current) => ({ ...current, email: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>Service Address *</label>
              <input className="input" placeholder="Full address where service will take place" value={sel.address} onChange={(e) => setSel((current) => ({ ...current, address: e.target.value }))} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: 8 }}>Special Instructions</label>
              <textarea
                className="input"
                rows={3}
                placeholder="Any specific requirements, access instructions, or notes..."
                value={sel.notes}
                onChange={(e) => setSel((current) => ({ ...current, notes: e.target.value }))}
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>Payment Method</div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {[{ k: 'card', l: '💳 Card (Paystack)' }, { k: 'transfer', l: '🏦 Bank Transfer' }, { k: 'cash', l: '💵 Cash on Arrival' }].map((p) => (
                  <button
                    key={p.k}
                    onClick={() => setSel((current) => ({ ...current, payment: p.k as BookingSelection['payment'] }))}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 10,
                      border: `1.5px solid ${sel.payment === p.k ? '#c9a84c' : 'rgba(255,255,255,0.1)'}`,
                      background: sel.payment === p.k ? 'rgba(201,168,76,0.1)' : 'transparent',
                      color: sel.payment === p.k ? '#c9a84c' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontFamily: 'Outfit, sans-serif',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p.l}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="btn-primary" style={{ flex: 2, padding: '14px' }} disabled={!sel.name || !sel.phone || !sel.address} onClick={() => setStep(4)}>
                <span>Review Booking →</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="anim-fadeUp">
            <h3 style={{ color: 'white', fontSize: 18, fontWeight: 600, marginBottom: 24 }}>Confirm Your Booking</h3>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 16, padding: 28, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div>
                  <div className="font-display" style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 4 }}>{sel.service?.name}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{sel.service?.duration} · {sel.service?.ideal}</div>
                </div>
                <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: '#c9a84c' }}>
                  ₦{sel.service?.price.toLocaleString()}
                </div>
              </div>
              {[
                ['📅 Date', sel.date],
                ['🕐 Time', sel.time],
                ['👤 Name', sel.name],
                ['📞 Phone', sel.phone],
                ['📍 Address', sel.address],
                ['💳 Payment', sel.payment === 'card' ? 'Paystack Card' : sel.payment === 'transfer' ? 'Bank Transfer' : 'Cash on Arrival'],
              ].map(([k, v]) =>
                v ? (
                  <div key={String(k)} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 14 }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)' }}>{k}</span>
                    <span style={{ color: 'white', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ) : null,
              )}
              <div style={{ borderTop: '1px solid rgba(201,168,76,0.2)', marginTop: 16, paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Deposit Required (30%)</span>
                <span style={{ color: '#c9a84c', fontWeight: 700 }}>
                  ₦{Math.round((sel.service?.price ?? 0) * 0.3).toLocaleString()}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-outline" style={{ flex: 1, padding: '14px' }} onClick={() => setStep(3)}>
                ← Edit
              </button>
              <button className="btn-primary" style={{ flex: 2, padding: '14px', fontSize: 15 }} disabled={loading} onClick={handleSubmit}>
                <span>{loading ? <span className="anim-spin" style={{ display: 'inline-block' }}>◌</span> : '✦ Confirm & Pay Deposit'}</span>
              </button>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 16 }}>
              🔒 Secured by Paystack · SSL encrypted · 24hr re-clean guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const ServicesPage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div style={{ paddingTop: 100, background: 'white', minHeight: '100vh' }}>
    <div style={{ background: '#0a1628', padding: '64px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Our Services</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(36px,6vw,64px)', fontWeight: 900, color: 'white' }}>
          Every Service. <span className="gold-text">Perfected.</span>
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', marginTop: 16, maxWidth: 560, lineHeight: 1.7 }}>
          Six specialist cleaning and logistics services — each designed, staffed, and equipped for a specific Abuja need.
        </p>
      </div>
    </div>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px' }}>
      {SERVICES.map((s, i) => (
        <div
          key={s.id}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 60,
            alignItems: 'center',
            marginBottom: 80,
            paddingBottom: 80,
            borderBottom: i < SERVICES.length - 1 ? '1px solid #f1f0ed' : 'none',
            direction: i % 2 === 0 ? 'ltr' : 'rtl',
          }}
        >
          <div
            style={{
              height: 360,
              borderRadius: 20,
              direction: 'ltr',
              background: `linear-gradient(135deg, ${s.color}20 0%, ${s.color}40 100%)`,
              border: `1px solid ${s.color}30`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}
          >
            <div style={{ fontSize: 72, color: s.color }}>{s.icon}</div>
            <div className="font-display" style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.name}</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#0a1628' }}>₦{s.price.toLocaleString()}</div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>{s.priceNote} · {s.duration}</div>
          </div>
          <div style={{ direction: 'ltr' }}>
            <span style={{ background: `${s.color}15`, color: s.color, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.tag}</span>
            <h2 className="font-display" style={{ fontSize: 36, fontWeight: 700, color: '#0a1628', margin: '16px 0 8px' }}>{s.name}</h2>
            <p style={{ fontSize: 16, color: '#9ca3af', fontStyle: 'italic', marginBottom: 16 }}>{s.short}</p>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
            <div style={{ marginBottom: 28 }}>
              {s.features.map((f, fi) => (
                <div key={fi} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#c9a84c', marginTop: 2, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 14, color: '#374151' }}>{f}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn-primary" style={{ padding: '13px 28px', fontSize: 15 }} onClick={() => setPage('booking')}>
                <span>Book This Service →</span>
              </button>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Hi, I'd like to enquire about ${encodeURIComponent(s.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '13px 20px',
                  borderRadius: 8,
                  background: 'rgba(37,211,102,0.1)',
                  border: '1px solid rgba(37,211,102,0.3)',
                  color: '#25D366',
                  fontSize: 14,
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                💬 WhatsApp Quote
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PricingPage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f8f6f1' }}>
    <div style={{ background: '#0a1628', padding: '64px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center' }}>Transparent Pricing</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: 'white' }}>
          No Hidden Fees. <span className="gold-text">Ever.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
          All prices include equipment, materials, and certified personnel. What you see is what you pay.
        </p>
      </div>
    </div>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 64 }}>
        {SERVICES.map((s, i) => (
          <div
            key={s.id}
            className="card-hover"
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 36,
              position: 'relative',
              overflow: 'hidden',
              border: i === 0 ? `2px solid #c9a84c` : '1px solid #f1f0ed',
            }}
          >
            {i === 0 && (
              <div style={{ position: 'absolute', top: 20, right: -28, background: 'linear-gradient(135deg, #c9a84c, #a8882c)', color: '#0a1628', fontSize: 10, fontWeight: 800, padding: '4px 36px', transform: 'rotate(45deg)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Popular
              </div>
            )}
            <div style={{ fontSize: 32, color: s.color, marginBottom: 16 }}>{s.icon}</div>
            <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>{s.name}</h3>
            <p style={{ fontSize: 13, color: '#9ca3af', marginBottom: 20, lineHeight: 1.6 }}>{s.desc}</p>
            <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: '#c9a84c', marginBottom: 4 }}>
              ₦{s.price.toLocaleString()}
            </div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 24 }}>{s.priceNote} · {s.duration}</div>
            <div style={{ borderTop: '1px solid #f1f0ed', paddingTop: 20, marginBottom: 24 }}>
              {s.features.slice(0, 3).map((f, fi) => (
                <div key={fi} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#374151' }}>
                  <span style={{ color: '#c9a84c' }}>✓</span> {f}
                </div>
              ))}
              {s.features.length > 3 && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 8 }}>+{s.features.length - 3} more included</div>}
            </div>
            <button className="btn-primary" style={{ width: '100%', padding: '13px', fontSize: 14 }} onClick={() => setPage('booking')}>
              <span>Book Now →</span>
            </button>
          </div>
        ))}
      </div>

      <div style={{ background: '#0a1628', borderRadius: 24, padding: '52px 48px', textAlign: 'center' }}>
        <div className="font-display" style={{ fontSize: 32, fontWeight: 700, color: 'white', marginBottom: 12 }}>
          Need a <span className="gold-text">Custom Quote?</span>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, marginBottom: 28, maxWidth: 480, margin: '12px auto 24px' }}>
          Corporate contracts, recurring plans, and large-space cleans get custom pricing. Contact us for a free site assessment.
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }} onClick={() => setPage('contact')}>
            <span>Get a Free Quote →</span>
          </button>
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '14px 28px',
              borderRadius: 8,
              background: 'rgba(37,211,102,0.15)',
              border: '1px solid rgba(37,211,102,0.4)',
              color: '#25D366',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  </div>
);

const AboutPage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div style={{ paddingTop: 100, minHeight: '100vh', background: 'white' }}>
    <div style={{ background: '#0a1628', padding: '80px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
        <div>
          <div className="section-label" style={{ marginBottom: 20 }}>Our Story</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(36px,5vw,60px)', fontWeight: 700, color: 'white', lineHeight: 1.1, marginBottom: 24 }}>
            Built for Abuja.<br />
            <span className="gold-text">Trusted by Thousands.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 16 }}>
            SwiftPack Pro was founded in 2022 with a simple belief: that Abuja's growing, fast-paced community deserved a cleaning and logistics partner that actually showed up on time, did the work properly, and stood behind it.
          </p>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32 }}>
            We started with a single team and three services. Today we operate across all of Abuja FCT with 40+ trained professionals, serving homes, offices, developers, Airbnb operators, and corporate clients.
          </p>
          <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 15 }} onClick={() => setPage('booking')}>
            <span>Work With Us →</span>
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ background: i === 0 ? 'rgba(201,168,76,0.15)' : 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? 'rgba(201,168,76,0.4)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 16, padding: 28, textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
              <div className="font-display" style={{ fontSize: 30, fontWeight: 700, color: '#c9a84c' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 6, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px' }}>
      <div style={{ textAlign: 'center', marginBottom: 60 }}>
        <h2 className="font-display" style={{ fontSize: 40, fontWeight: 700, color: '#0a1628' }}>Why Choose <span style={{ color: '#c9a84c' }}>SwiftPack Pro</span></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
        {[
          { icon: '🛡', title: 'Fully Insured', desc: 'Every team member is covered. Your property is always protected.' },
          { icon: '✅', title: 'Background Verified', desc: 'All staff go through rigorous screening before joining our team.' },
          { icon: '⏱', title: 'Always On Time', desc: 'We show up when promised — or we apply a discount. Simple.' },
          { icon: '🔄', title: '24hr Re-Clean Guarantee', desc: 'Not 100% satisfied? We return within 24 hours, no charge.' },
          { icon: '🧪', title: 'Eco-Friendly Products', desc: 'Safe for your children, pets, and the environment.' },
          { icon: '📱', title: 'Real-Time Updates', desc: 'Track your team, receive updates, and manage bookings digitally.' },
        ].map((v, i) => (
          <div key={i} className="card-hover" style={{ background: '#f8f6f1', borderRadius: 16, padding: 28, textAlign: 'center' }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{v.icon}</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0a1628', marginBottom: 10 }}>{v.title}</h3>
            <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.7 }}>{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: '#0a1628' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center' }}>Get in Touch</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: 'white' }}>
            Let's Talk About <span className="gold-text">Your Space</span>
          </h1>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 40, alignItems: 'start' }}>
          <div>
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 20, padding: 36, marginBottom: 20 }}>
              <h3 className="font-display" style={{ fontSize: 22, color: '#c9a84c', marginBottom: 24 }}>Contact Details</h3>
              {[
                { icon: '📞', label: 'Phone', val: BRAND.phone },
                { icon: '✉', label: 'Email', val: BRAND.email },
                { icon: '📍', label: 'Address', val: BRAND.address },
                { icon: '🕐', label: 'Hours', val: 'Mon–Sat: 7am–9pm\nSun: 9am–6pm' },
              ].map((c) => (
                <div key={c.label} style={{ display: 'flex', gap: 14, marginBottom: 22 }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 14, color: 'white', whiteSpace: 'pre-line' }}>{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.3)', borderRadius: 16, padding: '20px 24px', textDecoration: 'none' }}
            >
              <span style={{ fontSize: 28 }}>💬</span>
              <div>
                <div style={{ color: '#25D366', fontWeight: 700, fontSize: 15 }}>Chat on WhatsApp</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Fastest response — usually within 15 minutes</div>
              </div>
            </a>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: 20, padding: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>✦</div>
                <h3 className="font-display" style={{ fontSize: 26, color: '#c9a84c', marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>We'll get back to you within 2 hours during business hours.</p>
                <button className="btn-outline" style={{ marginTop: 24, padding: '11px 24px' }} onClick={() => setSent(false)}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ color: 'white', fontWeight: 600, fontSize: 18, marginBottom: 24 }}>Send a Message</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  {[{ k: 'name', l: 'Full Name', p: 'John Adeyemi' }, { k: 'phone', l: 'Phone', p: '08012345678' }].map((f) => (
                    <div key={f.k}>
                      <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>{f.l}</label>
                      <input className="input" placeholder={f.p} value={form[f.k as 'name' | 'phone']} onChange={(e) => setForm((current) => ({ ...current, [f.k]: e.target.value }))} />
                    </div>
                  ))}
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>Email</label>
                  <input className="input" type="email" placeholder="john@example.com" value={form.email} onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>Service Interest</label>
                  <select className="input" value={form.service} onChange={(e) => setForm((current) => ({ ...current, service: e.target.value }))}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    <option value="other">Other / Not Sure Yet</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>Message</label>
                  <textarea
                    className="input"
                    rows={4}
                    placeholder="Tell us about your space, requirements, or questions..."
                    value={form.message}
                    onChange={(e) => setForm((current) => ({ ...current, message: e.target.value }))}
                    style={{ resize: 'vertical' }}
                  />
                </div>
                <button className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: 16 }} onClick={handleSend} disabled={loading || !form.name || !form.message}>
                  <span>{loading ? 'Sending...' : 'Send Message →'}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [open, setOpen] = useState(0);

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: 'white' }}>
      <div style={{ background: '#0a1628', padding: '64px 28px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 16, justifyContent: 'center' }}>Support</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, color: 'white' }}>
            Frequently Asked <span className="gold-text">Questions</span>
          </h1>
        </div>
      </div>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 28px' }}>
        {FAQS.map((faq, i) => (
          <div key={i} style={{ borderBottom: '1px solid #f1f0ed', padding: '4px 0' }}>
            <button
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                width: '100%', background: 'none', border: 'none', padding: '22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', gap: 16,
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 600, color: '#0a1628', textAlign: 'left', lineHeight: 1.4 }}>{faq.q}</span>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                flexShrink: 0,
                background: open === i ? '#c9a84c' : '#f8f6f1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: open === i ? '#0a1628' : '#9ca3af',
                fontSize: 18,
                fontWeight: 300,
                transition: 'all 0.3s',
              }}>
                {open === i ? '−' : '+'}
              </div>
            </button>
            <div className="accordion-body" style={{ maxHeight: open === i ? 300 : 0, opacity: open === i ? 1 : 0 }}>
              <p style={{ paddingBottom: 24, fontSize: 15, color: '#6b7280', lineHeight: 1.8 }}>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ABUJA_LOCATIONS = [
  'Wuse', 'Maitama', 'Garki', 'Central Area', 'Asokoro', 
  'Gwarinpa', 'Kubwa', 'Dutse', 'Bwari', 'Kuje', 'Gwagwalada',
  'Abuja Airport Area', 'Nyanya', 'Karshi', 'Lugbe'
];

const JOB_OPENINGS = [
  {
    id: 1,
    title: 'Cleaning Staff (Residential)',
    locations: ['Wuse', 'Maitama', 'Garki', 'Asokoro'],
    salary: '₦80,000 - ₦120,000',
    type: 'Full-time',
    description: 'We are looking for motivated cleaning professionals to join our residential cleaning team. Work in your preferred Abuja location with flexible scheduling.',
    requirements: ['High school diploma or equivalent', 'Physical fitness', 'Attention to detail', 'Reliable transportation', 'Valid ID'],
    benefits: ['Competitive salary', 'Equipment provided', 'Health insurance', 'Uniform supplied', 'Weekly payments'],
  },
  {
    id: 2,
    title: 'Cleaning Supervisor',
    locations: ['Central Area', 'Gwarinpa', 'Kubwa'],
    salary: '₦150,000 - ₦220,000',
    type: 'Full-time',
    description: 'Lead and manage teams across multiple locations. Ensure quality standards, schedule staff, and handle client relations.',
    requirements: ['2+ years cleaning experience', 'Leadership skills', 'Problem-solving ability', 'Communication skills', 'Valid driver\'s license'],
    benefits: ['Higher salary', 'Performance bonus', 'Leadership training', 'Health insurance', 'Fuel allowance'],
  },
  {
    id: 3,
    title: 'Post-Construction Cleaner',
    locations: ['Dutse', 'Bwari', 'Central Area'],
    salary: '₦100,000 - ₦150,000',
    type: 'Full-time',
    description: 'Specialized heavy-duty cleaning for construction sites and renovations. Join our elite post-construction team.',
    requirements: ['Experience with construction debris', 'Safety certification preferred', 'Physical strength', 'Attention to detail', 'Problem-solving skills'],
    benefits: ['Premium salary', 'Safety equipment', 'Specialized training', 'Health insurance', 'Overtime pay'],
  },
  {
    id: 4,
    title: 'Office Cleaning Staff',
    locations: ['Wuse', 'Maitama', 'Ikoyi', 'Central Area'],
    salary: '₦85,000 - ₦130,000',
    type: 'Full-time',
    description: 'Professional office cleaning experience required. Work with corporate clients in premium locations with flexible evening shifts.',
    requirements: ['1+ years office cleaning', 'Professional demeanor', 'Time management', 'Attention to detail', 'Reliability'],
    benefits: ['Stable schedule', 'Uniform provided', 'Equipment supplied', 'Bonus potential', 'Career growth'],
  },
  {
    id: 5,
    title: 'Logistics & Courier Driver',
    locations: ['Nyanya', 'Karshi', 'Gwagwalada', 'Lugbe'],
    salary: '₦110,000 - ₦160,000',
    type: 'Full-time',
    description: 'Safe, reliable drivers needed for pack-out logistics and courier services across Abuja. Must handle deliveries professionally.',
    requirements: ['Valid commercial driver\'s license', 'Clean driving record', '3+ years experience', 'Vehicle maintenance knowledge', 'Customer service skills'],
    benefits: ['Competitive salary', 'Vehicle maintenance covered', 'Fuel provided', 'GPS equipment', 'Insurance coverage'],
  },
  {
    id: 6,
    title: 'Quality Control Inspector',
    locations: ['Gwarinpa', 'Wuse'],
    salary: '₦120,000 - ₦180,000',
    type: 'Full-time',
    description: 'Ensure all cleaning jobs meet SwiftPack Pro standards. Visit client locations and provide quality feedback to teams.',
    requirements: ['2+ years quality assurance', 'Attention to detail', 'Communication skills', 'Transport required', 'Valid ID'],
    benefits: ['Good salary', 'Allowance', 'Performance bonus', 'Training provided', 'Career development'],
  },
];

const JobsPage = ({ setPage }: { setPage: (page: string) => void }) => {
  const [selectedJob, setSelectedJob] = useState<typeof JOB_OPENINGS[0] | null>(null);
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', location: '', cv: '', coverLetter: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleApply = async () => {
    if (!appForm.name || !appForm.email || !appForm.phone || !appForm.location || !appForm.cv) {
      alert('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('swiftpack_access_token');
      const response = await fetch('/api/recruitment/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify({
          jobId: selectedJob?.id,
          preferredLocations: [appForm.location],
          cv: appForm.cv,
          coverLetter: appForm.coverLetter,
        }),
      });
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSelectedJob(null);
          setSubmitted(false);
          setAppForm({ name: '', email: '', phone: '', location: '', cv: '', coverLetter: '' });
        }, 3000);
      } else {
        alert('Application failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting application');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f8f6f1' }}>
      {/* Header */}
      <div style={{ background: '#0a1628', padding: '64px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Join Our Team</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Work Where You Are in <span style={{ color: '#c9a84c' }}>Abuja</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 600, lineHeight: 1.7 }}>
            SwiftPack Pro is hiring across all Abuja locations. Join our growing team of cleaning professionals, drivers, and operations staff. Competitive salaries, benefits, and growth opportunities.
          </p>
        </div>
      </div>

      {/* Jobs Grid */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px' }}>
        {!selectedJob ? (
          <>
            <div style={{ marginBottom: 60 }}>
              <h2 className="font-display" style={{ fontSize: 36, fontWeight: 700, color: '#0a1628', marginBottom: 16 }}>
                Open Positions
              </h2>
              <p style={{ fontSize: 16, color: '#6b7280' }}>Click any role to view details and apply</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
              {JOB_OPENINGS.map((job) => (
                <div
                  key={job.id}
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: 32,
                    border: '1px solid rgba(201,168,76,0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                  onClick={() => setSelectedJob(job)}
                >
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 8 }}>
                      {job.type}
                    </div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>{job.title}</h3>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#c9a84c', marginBottom: 12 }}>{job.salary}</div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>Locations:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {job.locations.map((loc) => (
                        <span key={loc} style={{ fontSize: 11, background: 'rgba(201,168,76,0.08)', color: '#c9a84c', padding: '4px 10px', borderRadius: 4, fontWeight: 500 }}>
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6, marginBottom: 20 }}>{job.description}</p>
                  <button className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                    <span>View & Apply →</span>
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Application Form */
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <button
              onClick={() => setSelectedJob(null)}
              style={{ background: 'none', border: 'none', color: '#c9a84c', cursor: 'pointer', fontSize: 14, marginBottom: 32, display: 'flex', alignItems: 'center', gap: 6 }}
            >
              ← Back to All Jobs
            </button>

            {submitted ? (
              <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, padding: 40, textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>Application Submitted!</h2>
                <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 24 }}>Thank you for your interest. Our HR team will review your application and contact you shortly.</p>
                <button className="btn-primary" onClick={() => setSelectedJob(null)}>
                  <span>Back to All Jobs</span>
                </button>
              </div>
            ) : (
              <>
                <div style={{ background: 'white', borderRadius: 16, padding: 40, border: '1px solid rgba(201,168,76,0.1)' }}>
                  <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>{selectedJob.title}</h2>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 32, fontSize: 14, color: '#6b7280', flexWrap: 'wrap' }}>
                    <span>💼 {selectedJob.type}</span>
                    <span>💰 {selectedJob.salary}</span>
                    <span>📍 {selectedJob.locations.join(', ')}</span>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 24, marginBottom: 32 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>About This Role</h3>
                    <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.8, marginBottom: 24 }}>{selectedJob.description}</p>

                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>Requirements</h3>
                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: 24 }}>
                      {selectedJob.requirements.map((req, i) => (
                        <li key={i} style={{ fontSize: 14, color: '#6b7280', paddingLeft: 24, marginBottom: 8, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#c9a84c' }}>✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>

                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>Benefits</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {selectedJob.benefits.map((ben, i) => (
                        <li key={i} style={{ fontSize: 14, color: '#6b7280', paddingLeft: 24, marginBottom: 8, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: '#c9a84c' }}>•</span>
                          {ben}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: 24 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0a1628', marginBottom: 24 }}>Apply Now</h3>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Full Name *</label>
                      <input type="text" placeholder="Your full name" value={appForm.name} onChange={(e) => setAppForm({ ...appForm, name: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }} />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Email *</label>
                        <input type="email" placeholder="your@email.com" value={appForm.email} onChange={(e) => setAppForm({ ...appForm, email: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Phone *</label>
                        <input type="tel" placeholder="070..." value={appForm.phone} onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Preferred Location *</label>
                      <select value={appForm.location} onChange={(e) => setAppForm({ ...appForm, location: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }}>
                        <option value="">Select a location...</option>
                        {selectedJob.locations.map((loc) => (
                          <option key={loc} value={loc}>{loc}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>CV / Resume Link *</label>
                      <input type="url" placeholder="https://..." value={appForm.cv} onChange={(e) => setAppForm({ ...appForm, cv: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }} />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Cover Letter (Optional)</label>
                      <textarea placeholder="Tell us why you're a great fit for this role..." value={appForm.coverLetter} onChange={(e) => setAppForm({ ...appForm, coverLetter: e.target.value })} style={{ width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit', minHeight: 120, resize: 'vertical' }} />
                    </div>

                    <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15 }} disabled={loading} onClick={handleApply}>
                      <span>{loading ? '⏳ Submitting...' : '✓ Submit Application'}</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const CompliancePage = () => {
  const [verifyCode, setVerifyCode] = useState('');
  const [certificate, setCertificate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!verifyCode.trim()) {
      setError('Please enter a verification code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/compliance/verify/${verifyCode}`);
      if (response.ok) {
        const data = await response.json();
        setCertificate(data.data);
      } else {
        setError('Certificate not found. Please check the code and try again.');
        setCertificate(null);
      }
    } catch (err) {
      setError('Error verifying certificate. Please try again.');
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f8f6f1' }}>
      {/* Header */}
      <div style={{ background: '#0a1628', padding: '64px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Quality Assurance</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: 'white', marginBottom: 16 }}>
            Verify Compliance <span style={{ color: '#c9a84c' }}>Certificates</span>
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', maxWidth: 600, lineHeight: 1.7 }}>
            All SwiftPack Pro staff are thoroughly background-checked and insured. Verify any team member's compliance certificate using their unique code.
          </p>
        </div>
      </div>

      {/* Verification Tool */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '80px 28px' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 40, border: '1px solid rgba(201,168,76,0.1)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          {!certificate ? (
            <>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0a1628', marginBottom: 12 }}>Verify Staff Certificate</h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 32 }}>
                Each SwiftPack Pro team member carries a unique verification code on their ID. Enter the code below to verify their compliance status, background check, and insurance coverage.
              </p>

              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: 8 }}>Verification Code</label>
                <input
                  type="text"
                  placeholder="e.g., SPP-2024-ABC123..."
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                  <p style={{ fontSize: 13, color: '#991b1b', fontWeight: 500 }}>{error}</p>
                </div>
              )}

              <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 15, marginBottom: 16 }} disabled={loading} onClick={handleVerify}>
                <span>{loading ? '⏳ Verifying...' : '🔍 Verify Certificate'}</span>
              </button>

              <p style={{ fontSize: 12, color: '#9ca3af', textAlign: 'center', marginTop: 24 }}>
                💡 Tip: The verification code is printed on the back of the team member's SwiftPack Pro ID badge.
              </p>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 32, color: '#22c55e' }}>✓</div>
                <div>
                  <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0a1628' }}>Certificate Verified</h2>
                  <p style={{ fontSize: 12, color: '#6b7280' }}>This staff member is verified and compliant</p>
                </div>
              </div>

              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Staff Information</h3>
                <div style={{ display: 'grid', gap: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>Staff ID</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0a1628' }}>{certificate?.id || 'N/A'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>Certificate Status</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#22c55e' }}>{certificate?.status || 'VERIFIED'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>Issue Date</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0a1628' }}>{certificate?.issuedDate ? new Date(certificate.issuedDate).toLocaleDateString() : new Date().toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: '#6b7280' }}>Expiry Date</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0a1628' }}>{certificate?.expiryDate ? new Date(certificate.expiryDate).toLocaleDateString() : 'Active'}</span>
                  </div>
                </div>
              </div>

              <div style={{ background: 'rgba(34,197,94,0.08)', borderRadius: 8, padding: 16, marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: '#166534', fontWeight: 500, lineHeight: 1.6 }}>
                  ✓ Background check completed · ✓ Insurance coverage active · ✓ Safety trained · ✓ Fully vetted
                </p>
              </div>

              <button className="btn-outline" style={{ width: '100%', padding: '12px', fontSize: 14, borderColor: '#0a1628', color: '#0a1628' }} onClick={() => { setCertificate(null); setVerifyCode(''); }}>
                ← Verify Another Certificate
              </button>
            </>
          )}
        </div>

        {/* Info Section */}
        <div style={{ marginTop: 60 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0a1628', marginBottom: 32, textAlign: 'center' }}>Why We Prioritize Compliance</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {[
              { icon: '🛡', title: 'Full Insurance', desc: 'Every staff member is fully insured for property damage and liability.' },
              { icon: '✓', title: 'Background Checked', desc: 'Rigorous vetting process ensures only trustworthy professionals.' },
              { icon: '📋', title: 'Certified', desc: 'All staff hold current safety and cleaning certifications.' },
              { icon: '🔐', title: 'Transparent', desc: 'Easy verification of any team member\'s credentials anytime.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{item.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => (
  <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f8f6f1' }}>
    <div style={{ background: '#0a1628', padding: '64px 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Insights & Tips</div>
        <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,56px)', fontWeight: 700, color: 'white' }}>
          The SwiftPack <span className="gold-text">Blog</span>
        </h1>
      </div>
    </div>
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
        {BLOG_POSTS.map((post) => (
          <div key={post.id} className="card-hover" style={{ background: 'white', borderRadius: 20, overflow: 'hidden', cursor: 'pointer' }}>
            <div
              style={{
                height: 220,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 64,
                background: `linear-gradient(135deg, #0a1628 0%, ${['#1e40af', '#0f766e', '#7c3aed'][post.id - 1]} 100%)`,
              }}
            >
              {['🏢', '🏠', '🏗'][post.id - 1]}
            </div>
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, alignItems: 'center' }}>
                <span style={{ background: '#f8f6f1', color: '#6b7280', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {post.category}
                </span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>·</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>{post.readTime} read</span>
              </div>
              <h2 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: '#0a1628', lineHeight: 1.4, marginBottom: 12 }}>{post.title}</h2>
              <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.7, marginBottom: 20 }}>{post.excerpt}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#9ca3af' }}>{post.date}</span>
                <span style={{ color: '#c9a84c', fontSize: 13, fontWeight: 600 }}>Read More →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const LoginPage = ({ setPage }: { setPage: (page: string) => void }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setLoading(false);
    if (email.includes('admin')) setPage('admin');
    else setPage('portal');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a1628', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px', paddingTop: 100 }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <Logo size={52} />
          <h1 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: 'white', marginTop: 16, marginBottom: 6 }}>
            Welcome Back
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Sign in to your SwiftPack Pro account</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 20, padding: 36 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>Email</label>
            <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Password</label>
              <span style={{ fontSize: 12, color: '#c9a84c', cursor: 'pointer' }}>Forgot?</span>
            </div>
            <input className="input" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
          </div>
          <button className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: 16 }} onClick={handleLogin} disabled={loading || !email || !pass}>
            <span>{loading ? 'Signing in...' : 'Sign In →'}</span>
          </button>
          <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Don't have an account? </span>
            <span style={{ fontSize: 13, color: '#c9a84c', cursor: 'pointer' }} onClick={() => setPage('booking')}>Book a Service</span>
          </div>
          <div style={{ background: 'rgba(201,168,76,0.06)', borderRadius: 10, padding: 14, marginTop: 20 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>DEMO — Admin Access</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>admin@swiftpackpro.com / any password</div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <span style={{ fontSize: 12, color: '#c9a84c', cursor: 'pointer' }} onClick={() => setPage('home')}>
            ← Back to website
          </span>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ setPage }: { setPage: (page: string) => void }) => {
  const [section, setSection] = useState('overview');
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: "Hello! I'm your SwiftPack Pro AI assistant. I can help with bookings, insights, content generation, and business analytics. What do you need?" },
  ]);
  const [aiLoading, setAiLoading] = useState(false);

  const bookings = [
    { ref: 'SWP-74821', client: 'Emeka Okafor', service: 'Deep Clean+', date: 'May 25, 2026', time: '10:00', status: 'Confirmed', amount: '₦35,000', address: 'Maitama, Abuja' },
    { ref: 'SWP-74822', client: 'Fatima Hassan', service: 'Post-Construction+', date: 'May 26, 2026', time: '08:00', status: 'Pending', amount: '₦65,000', address: 'Gwarinpa, Abuja' },
    { ref: 'SWP-74823', client: 'Chidi Nwosu', service: 'Office Cleaning+', date: 'May 25, 2026', time: '14:00', status: 'In Progress', amount: '₦28,000', address: 'Wuse 2, Abuja' },
    { ref: 'SWP-74824', client: 'Amaka Eze', service: 'Airbnb Turnover+', date: 'May 24, 2026', time: '09:00', status: 'Completed', amount: '₦18,000', address: 'Jabi, Abuja' },
  ];

  const statusColor = (s: string) => ({ Confirmed: '#3b82f6', Pending: '#f59e0b', 'In Progress': '#8b5cf6', Completed: '#22c55e' }[s] || '#9ca3af');

  const sideNav = [
    { id: 'overview', icon: '◈', label: 'Dashboard' },
    { id: 'bookings', icon: '📋', label: 'Bookings' },
    { id: 'customers', icon: '👤', label: 'Customers' },
    { id: 'services', icon: '⚙', label: 'Services' },
    { id: 'analytics', icon: '📊', label: 'Analytics' },
    { id: 'ai', icon: '✦', label: 'AI Center' },
    { id: 'billing', icon: '💳', label: 'Billing' },
    { id: 'blog', icon: '✍', label: 'Blog CMS' },
    { id: 'settings', icon: '🔧', label: 'Settings' },
  ];

  const sendAI = async () => {
    if (!aiInput.trim()) return;
    const msg = aiInput;
    setAiInput('');
    setAiChat((current) => [...current, { role: 'user', text: msg }]);
    setAiLoading(true);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: "You are SwiftPack Pro's AI business assistant. The company is a premium cleaning and courier service in Abuja, Nigeria. Services: Deep Clean+ (₦35k), Post-Construction+ (₦65k), Pack-Out Logistics+ (₦45k), Office Cleaning+ (₦28k), Airbnb Turnover+ (₦18k), Commercial Sanitisation+ (₦55k). Be concise, professional, and actionable. Phone: 07044 933 807.",
          messages: [{ role: 'user', content: msg }],
        }),
      });
      const data = await res.json();
      setAiChat((current) => [...current, { role: 'ai', text: data?.content?.[0]?.text || 'Unable to respond right now.' }]);
    } catch {
      setAiChat((current) => [...current, { role: 'ai', text: 'AI is temporarily unavailable. Please try again.' }]);
    }

    setAiLoading(false);
  };

  const barData = [58, 73, 45, 88, 65, 92, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f6f1', paddingTop: 68 }}>
      <div style={{ width: 220, background: '#0a1628', padding: '24px 12px', position: 'fixed', top: 68, bottom: 0, overflowY: 'auto', zIndex: 100, borderRight: '1px solid rgba(201,168,76,0.1)' }}>
        <div style={{ padding: '4px 8px 20px', marginBottom: 12, borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Admin Panel</div>
          <div style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600, marginTop: 4 }}>Super Admin</div>
        </div>
        {sideNav.map((item) => (
          <div
            key={item.id}
            onClick={() => setSection(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '11px 12px',
              borderRadius: 8,
              marginBottom: 2,
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: section === item.id ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: `1px solid ${section === item.id ? 'rgba(201,168,76,0.25)' : 'transparent'}`,
              color: section === item.id ? '#c9a84c' : 'rgba(255,255,255,0.5)',
              fontSize: 13,
              fontWeight: section === item.id ? 600 : 400,
            }}
          >
            <span>{item.icon}</span> {item.label}
          </div>
        ))}
        <div style={{ marginTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
          <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            🌐 View Site
          </div>
          <div onClick={() => setPage('home')} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            🔒 Logout
          </div>
        </div>
      </div>

      <div style={{ marginLeft: 220, flex: 1, padding: '32px 36px', minWidth: 0 }}>
        {section === 'overview' && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 className="font-display" style={{ fontSize: 30, fontWeight: 700, color: '#0a1628' }}>
                Dashboard <span style={{ color: '#c9a84c' }}>Overview</span>
              </h1>
              <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Monday, May 25, 2026 · Abuja, Nigeria</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { label: 'Monthly Revenue', value: '₦2.4M', change: '+18%', icon: '💰', color: '#22c55e' },
                { label: 'Active Bookings', value: '34', change: '+7 today', icon: '📋', color: '#3b82f6' },
                { label: 'Team On Duty', value: '12', change: '3 en route', icon: '👥', color: '#8b5cf6' },
                { label: 'Avg. Rating', value: '4.9★', change: '98% positive', icon: '⭐', color: '#c9a84c' },
              ].map((m) => (
                <div key={m.label} className="admin-card" style={{ padding: 22, borderLeft: `4px solid ${m.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    <span style={{ fontSize: 11, color: m.color, background: `${m.color}18`, padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>{m.change}</span>
                  </div>
                  <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628', marginBottom: 4 }}>{m.value}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 20 }}>
              <div className="admin-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0a1628', marginBottom: 6 }}>Weekly Revenue</div>
                <div className="font-display" style={{ fontSize: 24, color: '#c9a84c', fontWeight: 700, marginBottom: 20 }}>₦580,000</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 100 }}>
                  {barData.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{ width: '100%', background: 'linear-gradient(180deg, #c9a84c, #a8882c)', borderRadius: '4px 4px 0 0', height: `${v}px`, transition: 'height 1s ease' }} />
                      <div style={{ fontSize: 9, color: '#9ca3af' }}>{days[i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f0ed', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: 600, color: '#0a1628' }}>Recent Bookings</div>
                  <button className="btn-primary" style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => setSection('bookings')}>
                    <span>View All</span>
                  </button>
                </div>
                <table className="admin-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 4).map((b) => (
                      <tr key={b.ref}>
                        <td style={{ fontWeight: 500, color: '#111827' }}>{b.client}</td>
                        <td style={{ color: '#6b7280', fontSize: 12 }}>{b.service}</td>
                        <td>
                          <span style={{ background: `${statusColor(b.status)}18`, color: statusColor(b.status), padding: '3px 8px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                        </td>
                        <td style={{ color: '#c9a84c', fontWeight: 700 }}>{b.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {section === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
              <div>
                <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628' }}>
                  Booking <span style={{ color: '#c9a84c' }}>Management</span>
                </h2>
                <div style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>34 bookings · 12 today</div>
              </div>
              <button className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
                <span>+ New Booking</span>
              </button>
            </div>
            <div className="admin-card" style={{ overflow: 'hidden' }}>
              <table className="admin-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Client</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.ref}>
                      <td style={{ fontFamily: 'monospace', color: '#c9a84c', fontSize: 12 }}>{b.ref}</td>
                      <td style={{ fontWeight: 500, color: '#111827' }}>{b.client}</td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>{b.service}</td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>{b.date}</td>
                      <td style={{ color: '#6b7280', fontSize: 12 }}>{b.time}</td>
                      <td>
                        <span style={{ background: `${statusColor(b.status)}18`, color: statusColor(b.status), padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600 }}>{b.status}</span>
                      </td>
                      <td style={{ color: '#c9a84c', fontWeight: 700 }}>{b.amount}</td>
                      <td>
                        <button style={{ background: 'none', border: '1px solid #e5e7eb', padding: '4px 12px', borderRadius: 6, fontSize: 11, cursor: 'pointer', color: '#6b7280' }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {section === 'analytics' && (
          <div>
            <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628', marginBottom: 24 }}>
              Business <span style={{ color: '#c9a84c' }}>Analytics</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[
                { l: 'Monthly Revenue', v: '₦2.4M', t: '+18%' },
                { l: 'New Customers', v: '48', t: '+12%' },
                { l: 'Repeat Bookings', v: '67%', t: '+5%' },
                { l: 'Avg Job Value', v: '₦43,200', t: '+8%' },
              ].map((m) => (
                <div key={m.l} className="admin-card" style={{ padding: 22 }}>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{m.l}</div>
                  <div className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628', marginBottom: 4 }}>{m.v}</div>
                  <div style={{ fontSize: 12, color: '#22c55e' }}>{m.t} vs last month</div>
                </div>
              ))}
            </div>
            <div className="admin-card" style={{ padding: 24 }}>
              <div style={{ fontWeight: 600, color: '#0a1628', marginBottom: 20 }}>Service Distribution</div>
              {SERVICES.map((s, i) => (
                <div key={s.id} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#374151' }}>{s.name}</span>
                    <span style={{ fontSize: 13, color: '#c9a84c', fontWeight: 600 }}>{[42, 28, 14, 10, 4, 2][i]}%</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f0ed', borderRadius: 3 }}>
                    <div style={{ width: `${[42, 28, 14, 10, 4, 2][i]}%`, height: '100%', background: 'linear-gradient(90deg, #c9a84c, #e4c97a)', borderRadius: 3, transition: 'width 1s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section === 'ai' && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628' }}>
                AI <span style={{ color: '#c9a84c' }}>Business Center</span>
              </h2>
              <p style={{ fontSize: 13, color: '#9ca3af', marginTop: 4 }}>Powered by Claude AI · Content generation, analytics, customer support</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[
                { name: 'Customer Support Bot', status: 'Active', stat: '234 queries handled today' },
                { name: 'Booking Optimizer', status: 'Active', stat: 'Scheduled 12 jobs optimally' },
                { name: 'Content Generator', status: 'Active', stat: '5 posts drafted this week' },
                { name: 'Revenue Forecaster', status: 'Active', stat: 'Next month: ₦2.8M predicted' },
              ].map((a) => (
                <div key={a.name} className="admin-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#0a1628' }}>{a.name}</div>
                    <span style={{ fontSize: 11, color: '#22c55e', background: '#22c55e18', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>● {a.status}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{a.stat}</div>
                </div>
              ))}
            </div>
            <div className="admin-card" style={{ overflow: 'hidden' }}>
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f0ed', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontWeight: 600, fontSize: 14, color: '#0a1628' }}>SwiftPack AI Assistant</span>
                <span style={{ fontSize: 11, color: '#9ca3af', marginLeft: 'auto' }}>Powered by Claude</span>
              </div>
              <div style={{ height: 300, overflowY: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {aiChat.map((m, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                    <div
                      style={{
                        maxWidth: '78%',
                        padding: '12px 16px',
                        borderRadius: m.role === 'ai' ? '16px 16px 16px 4px' : '16px 16px 4px 16px',
                        background: m.role === 'ai' ? '#f8f6f1' : '#0a1628',
                        color: m.role === 'ai' ? '#374151' : 'white',
                        fontSize: 14,
                        lineHeight: 1.6,
                        border: m.role === 'ai' ? '1px solid #f1f0ed' : '1px solid rgba(201,168,76,0.2)',
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div style={{ display: 'flex' }}>
                    <div style={{ background: '#f8f6f1', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: 6, alignItems: 'center', border: '1px solid #f1f0ed' }}>
                      {[0, 1, 2].map((dot) => (
                        <div key={dot} style={{ width: 6, height: 6, borderRadius: '50%', background: '#c9a84c', animation: `float 1s ease-in-out ${dot * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ padding: '14px 20px', borderTop: '1px solid #f1f0ed', display: 'flex', gap: 10 }}>
                <input
                  className="input-light"
                  style={{ flex: 1 }}
                  placeholder="Ask about bookings, generate content, get insights..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendAI()}
                />
                <button className="btn-primary" style={{ padding: '12px 20px', flexShrink: 0 }} onClick={sendAI}>
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {(section === 'customers' || section === 'services' || section === 'billing' || section === 'blog' || section === 'settings') && (
          <div>
            <h2 className="font-display" style={{ fontSize: 26, fontWeight: 700, color: '#0a1628', marginBottom: 24 }}>
              {section.charAt(0).toUpperCase() + section.slice(1)} <span style={{ color: '#c9a84c' }}>Management</span>
            </h2>
            <div className="admin-card" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔧</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#0a1628', marginBottom: 8 }}>
                {section.charAt(0).toUpperCase() + section.slice(1)} Module
              </div>
              <p style={{ color: '#9ca3af', fontSize: 14 }}>This module is included in the full Next.js source files. Connect your backend API to activate full CRUD functionality.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CustomerPortal = ({ setPage }: { setPage: (page: string) => void }) => (
  <div style={{ paddingTop: 100, minHeight: '100vh', background: '#f8f6f1' }}>
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 28px' }}>
      <h1 className="font-display" style={{ fontSize: 32, fontWeight: 700, color: '#0a1628', marginBottom: 8 }}>
        My <span style={{ color: '#c9a84c' }}>Account</span>
      </h1>
      <p style={{ color: '#9ca3af', marginBottom: 32 }}>Manage your bookings and account details.</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        {[{ label: 'Active Bookings', value: '3' }, { label: 'Services Used', value: '12' }].map((m) => (
          <div key={m.label} className="admin-card" style={{ padding: 24 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 8 }}>{m.label}</div>
            <div className="font-display" style={{ fontSize: 36, fontWeight: 700, color: '#c9a84c' }}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f0ed', fontWeight: 600, color: '#0a1628' }}>My Bookings</div>
        <table className="admin-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {[
              { s: 'Deep Clean+', d: 'May 25, 2026', st: 'Confirmed', a: '₦35,000' },
              { s: 'Office Cleaning+', d: 'May 18, 2026', st: 'Completed', a: '₦28,000' },
              { s: 'Airbnb Turnover+', d: 'May 10, 2026', st: 'Completed', a: '₦18,000' },
            ].map((b, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500, color: '#111827' }}>{b.s}</td>
                <td style={{ color: '#6b7280' }}>{b.d}</td>
                <td>
                  <span style={{ color: b.st === 'Completed' ? '#22c55e' : '#3b82f6', fontWeight: 600, fontSize: 12 }}>● {b.st}</span>
                </td>
                <td style={{ color: '#c9a84c', fontWeight: 700 }}>{b.a}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        <button className="btn-primary" style={{ padding: '12px 24px', fontSize: 14 }} onClick={() => setPage('booking')}>
          <span>Book New Service</span>
        </button>
        <button className="btn-outline" style={{ padding: '12px 20px', fontSize: 14, borderColor: '#d1d5db', color: '#6b7280' }} onClick={() => setPage('home')}>
          ← Back to Home
        </button>
      </div>
    </div>
  </div>
);

const Footer = ({ setPage }: { setPage: (page: string) => void }) => {
  const year = new Date().getFullYear();
  const columns = [
    { title: 'Services', links: SERVICES.map((s) => ({ label: s.name, page: 'services' })) },
    { title: 'Company', links: [
      { label: 'About Us', page: 'about' },
      { label: 'Blog', page: 'blog' },
      { label: 'FAQ', page: 'faq' },
      { label: 'Contact', page: 'contact' },
    ] },
    { title: 'Compliance', links: [
      { label: 'Verify Certificate', page: 'compliance' },
      { label: 'Privacy Policy', page: 'home' },
      { label: 'Terms of Service', page: 'home' },
    ] },
  ];

  return (
    <footer style={{ background: '#0a1628', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 20 }}>
              <Logo size={38} />
              <div>
                <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, fontWeight: 700, color: 'white' }}>
                  SwiftPack <span style={{ color: '#c9a84c' }}>Pro</span>
                </div>
                <div style={{ fontSize: 9, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                  Cleaning & Courier
                </div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Abuja's premier cleaning and pack-out logistics service. Trusted by homeowners, Airbnb hosts, offices, and developers.
            </p>
            {[
              { i: '✉', t: BRAND.email },
              { i: '📞', t: BRAND.phone },
              { i: '📍', t: BRAND.address },
            ].map((c) => (
              <div key={c.t} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 10 }}>
                <span style={{ color: '#c9a84c' }}>{c.i}</span>{c.t}
              </div>
            ))}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: 16 }}>{col.title}</div>
              {col.links.map((link) => (
                <div
                  key={`${col.title}-${link.label}`}
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 10, cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'; }}
                  onClick={() => setPage(link.page)}
                >
                  {link.label}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© {year} SwiftPack Pro. All rights reserved. Est. 2022 · Abuja, Nigeria.</div>
          <div style={{ fontSize: 12, letterSpacing: '0.2em', color: '#c9a84c', textTransform: 'uppercase' }}>Swift. Precise. Impeccable.</div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppFAB = () => (
  <a href={`https://wa.me/${BRAND.whatsapp}?text=Hi SwiftPack Pro, I'd like to enquire about your services.`} target="_blank" rel="noopener noreferrer">
    <button className="whatsapp-fab" aria-label="Chat on WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </button>
  </a>
);

export default function Page() {
  const [page, setPage] = useState('home');
  const [dark, setDark] = useDark();
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const noFooter = page === 'admin';

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={setPage} />;
      case 'services':
        return <ServicesPage setPage={setPage} />;
      case 'pricing':
        return <PricingPage setPage={setPage} />;
      case 'booking':
        return <BookingPage />;
      case 'about':
        return <AboutPage setPage={setPage} />;
      case 'contact':
        return <ContactPage />;
      case 'blog':
        return <BlogPage />;
      case 'faq':
        return <FAQPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'login':
        return <LoginPage setPage={setPage} />;
      case 'admin':
        return <AdminDashboard setPage={setPage} />;
      case 'portal':
        return <CustomerPortal setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <Styles />
      <Navbar page={page} setPage={setPage} dark={dark} setDark={setDark} />
      <main key={page} className="anim-fadeIn">{renderPage()}</main>
      {!noFooter && <Footer setPage={setPage} />}
      <WhatsAppFAB />
      {toast && (
        <div className="toast">
          <div style={{ fontWeight: 600, fontSize: 14, color: toast.type === 'success' ? '#22c55e' : '#ef4444', marginBottom: 4 }}>
            {toast.type === 'success' ? '✓ Success' : '✕ Error'}
          </div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>{toast.msg}</div>
        </div>
      )}
    </>
  );
}
