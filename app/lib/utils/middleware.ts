// app/lib/utils/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '../auth/jwt';
import { AuthenticationError, isAppError } from './errors';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware to authenticate requests using JWT
 */
export function authenticateRequest(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader) {
        throw new AuthenticationError('Missing authorization header');
      }

      const token = authHeader.replace('Bearer ', '');
      const payload = verifyToken(token);

      if (!payload) {
        throw new AuthenticationError('Invalid or expired token');
      }

      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = {
        userId: payload.userId,
        email: payload.email,
        role: payload.role,
      };

      return handler(authenticatedReq);
    } catch (error) {
      if (isAppError(error)) {
        return NextResponse.json(
          { success: false, error: { code: error.code, message: error.message } },
          { status: error.statusCode }
        );
      }

      return NextResponse.json(
        { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
        { status: 500 }
      );
    }
  };
}

/**
 * Error handler for API routes
 */
export async function handleError(error: unknown) {
  console.error('API Error:', error);

  if (isAppError(error)) {
    return NextResponse.json(
      { success: false, error: { code: error.code, message: error.message } },
      { status: error.statusCode }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, error: { code: 'UNKNOWN_ERROR', message: error.message } },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred' } },
    { status: 500 }
  );
}

/**
 * Wrapper for async API route handlers
 */
export function asyncHandler(fn: (req: NextRequest) => Promise<Response>) {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      return handleError(error);
    }
  };
}
