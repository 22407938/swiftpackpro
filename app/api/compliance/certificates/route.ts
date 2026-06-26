// app/api/compliance/certificates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { CertificateStatus, CertificateType } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/utils/response';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/compliance/certificates
 * Get all compliance certificates (paginated)
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Missing authorization token');
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      throw new AuthenticationError('Admin access required');
    }

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const status = searchParams.get('status') as CertificateStatus | null;

    const where = status ? { status } : {};

    const [certificates, total] = await Promise.all([
      prisma.complianceCertificate.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.complianceCertificate.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(certificates, total, page, limit));
  } catch (error) {
    console.error('Get certificates error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_CERTIFICATES_ERROR', 'Failed to get certificates'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/compliance/certificates
 * Create new compliance certificate
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Missing authorization token');
    }

    const payload = verifyToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      throw new AuthenticationError('Admin access required');
    }

    const {
      type,
      certificateNumber,
      issuedDate,
      expiryDate,
      issuerName,
      certificateDocument,
    } = await req.json();

    // Validate input
    if (!type) throw new ValidationError('Certificate type is required');
    if (!certificateNumber?.trim())
      throw new ValidationError('Certificate number is required');
    if (!issuedDate) throw new ValidationError('Issued date is required');
    if (!expiryDate) throw new ValidationError('Expiry date is required');
    if (!issuerName?.trim()) throw new ValidationError('Issuer name is required');
    if (!certificateDocument?.trim()) throw new ValidationError('Certificate document URL is required');

    // Generate QR code and verification code
    const qrCode = uuidv4();
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-certificate/${qrCode}`;

    // Create certificate
    const certificate = await prisma.complianceCertificate.create({
      data: {
        type: type as CertificateType,
        certificateNumber,
        issuedDate: new Date(issuedDate),
        expiryDate: new Date(expiryDate),
        issuerName,
        certificateDocument,
        qrVerificationCode: qrCode,
        verificationUrl,
      },
    });

    return NextResponse.json(successResponse(certificate), { status: 201 });
  } catch (error) {
    console.error('Create certificate error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_CERTIFICATE_ERROR', 'Failed to create certificate'),
      { status: 500 }
    );
  }
}
