import type { Character } from '@/app/domain/models/character'
import { Input } from '@/components/ui/input'
import React from 'react'

interface CharacterListProps {
  characters: Character[]
  editable?: boolean
  onChange?: (idx: number, field: keyof Character, value: string) => void
  inputSizeMap?: Partial<Record<keyof Character, number>> // 如 { summary: 3 }
}

/**
 * 角色展示组件，支持只读和可编辑两种模式
 */
export default function CharacterList({ characters, editable = false, onChange, inputSizeMap }: CharacterListProps) {
  if (!characters || characters.length === 0) {
    return <div>No character data.</div>
  }
  return (
    <div className="space-y-6">
      {characters.map((c, idx) => (
        <div key={idx} className="p-4 border rounded bg-muted">
          <div className="font-semibold mb-2">{c.role}: {c.name}</div>
          {(['summary', 'motivation', 'flaw', 'arc', 'voice_style', 'backstory'] as (keyof Character)[]).map(field => (
            <div className="mb-1 flex items-start" key={field}>
              <span className="font-medium w-32 flex-shrink-0 text-left capitalize">{field.replace('_', ' ')}:</span>
              {editable ? (
                inputSizeMap && inputSizeMap[field] && inputSizeMap[field]! > 1 ? (
                  <textarea
                    className="ml-2 flex-1 rounded border px-2 py-1 min-h-[40px]"
                    rows={inputSizeMap[field]}
                    value={c[field] as string}
                    onChange={e => onChange && onChange(idx, field, e.target.value)}
                  />
                ) : (
                  <Input
                    className="ml-2 flex-1"
                    value={c[field] as string}
                    onChange={e => onChange && onChange(idx, field, e.target.value)}
                  />
                )
              ) : (
                <span className="ml-2 flex-1">{c[field]}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
} 