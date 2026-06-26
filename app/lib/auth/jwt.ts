// app/lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { UserRole } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

/**
 * Sign a JWT token
 */
export function signToken(payload: Omit<TokenPayload, 'iat' | 'exp'>, expiresIn = JWT_EXPIRY): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

/**
 * Verify and decode JWT token
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Decode JWT token without verification (for debugging)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader?: string | null): string | null {
  if (!authHeader) return null;

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
}

/**
 * Create tokens (access token and optional refresh token)
 */
export function createTokens(
  userId: string,
  email: string,
  role: UserRole,
  includeRefresh = false
): { accessToken: string; refreshToken?: string } {
  const accessToken = signToken({ userId, email, role });
  
  return {
    accessToken,
    ...(includeRefresh && { refreshToken: signToken({ userId, email, role }, '30d') }),
  };
}
