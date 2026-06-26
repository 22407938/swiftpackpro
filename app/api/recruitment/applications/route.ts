// app/api/recruitment/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { ApplicationStatus } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  NotFoundError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/utils/response';

/**
 * GET /api/recruitment/applications
 * Get applications
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
    const status = searchParams.get('status') as ApplicationStatus | null;

    const skip = (page - 1) * limit;

    // If user is applicant, show only their applications
    const where =
      payload.role === 'APPLICANT'
        ? { userId: payload.userId, ...(status && { status }) }
        : { ...(status && { status }) };

    const [applications, total] = await Promise.all([
      prisma.jobApplication.findMany({
        where,
        skip,
        take: limit,
        include: { job: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.jobApplication.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(applications, total, page, limit));
  } catch (error) {
    console.error('Get applications error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_APPLICATIONS_ERROR', 'Failed to get applications'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/recruitment/applications
 * Submit job application
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Missing authorization token');
    }

    const payload = verifyToken(token);
    if (!payload) throw new AuthenticationError('Unauthorized');

    const { jobId, preferredLocations, cv, coverLetter } = await req.json();

    // Validate input
    if (!jobId) throw new ValidationError('Job ID is required');
    if (!preferredLocations) throw new ValidationError('Preferred locations are required');
    if (!cv?.trim()) throw new ValidationError('CV URL is required');

    // Verify job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundError('Job not found');
    }

    // Check if already applied
    const existing = await prisma.jobApplication.findFirst({
      where: { jobId, userId: payload.userId },
    });

    if (existing) {
      throw new ValidationError('You have already applied for this job');
    }

    // Create application
    const application = await prisma.jobApplication.create({
      data: {
        jobId,
        userId: payload.userId,
        preferredLocations: JSON.stringify(preferredLocations),
        cv: cv.trim(),
        coverLetter: coverLetter?.trim(),
        status: ApplicationStatus.SUBMITTED,
      },
      include: { job: true, user: { select: { id: true, email: true, firstName: true, lastName: true } } },
    });

    return NextResponse.json(successResponse(application), { status: 201 });
  } catch (error) {
    console.error('Create application error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_APPLICATION_ERROR', 'Failed to submit application'),
      { status: 500 }
    );
  }
}
