import { fetchActs } from '@/app/infrastructure/api/actsApi'
import type { Character } from '@/app/domain/models/character'
import type { Logline } from '@/app/domain/models/logline'
import type { Acts } from '@/app/domain/models/acts'

export async function generate3Acts({ characters, logline, idea }: {
  characters: Character[]
  logline: Logline
  idea: string
}): Promise<Acts> {
  return fetchActs({ characters, logline, idea })
} 