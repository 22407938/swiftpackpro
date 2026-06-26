// app/api/operations/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { BookingStatus } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/utils/response';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/operations/bookings
 * Get bookings
 */
export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Missing authorization token');
    }

    const payload = verifyToken(token);
    if (!payload) throw new AuthenticationError('Unauthorized');

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as BookingStatus | null;
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(dateFrom && { serviceDate: { gte: new Date(dateFrom) } }),
      ...(dateTo && { serviceDate: { lte: new Date(dateTo) } }),
    };

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        skip,
        take: limit,
        include: { service: true, shifts: true, payments: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(bookings, total, page, limit));
  } catch (error) {
    console.error('Get bookings error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_BOOKINGS_ERROR', 'Failed to get bookings'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/operations/bookings
 * Create new booking
 */
export async function POST(req: NextRequest) {
  try {
    const {
      serviceId,
      customerName,
      customerPhone,
      customerEmail,
      serviceDate,
      address,
      areaCode,
      latitude,
      longitude,
      notes,
      estimatedPrice,
    } = await req.json();

    // Validate input
    if (!serviceId) throw new ValidationError('Service ID is required');
    if (!customerName?.trim()) throw new ValidationError('Customer name is required');
    if (!customerPhone?.trim()) throw new ValidationError('Customer phone is required');
    if (!serviceDate) throw new ValidationError('Service date is required');
    if (!address?.trim()) throw new ValidationError('Address is required');
    if (!areaCode?.trim()) throw new ValidationError('Area code is required');
    if (!estimatedPrice) throw new ValidationError('Estimated price is required');

    // Verify service exists
    const service = await prisma.service.findUnique({ where: { id: serviceId } });
    if (!service) {
      throw new NotFoundError('Service not found');
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        bookingNumber: `BP-${Date.now()}-${uuidv4().slice(0, 8)}`,
        serviceId,
        customerId: uuidv4(),
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail?.trim(),
        serviceDate: new Date(serviceDate),
        address: address.trim(),
        areaCode: areaCode.trim(),
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        notes: notes?.trim(),
        estimatedPrice: parseFloat(estimatedPrice),
      },
      include: { service: true },
    });

    return NextResponse.json(successResponse(booking), { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_BOOKING_ERROR', 'Failed to create booking'),
      { status: 500 }
    );
  }
}
