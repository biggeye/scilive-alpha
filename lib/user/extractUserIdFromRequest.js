// utils/auth.js

import jwt from 'jsonwebtoken';

/**
 * Extracts the user ID from the Supabase JWT token in the request.
 * @param {NextRequest} req - The incoming Next.js request.
 * @returns {string|null} The user ID if available, otherwise null.
 */
export async function extractUserIdFromRequest(req) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '') || null;
  if (!token) return null;

  try {
    const decodedToken = jwt.decode(token);
    return decodedToken?.sub || null; // Supabase uses 'sub' to store user ID in the token
  } catch (error) {
    console.error('Error decoding JWT token:', error);
    return null;
  }
}
