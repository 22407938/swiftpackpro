// app/api/operations/services/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { ServiceType } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse } from '@/lib/utils/response';

/**
 * GET /api/operations/services
 * Get all available services
 */
export async function GET(req: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: { locations: true },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(successResponse(services));
  } catch (error) {
    console.error('Get services error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_SERVICES_ERROR', 'Failed to get services'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/operations/services
 * Create new service (Admin only)
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

    const { name, type, description, basePrice, estimatedDuration } = await req.json();

    // Validate input
    if (!name?.trim()) throw new ValidationError('Service name is required');
    if (!type) throw new ValidationError('Service type is required');
    if (!description?.trim()) throw new ValidationError('Service description is required');
    if (!basePrice) throw new ValidationError('Base price is required');
    if (!estimatedDuration) throw new ValidationError('Estimated duration is required');

    // Create service
    const service = await prisma.service.create({
      data: {
        name: name.trim(),
        type: type as ServiceType,
        description: description.trim(),
        basePrice: parseFloat(basePrice),
        estimatedDuration: parseInt(estimatedDuration),
      },
    });

    return NextResponse.json(successResponse(service), { status: 201 });
  } catch (error) {
    console.error('Create service error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_SERVICE_ERROR', 'Failed to create service'),
      { status: 500 }
    );
  }
}
