// app/api/accounting/invoices/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { InvoiceStatus } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/utils/response';

/**
 * GET /api/accounting/invoices
 * Get invoices
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
    const status = searchParams.get('status') as InvoiceStatus | null;

    const skip = (page - 1) * limit;

    const where = status ? { status } : {};

    const [invoices, total] = await Promise.all([
      prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        include: { booking: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.invoice.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(invoices, total, page, limit));
  } catch (error) {
    console.error('Get invoices error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_INVOICES_ERROR', 'Failed to get invoices'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/accounting/invoices
 * Create new invoice
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

    const { bookingId, customerName, customerEmail, amount, tax, dueDate } = await req.json();

    // Validate input
    if (!customerName?.trim()) throw new ValidationError('Customer name is required');
    if (!customerEmail?.trim()) throw new ValidationError('Customer email is required');
    if (!amount) throw new ValidationError('Amount is required');
    if (!dueDate) throw new ValidationError('Due date is required');

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber: `INV-${Date.now()}`,
        bookingId: bookingId || undefined,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim(),
        amount: parseFloat(amount),
        tax: tax ? parseFloat(tax) : 0,
        totalAmount: parseFloat(amount) + (tax ? parseFloat(tax) : 0),
        issueDate: new Date(),
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json(successResponse(invoice), { status: 201 });
  } catch (error) {
    console.error('Create invoice error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_INVOICE_ERROR', 'Failed to create invoice'),
      { status: 500 }
    );
  }
}
