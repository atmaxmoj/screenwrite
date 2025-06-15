import { create } from 'zustand'

// Type definitions for each step of the script generation process
// You should replace these with more detailed types from your domain/models when available
export interface Logline {
  summary: string
}

export interface Character {
  name: string
  role: string // e.g. protagonist, antagonist, ally
  description?: string
}

export interface Acts {
  setup: string
  conflict: string
  resolution: string
}

export interface Scene {
  title: string
  location: string
  time: string
  style?: string
  description?: string
}

export interface Script {
  content: string
}

// Global state interface for the script writing process
export interface ScriptState {
  idea: string
  logline: Logline | null
  characters: Character[] | null
  acts: Acts | null
  scenes: Scene[] | null
  script: Script | null
  setIdea: (idea: string) => void
  setLogline: (logline: Logline) => void
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
  logline: null,
  characters: null,
  acts: null,
  scenes: null,
  script: null,
  setIdea: (idea) => set({ idea }),
  setLogline: (logline) => set({ logline }),
  setCharacters: (characters) => set({ characters }),
  setActs: (acts) => set({ acts }),
  setScenes: (scenes) => set({ scenes }),
  setScript: (script) => set({ script }),
  reset: () => set({
    idea: '',
    logline: null,
    characters: null,
    acts: null,
    scenes: null,
    script: null,
  }),
})) 