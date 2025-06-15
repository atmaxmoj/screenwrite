import type { Script } from '@/app/domain/models/script'
import type { Scene } from '@/app/domain/models/scene'
import type { Acts } from '@/app/domain/models/acts'
import type { Character } from '@/app/domain/models/character'
import type { Logline } from '@/app/domain/models/logline'
import { API_BASE_URL } from '@/app/infrastructure/constants/api'
import { getJWT } from '@/app/infrastructure/utils/jwt'

export async function fetchWrite({
  scenes,
  structure,
  characters,
  logline,
  idea,
}: {
  scenes: Scene[]
  structure: Acts
  characters: Character[]
  logline: Logline
  idea: string
}): Promise<Script> {
  const jwt = getJWT()
  const res = await fetch(`${API_BASE_URL}/api/v1/write`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwt}`,
    },
    body: JSON.stringify({ data: { scenes, structure, characters, logline, idea } }),
  })
  if (!res.ok) {
    throw new Error('Failed to generate script')
  }
  const data = await res.json()
  return { full_script: data.full_script }
} 