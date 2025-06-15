import { KJUR } from 'jsrsasign'

/**
 * Sign a JWT using HS256 algorithm (compatible with Postman pre-script and most backends).
 * @param secret - The secret string for HMAC-SHA256 signing.
 * @returns The signed JWT as a string.
 */
export function signJWT(secret: string): string {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = { iat: Math.floor(Date.now() / 1000) }
  const sHeader = JSON.stringify(header)
  const sPayload = JSON.stringify(payload)
  return KJUR.jws.JWS.sign('HS256', sHeader, sPayload, { utf8: secret })
}

/**
 * Generate a JWT using the secret from environment variable NEXT_PUBLIC_JWT_SECRET.
 * Throws an error if the secret is not set.
 * @returns The signed JWT as a string.
 */
export function getJWT(): string {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET
  if (!secret) {
    throw new Error('JWT secret is not set in NEXT_PUBLIC_JWT_SECRET')
  }
  return signJWT(secret)
} 