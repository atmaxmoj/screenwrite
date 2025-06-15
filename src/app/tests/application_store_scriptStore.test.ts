import { useScriptStore } from '../application/store/scriptStore'

// Helper to reset Zustand store between tests
const resetStore = () => {
  useScriptStore.getState().reset()
}

describe('scriptStore (Zustand)', () => {
  beforeEach(() => {
    resetStore()
  })

  it('setIdea updates idea', () => {
    useScriptStore.getState().setIdea('my idea')
    expect(useScriptStore.getState().idea).toBe('my idea')
  })

  it('setLogline updates logline', () => {
    const logline = { logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h' }
    useScriptStore.getState().setLogline(logline)
    expect(useScriptStore.getState().logline).toEqual(logline)
  })

  it('setCharacters updates characters', () => {
    const characters = [
      { name: 'Alice', role: 'protagonist' },
      { name: 'Bob', role: 'antagonist' }
    ]
    useScriptStore.getState().setCharacters(characters)
    expect(useScriptStore.getState().characters).toEqual(characters)
  })

  it('setActs updates acts', () => {
    const acts = { setup: 'start', conflict: 'middle', resolution: 'end' }
    useScriptStore.getState().setActs(acts)
    expect(useScriptStore.getState().acts).toEqual(acts)
  })

  it('setScenes updates scenes', () => {
    const scenes = [
      { title: 'Scene 1', location: 'A', time: 'Day' },
      { title: 'Scene 2', location: 'B', time: 'Night' }
    ]
    useScriptStore.getState().setScenes(scenes)
    expect(useScriptStore.getState().scenes).toEqual(scenes)
  })

  it('setScript updates script', () => {
    const script = { content: 'Full script text' }
    useScriptStore.getState().setScript(script)
    expect(useScriptStore.getState().script).toEqual(script)
  })

  it('reset clears all state', () => {
    useScriptStore.getState().setIdea('x')
    useScriptStore.getState().setLogline({ logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h' })
    useScriptStore.getState().setCharacters([{ name: 'z', role: 'p' }])
    useScriptStore.getState().setActs({ setup: 'a', conflict: 'b', resolution: 'c' })
    useScriptStore.getState().setScenes([{ title: 's', location: 'l', time: 't' }])
    useScriptStore.getState().setScript({ content: 'sc' })
    resetStore()
    const state = useScriptStore.getState()
    expect(state.idea).toBe('')
    expect(state.logline).toBeNull()
    expect(state.characters).toBeNull()
    expect(state.acts).toBeNull()
    expect(state.scenes).toBeNull()
    expect(state.script).toBeNull()
  })

  it('can simulate full data flow', () => {
    useScriptStore.getState().setIdea('idea')
    useScriptStore.getState().setLogline({ logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h' })
    useScriptStore.getState().setCharacters([{ name: 'A', role: 'p' }])
    useScriptStore.getState().setActs({ setup: 's', conflict: 'c', resolution: 'r' })
    useScriptStore.getState().setScenes([{ title: 'S', location: 'L', time: 'T' }])
    useScriptStore.getState().setScript({ content: 'script' })
    const state = useScriptStore.getState()
    expect(state.idea).toBe('idea')
    expect(state.logline).toEqual({ logline: 'a', protagonist: 'b', objective: 'c', conflict: 'd', genre: 'e', style: 'f', tone: 'g', explanation: 'h' })
    expect(state.characters).toEqual([{ name: 'A', role: 'p' }])
    expect(state.acts).toEqual({ setup: 's', conflict: 'c', resolution: 'r' })
    expect(state.scenes).toEqual([{ title: 'S', location: 'L', time: 'T' }])
    expect(state.script).toEqual({ content: 'script' })
  })
}) 