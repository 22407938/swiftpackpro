// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password';
import { createTokens } from '@/lib/auth/jwt';
import {
  ValidationError,
  ConflictError,
  InternalServerError,
  isAppError,
} from '@/lib/utils/errors';
import { errorResponse, successResponse } from '@/lib/utils/response';
import { UserRole } from '@prisma/client';

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone, role } = await req.json();

    // Validate input
    if (!firstName?.trim()) throw new ValidationError('First name is required');
    if (!lastName?.trim()) throw new ValidationError('Last name is required');
    if (!email?.trim()) throw new ValidationError('Email is required');
    if (!password) throw new ValidationError('Password is required');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new ValidationError('Invalid email format');

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      throw new ValidationError(passwordValidation.errors.join('; '));
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone?.trim(),
        role: (role as UserRole) || UserRole.APPLICANT,
      },
    });

    // Generate tokens
    const { accessToken, refreshToken } = createTokens(user.id, user.email, user.role, true);

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    return NextResponse.json(
      successResponse({
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);

    if (isAppError(error)) {
      return NextResponse.json(errorResponse(error.code || 'ERROR', error.message), {
        status: error.statusCode,
      });
    }

    return NextResponse.json(
      errorResponse('REGISTRATION_ERROR', 'Failed to register user'),
      { status: 500 }
    );
  }
}
