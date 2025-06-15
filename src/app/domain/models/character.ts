// Character 类型定义，包含所有 output 字段
export type Character = {
  name: string
  role: string // Protagonist, Antagonist, Ally, Mentor, Wildcard, etc.
  summary: string
  motivation: string
  flaw: string
  arc: string
  voice_style: string
  backstory: string
}

// Character example
export const exampleCharacter: Character = {
  name: "Elena Voss",
  role: "Protagonist",
  summary: "A brilliant but disillusioned programmer who once worked for the AI corporation before realizing its sinister agenda.",
  motivation: "To expose the corporation's dehumanizing practices and prove that human imperfection is the foundation of true innovation.",
  flaw: "Her past guilt over contributing to the corporation's technology haunts her, making her doubt her own worth.",
  arc: "From a fugitive hiding from her past to a fearless leader who embraces her flaws as strengths.",
  voice_style: "Terse and analytical, but with bursts of raw emotion when discussing humanity.",
  backstory: "Elena was a prodigy in AI development, recruited straight out of university by the corporation. She believed in their mission until she witnessed the erasure of human emotions in test subjects. Fleeing with stolen data, she now lives in the shadows, tormented by her role in the corporation's rise. Her only solace is her late mentor, who first questioned the cost of 'perfection.'"
} 