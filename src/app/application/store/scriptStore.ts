import { create } from 'zustand'
import type { Logline } from '@/app/domain/models/logline'
import type { Character } from '@/app/domain/models/character'
import type { Acts } from '@/app/domain/models/acts'
import type { Scene } from '@/app/domain/models/scene'
import type { Script } from '@/app/domain/models/script'

// Type definitions for each step of the script generation process
// You should replace these with more detailed types from your domain/models when available

// Global state interface for the script writing process
export interface ScriptState {
  idea: string
  loglineList: Logline[] | null
  logline: Logline | null
  characters: Character[] | null
  acts: Acts | null
  scenes: Scene[] | null
  script: Script | null
  setIdea: (idea: string) => void
  setLoglineList: (list: Logline[] | null) => void
  setLogline: (logline: Logline | null) => void
  setCharacters: (characters: Character[]) => void
  setActs: (acts: Acts) => void
  setScenes: (scenes: Scene[]) => void
  setScript: (script: Script) => void
  reset: () => void
}

/**
 * Zustand store for global script writing state.
 * This store holds all user input and generated data for each step.
 */
export const useScriptStore = create<ScriptState>((set) => ({
  idea: '',
  loglineList: null,
  logline: null,
  characters: null,
  acts: null,
  scenes: null,
  script: null,
  setIdea: (idea) => set({ idea }),
  setLoglineList: (list) => set({ loglineList: list }),
  setLogline: (logline) => set({ logline }),
  setCharacters: (characters) => set({ characters }),
  setActs: (acts) => set({ acts }),
  setScenes: (scenes) => set({ scenes }),
  setScript: (script) => set({ script }),
  reset: () => set({
    idea: '',
    loglineList: null,
    logline: null,
    characters: null,
    acts: null,
    scenes: null,
    script: null,
  }),
})) 