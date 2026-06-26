// app/api/compliance/certificates/[id]/route.ts
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
import { successResponse, errorResponse } from '@/lib/utils/response';

/**
 * GET /api/compliance/certificates/[id]
 * Get certificate by ID
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params;

    const certificate = await prisma.complianceCertificate.findUnique({
      where: { id },
      include: {
        verificationRecords: true,
        complianceAuditLogs: true,
      },
    });

    if (!certificate) {
      throw new NotFoundError('Certificate not found');
    }

    return NextResponse.json(successResponse(certificate));
  } catch (error) {
    console.error('Get certificate error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_CERTIFICATE_ERROR', 'Failed to get certificate'),
      { status: 500 }
    );
  }
}

/**
 * PUT /api/compliance/certificates/[id]
 * Update certificate
 */
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params;
    const { type, certificateNumber, issuedDate, expiryDate, issuerName, status } =
      await req.json();

    // Verify certificate exists
    const existing = await prisma.complianceCertificate.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Certificate not found');
    }

    // Update certificate
    const updated = await prisma.complianceCertificate.update({
      where: { id },
      data: {
        ...(type && { type: type as CertificateType }),
        ...(certificateNumber && { certificateNumber }),
        ...(issuedDate && { issuedDate: new Date(issuedDate) }),
        ...(expiryDate && { expiryDate: new Date(expiryDate) }),
        ...(issuerName && { issuerName }),
        ...(status && { status: status as CertificateStatus }),
      },
    });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CERTIFICATE_UPDATED',
        entity: 'ComplianceCertificate',
        entityId: id,
        performedBy: payload.email,
      },
    });

    return NextResponse.json(successResponse(updated));
  } catch (error) {
    console.error('Update certificate error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('UPDATE_CERTIFICATE_ERROR', 'Failed to update certificate'),
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/compliance/certificates/[id]
 * Delete certificate
 */
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
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

    const { id } = params;

    // Verify certificate exists
    const existing = await prisma.complianceCertificate.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundError('Certificate not found');
    }

    // Delete certificate
    await prisma.complianceCertificate.delete({ where: { id } });

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'CERTIFICATE_DELETED',
        entity: 'ComplianceCertificate',
        entityId: id,
        performedBy: payload.email,
      },
    });

    return NextResponse.json(successResponse({ message: 'Certificate deleted successfully' }));
  } catch (error) {
    console.error('Delete certificate error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('DELETE_CERTIFICATE_ERROR', 'Failed to delete certificate'),
      { status: 500 }
    );
  }
}
