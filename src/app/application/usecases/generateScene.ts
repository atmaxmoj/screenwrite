import { fetchScenes } from '@/app/infrastructure/api/sceneApi'
import type { Scene } from '@/app/domain/models/scene'
import type { Acts } from '@/app/domain/models/acts'
import type { Character } from '@/app/domain/models/character'
import type { Logline } from '@/app/domain/models/logline'

export async function generateScene({ structure, characters, logline, idea }: {
  structure: Acts
  characters: Character[]
  logline: Logline
  idea: string
}): Promise<Scene[]> {
  return fetchScenes({ structure, characters, logline, idea })
} 