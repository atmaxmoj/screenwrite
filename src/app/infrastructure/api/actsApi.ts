import type { Acts } from '@/app/domain/models/acts'
import type { Character } from '@/app/domain/models/character'
import type { Logline } from '@/app/domain/models/logline'
import { API_BASE_URL } from '@/app/infrastructure/constants/api'
import { getJWT } from '@/app/infrastructure/utils/jwt'

export async function fetchActs({ characters, logline, idea }: {
  characters: Character[]
  logline: Logline
  idea: string
}): Promise<Acts> {
  const jwt = getJWT()
  const res = await fetch(`${API_BASE_URL}/api/v1/3acts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ data: { characters, logline, idea } }),
  })
  if (!res.ok) {
    throw new Error('Failed to fetch 3Acts')
  }
  const data = await res.json()
  return data.output as Acts
} 