import { signJWT, getJWT } from '../infrastructure/utils/jwt'

// Mock process.env for getJWT
const OLD_ENV = process.env

describe('JWT Utils', () => {
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })

  afterAll(() => {
    process.env = OLD_ENV
  })

  it('signJWT generates a valid JWT with fixed secret', () => {
    const payload = { iat: 1710000000, foo: 'bar' }
    const secret = 'testsecret'
    const token = signJWT(payload, secret)
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3)
  })

  it('getJWT uses NEXT_PUBLIC_JWT_SECRET from env', () => {
    process.env.NEXT_PUBLIC_JWT_SECRET = 'envsecret'
    const payload = { iat: 1710000000, bar: 'baz' }
    const token = getJWT(payload)
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3)
  })

  it('getJWT throws if secret is missing', () => {
    delete process.env.NEXT_PUBLIC_JWT_SECRET
    expect(() => getJWT({ iat: 1 })).toThrow('JWT secret is not set in NEXT_PUBLIC_JWT_SECRET')
  })

  it('signJWT supports empty payload', () => {
    const token = signJWT({}, 'testsecret')
    expect(typeof token).toBe('string')
    expect(token.split('.').length).toBe(3)
  })
}) 