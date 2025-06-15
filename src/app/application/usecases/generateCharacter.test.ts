import { generateCharacter } from './generateCharacter'
import { fetchCharacter } from '@/app/infrastructure/api/characterApi'
import type { Logline } from '@/app/domain/models/logline'
import type { Character } from '@/app/domain/models/character'

jest.mock('@/app/infrastructure/api/characterApi', () => ({
  fetchCharacter: jest.fn(),
}))

describe('generateCharacter', () => {
  const logline: Logline = {
    logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h'
  }
  const idea = 'idea'
  const mockCharacters: Character[] = [
    {
      name: 'John', role: 'Protagonist', summary: 'Hero', motivation: 'Justice', flaw: 'Pride', arc: 'Learns humility', voice_style: 'Direct', backstory: 'Lost family'
    }
  ]

  it('should return character list on success', async () => {
    (fetchCharacter as jest.Mock).mockResolvedValueOnce(mockCharacters)
    const result = await generateCharacter(logline, idea)
    expect(result).toEqual(mockCharacters)
  })

  it('should throw on api error', async () => {
    (fetchCharacter as jest.Mock).mockRejectedValueOnce(new Error('fail'))
    await expect(generateCharacter(logline, idea)).rejects.toThrow('fail')
  })
}) 