import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password';
import {
  ValidationError,
  NotFoundError,
  isAppError,
} from '@/lib/utils/errors';
import { errorResponse, successResponse } from '@/lib/utils/response';

export async function POST(req: NextRequest) {
  try {
    const { token, newPassword } = await req.json();

    if (!token?.trim()) {
      throw new ValidationError('Reset token is required');
    }

    if (!newPassword) {
      throw new ValidationError('New password is required');
    }

    const passwordValidation = validatePasswordStrength(newPassword);
    if (!passwordValidation.isValid) {
      throw new ValidationError(passwordValidation.errors.join('; '));
    }

    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: token,
        passwordResetTokenExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      throw new NotFoundError('Invalid or expired reset token');
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetTokenExpiry: null,
      },
    });

    return NextResponse.json(
      successResponse({
        message: 'Your password was reset successfully. You can now log in with your new password.',
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);

    if (isAppError(error)) {
      return NextResponse.json(
        errorResponse(error.code || 'ERROR', error.message),
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      errorResponse('RESET_PASSWORD_ERROR', 'Failed to reset password'),
      { status: 500 }
    );
  }
}
