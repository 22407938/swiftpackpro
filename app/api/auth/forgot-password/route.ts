import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { generateResetToken, getPasswordResetTokenExpiry } from '@/lib/auth/password';
import {
  ValidationError,
  InternalServerError,
  isAppError,
} from '@/lib/utils/errors';
import { errorResponse, successResponse } from '@/lib/utils/response';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email?.trim()) {
      throw new ValidationError('Email is required');
    }

    const normalizedEmail = email.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user) {
      const resetToken = generateResetToken();
      const expiry = getPasswordResetTokenExpiry();

      await prisma.user.update({
        where: { id: user.id },
        data: {
          passwordResetToken: resetToken,
          passwordResetTokenExpiry: expiry,
        },
      });
    }

    return NextResponse.json(
      successResponse({
        message:
          'If an account exists for that email, a password reset link has been sent.',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Forgot password error:', error);

    if (isAppError(error)) {
      return NextResponse.json(
        errorResponse(error.code || 'ERROR', error.message),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      errorResponse('FORGOT_PASSWORD_ERROR', 'Failed to process password reset request'),
      { status: 500 }
    );
  }
}
