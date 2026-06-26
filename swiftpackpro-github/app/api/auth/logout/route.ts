// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { verifyToken, extractTokenFromHeader } from '@/lib/auth/jwt';
import { AuthenticationError, isAppError } from '@/lib/utils/errors';
import { errorResponse, successResponse } from '@/lib/utils/response';

/**
 * POST /api/auth/logout
 * Logout user by invalidating session
 */
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
      throw new AuthenticationError('Missing authorization token');
    }

    const payload = verifyToken(token);
    if (!payload) {
      throw new AuthenticationError('Invalid or expired token');
    }

    // Delete session
    await prisma.session.deleteMany({
      where: { userId: payload.userId },
    });

    return NextResponse.json(successResponse({ message: 'Logged out successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Logout error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('LOGOUT_ERROR', 'Failed to logout'),
      { status: 500 }
    );
  }
}
