// app/lib/constants/locations.ts

export const ABUJA_LOCATIONS = [
  { code: 'KUBWA', name: 'Kubwa', coordinates: { lat: 9.0854, lng: 7.3169 } },
  { code: 'LUGBE', name: 'Lugbe', coordinates: { lat: 8.9653, lng: 7.4267 } },
  { code: 'WUSE', name: 'Wuse', coordinates: { lat: 9.0765, lng: 7.3986 } },
  { code: 'MAITAMA', name: 'Maitama', coordinates: { lat: 9.0924, lng: 7.4436 } },
  { code: 'APO', name: 'Apo', coordinates: { lat: 8.9974, lng: 7.4105 } },
  { code: 'KARASANA', name: 'Karasana', coordinates: { lat: 9.0531, lng: 7.2947 } },
  { code: 'GWARINPA', name: 'Gwarinpa', coordinates: { lat: 9.1142, lng: 7.2583 } },
  { code: 'DUTSE', name: 'Dutse', coordinates: { lat: 9.1234, lng: 7.3845 } },
  { code: 'ASOKORO', name: 'Asokoro', coordinates: { lat: 9.1087, lng: 7.4567 } },
  { code: 'NYANYA', name: 'Nyanya', coordinates: { lat: 8.9342, lng: 7.3562 } },
  { code: 'ZUBA', name: 'Zuba', coordinates: { lat: 9.1654, lng: 7.3421 } },
  { code: 'AIRPORT_ROAD', name: 'Airport Road', coordinates: { lat: 9.0234, lng: 7.2876 } },
  { code: 'LOKOGOMA', name: 'Lokogoma', coordinates: { lat: 9.0876, lng: 7.4234 } },
  { code: 'JABI', name: 'Jabi', coordinates: { lat: 9.0654, lng: 7.5123 } },
  { code: 'JAHI', name: 'Jahi', coordinates: { lat: 9.0432, lng: 7.4876 } },
  { code: 'GARKI', name: 'Garki', coordinates: { lat: 9.0543, lng: 7.4321 } },
  { code: 'UTAKO', name: 'Utako', coordinates: { lat: 9.0762, lng: 7.3654 } },
  { code: 'GAMES_VILLAGE', name: 'Games Village', coordinates: { lat: 9.0234, lng: 7.3892 } },
];

export const LOCATION_MAP = new Map(
  ABUJA_LOCATIONS.map((loc) => [loc.code, loc.name])
);

export const SERVICES = [
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    icon: '🧹',
    description: 'Professional deep cleaning for homes and offices',
    minPrice: 50000,
    maxPrice: 150000,
  },
  {
    id: 'move-in-out',
    name: 'Move In/Out Cleaning',
    icon: '📦',
    description: 'Complete cleaning for moving scenarios',
    minPrice: 80000,
    maxPrice: 200000,
  },
  {
    id: 'logistics',
    name: 'Logistics & Packing',
    icon: '🚚',
    description: 'Professional packing and logistics services',
    minPrice: 100000,
    maxPrice: 300000,
  },
  {
    id: 'commercial',
    name: 'Commercial Cleaning',
    icon: '🏢',
    description: 'Cleaning services for commercial spaces',
    minPrice: 150000,
    maxPrice: 500000,
  },
  {
    id: 'residential',
    name: 'Residential Cleaning',
    icon: '🏠',
    description: 'Regular cleaning for residential properties',
    minPrice: 30000,
    maxPrice: 100000,
  },
];

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  EMPLOYEE: 'EMPLOYEE',
  APPLICANT: 'APPLICANT',
  CUSTOMER: 'CUSTOMER',
  STAFF: 'STAFF',
} as const;

export const EMPLOYMENT_TYPES = {
  FREELANCE: 'FREELANCE',
  PERMANENT: 'PERMANENT',
  CONTRACT: 'CONTRACT',
} as const;

export const BOOKING_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export const APPLICATION_STATUSES = {
  SUBMITTED: 'SUBMITTED',
  UNDER_REVIEW: 'UNDER_REVIEW',
  AI_SCREENING: 'AI_SCREENING',
  SHORTLISTED: 'SHORTLISTED',
  INTERVIEW_SCHEDULED: 'INTERVIEW_SCHEDULED',
  INTERVIEW_COMPLETED: 'INTERVIEW_COMPLETED',
  OFFER_MADE: 'OFFER_MADE',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  WITHDRAWN: 'WITHDRAWN',
} as const;

export const CERTIFICATE_TYPES = {
  CAC_REGISTRATION: 'CAC_REGISTRATION',
  FCT_BUSINESS_PERMIT: 'FCT_BUSINESS_PERMIT',
  ENVIRONMENTAL_HEALTH: 'ENVIRONMENTAL_HEALTH',
  TAX_IDENTIFICATION: 'TAX_IDENTIFICATION',
  ABUJA_MUNICIPAL_LICENSE: 'ABUJA_MUNICIPAL_LICENSE',
  VEHICLE_ROADWORTHINESS: 'VEHICLE_ROADWORTHINESS',
} as const;

export const CURRENCY = {
  CODE: 'NGN',
  SYMBOL: '₦',
  NAME: 'Nigerian Naira',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  RECRUITMENT: {
    JOBS: '/api/recruitment/jobs',
    APPLICATIONS: '/api/recruitment/applications',
  },
  OPERATIONS: {
    BOOKINGS: '/api/operations/bookings',
    SERVICES: '/api/operations/services',
  },
  COMPLIANCE: {
    CERTIFICATES: '/api/compliance/certificates',
    VERIFY: '/api/compliance/verify',
  },
  ACCOUNTING: {
    INVOICES: '/api/accounting/invoices',
  },
} as const;
