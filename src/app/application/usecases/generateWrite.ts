import { fetchWrite } from '@/app/infrastructure/api/writeApi'
import type { Script } from '@/app/domain/models/script'
import type { Scene } from '@/app/domain/models/scene'
import type { Acts } from '@/app/domain/models/acts'
import type { Character } from '@/app/domain/models/character'
import type { Logline } from '@/app/domain/models/logline'

export async function generateWrite({
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
  return fetchWrite({ scenes, structure, characters, logline, idea })
} 