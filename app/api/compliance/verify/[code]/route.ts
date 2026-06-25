// app/api/compliance/verify/[code]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { NotFoundError, isAppError } from '@/lib/utils/errors';
import { successResponse, errorResponse } from '@/lib/utils/response';

/**
 * GET /api/compliance/verify/[code]
 * Verify a certificate by QR code
 */
export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params;

    if (!code) throw new NotFoundError('Verification code is required');

    // Find certificate by QR code
    const certificate = await prisma.complianceCertificate.findUnique({
      where: { qrVerificationCode: code },
    });

    if (!certificate) {
      throw new NotFoundError('Certificate not found');
    }

    // Check if certificate is expired
    const isExpired = new Date() > certificate.expiryDate;
    const isVerified = certificate.status === 'VERIFIED';

    // Create verification record
    await prisma.verificationRecord.create({
      data: {
        certificateId: certificate.id,
        verificationToken: code,
        verifierIp: req.headers.get('x-forwarded-for') || 'unknown',
        verifierLocation: req.headers.get('x-forwarded-for') || undefined,
      },
    });

    return NextResponse.json(
      successResponse({
        certificate: {
          id: certificate.id,
          type: certificate.type,
          certificateNumber: certificate.certificateNumber,
          issuerName: certificate.issuerName,
          issuedDate: certificate.issuedDate,
          expiryDate: certificate.expiryDate,
          status: certificate.status,
          isExpired,
          isVerified,
        },
      })
    );
  } catch (error) {
    console.error('Verify certificate error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('VERIFY_CERTIFICATE_ERROR', 'Failed to verify certificate'),
      { status: 500 }
    );
  }
}
