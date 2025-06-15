import { KJUR } from 'jsrsasign'

/**
 * Sign a JWT using HS256 algorithm (compatible with Postman pre-script and most backends).
 * @param payload - The payload object to encode in the JWT.
 * @param secret - The secret string for HMAC-SHA256 signing.
 * @returns The signed JWT as a string.
 */
export function signJWT(payload: Record<string, unknown>, secret: string): string {
  // JWT header
  const header = { alg: 'HS256', typ: 'JWT' }
  // Stringify and base64url encode header and payload
  const sHeader = JSON.stringify(header)
  const sPayload = JSON.stringify(payload)
  // Use jsrsasign to sign
  return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, { utf8: secret })
}

/**
 * Generate a JWT using the secret from environment variable NEXT_PUBLIC_JWT_SECRET.
 * Throws an error if the secret is not set.
 * @param payload - The payload object to encode in the JWT.
 * @returns The signed JWT as a string.
 */
export function getJWT(payload: Record<string, unknown>): string {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    throw new Error('JWT secret is not set in NEXT_PUBLIC_JWT_SECRET')
  }
  return signJWT(payload, secret)
} 