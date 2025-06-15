import { signJWT, getJWT } from './jwt'
import { KJUR } from 'jsrsasign'

describe('JWT utils', () => {
  const secret = 'test_secret'

  it('signJWT should generate a valid JWT with only iat in payload', () => {
    const jwt = signJWT(secret)
    // 解码 payload
    const parts = jwt.split('.')
    expect(parts.length).toBe(3)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'))
    expect(typeof payload.iat).toBe('number')
    expect(Object.keys(payload)).toEqual(['iat'])
    // 验证签名
    const isValid = KJUR.jws.JWS.verifyJWT(jwt, secret, { alg: ['HS256'] })
    expect(isValid).toBe(true)
  })

  it('getJWT should use NEXT_PUBLIC_JWT_SECRET and payload only iat', () => {
    process.env.NEXT_PUBLIC_JWT_SECRET = secret
    const jwt = getJWT()
    const parts = jwt.split('.')
    expect(parts.length).toBe(3)
    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'))
    expect(typeof payload.iat).toBe('number')
    expect(Object.keys(payload)).toEqual(['iat'])
    // 验证签名
    const isValid = KJUR.jws.JWS.verifyJWT(jwt, secret, { alg: ['HS256'] })
    expect(isValid).toBe(true)
  })
}) 