// app/api/recruitment/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { JobStatus, EmploymentType } from '@prisma/client';
import {
  ValidationError,
  AuthenticationError,
  isAppError,
} from '@/lib/utils/errors';
import { successResponse, errorResponse, paginatedResponse } from '@/lib/utils/response';

/**
 * GET /api/recruitment/jobs
 * Get all jobs
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status') as JobStatus | null;
    const employmentType = searchParams.get('employmentType') as EmploymentType | null;

    const skip = (page - 1) * limit;

    const where = {
      ...(status && { status }),
      ...(employmentType && { employmentType }),
    };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.job.count({ where }),
    ]);

    return NextResponse.json(paginatedResponse(jobs, total, page, limit));
  } catch (error) {
    console.error('Get jobs error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('GET_JOBS_ERROR', 'Failed to get jobs'),
      { status: 500 }
    );
  }
}

/**
 * POST /api/recruitment/jobs
 * Create new job
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
      title,
      description,
      employmentType,
      locations,
      salary,
      salaryMin,
      salaryMax,
      requirements,
      responsibilities,
      positionsOpen,
      closingDate,
    } = await req.json();

    // Validate input
    if (!title?.trim()) throw new ValidationError('Job title is required');
    if (!description?.trim()) throw new ValidationError('Job description is required');
    if (!employmentType) throw new ValidationError('Employment type is required');
    if (!locations) throw new ValidationError('Locations are required');
    if (!salary && !salaryMin && !salaryMax)
      throw new ValidationError('Salary information is required');

    // Create job
    const job = await prisma.job.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        employmentType,
        locations: JSON.stringify(locations),
        salary: salary ? parseFloat(salary) : parseFloat(salaryMin || 0),
        salaryMin: salaryMin ? parseFloat(salaryMin) : undefined,
        salaryMax: salaryMax ? parseFloat(salaryMax) : undefined,
        requirements: JSON.stringify(requirements || []),
        responsibilities: JSON.stringify(responsibilities || []),
        positionsOpen: positionsOpen || 1,
        closingDate: closingDate ? new Date(closingDate) : undefined,
      },
    });

    return NextResponse.json(successResponse(job), { status: 201 });
  } catch (error) {
    console.error('Create job error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('CREATE_JOB_ERROR', 'Failed to create job'),
      { status: 500 }
    );
  }
}
