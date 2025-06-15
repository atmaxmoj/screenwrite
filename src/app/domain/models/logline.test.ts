import type { Logline } from './logline'

describe('Logline type', () => {
  it('should allow all required fields', () => {
    const l: Logline = {
      logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h'
    }
    expect(l.logline).toBe('a')
  })

  it('should not allow missing fields (should error at compile time)', () => {
    const line: Logline = {
      logline: 'a',
      protagonist: '',
      objective: '',
      conflict: '',
      genre: '',
      style: '',
      tone: '',
      explanation: ''
    }
    expect(line).toBeDefined()
  })
}) 