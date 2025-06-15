import { fetchCharacter } from './characterApi'
import type { Logline } from '@/app/domain/models/logline'

global.fetch = jest.fn() as jest.Mock
process.env.NEXT_PUBLIC_JWT_SECRET = 'test_secret'

describe('fetchCharacter', () => {
  const logline: Logline = {
    logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h'
  }
  const idea = 'idea'
  const mockOutput = [
    {
      name: 'John', role: 'Protagonist', summary: 'Hero', motivation: 'Justice', flaw: 'Pride', arc: 'Learns humility', voice_style: 'Direct', backstory: 'Lost family'
    }
  ]

  afterEach(() => { jest.clearAllMocks() })

  it('should return output array on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ output: mockOutput }) })
    const result = await fetchCharacter(logline, idea)
    expect(result).toEqual(mockOutput)
  })

  it('should return [] if output is not array', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true, json: async () => ({ output: null }) })
    const result = await fetchCharacter(logline, idea)
    expect(result).toEqual([])
  })

  it('should throw if not ok', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })
    await expect(fetchCharacter(logline, idea)).rejects.toThrow('Failed to generate character')
  })
}) 