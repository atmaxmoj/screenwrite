import React from 'react'
import { Input } from '@/components/ui/input'
import {Logline} from "@/app/domain/models/logline";

interface LoglineListProps {
  loglines: Logline[]
  selectedIdx: number
  onSelect: (idx: number) => void
  onFieldChange: (idx: number, field: keyof Logline, value: string) => void
}

/**
 * LoglineList: 多条 logline 编辑与选择卡片
 */
export default function LoglineList({ loglines, selectedIdx, onSelect, onFieldChange }: LoglineListProps) {
  if (!loglines || loglines.length === 0) return <div>No logline data.</div>
  return (
    <div className="space-y-8">
      {loglines.map((item, idx) => (
        <div key={idx} className={`p-4 border rounded mb-4 ${selectedIdx === idx ? 'border-primary' : 'border-muted'}`}>
          <label className="flex items-center mb-4 gap-2">
            <input
              type="radio"
              name="logline-radio"
              checked={selectedIdx === idx}
              onChange={() => onSelect(idx)}
              className="accent-primary"
            />
            <span className="font-semibold">Logline {idx + 1}</span>
          </label>
          {/* 主体字段：每行 label 左，input 右 */}
          <div className="space-y-3">
            {([
              ['logline', 'Logline'],
              ['protagonist', 'Protagonist'],
              ['objective', 'Objective'],
              ['genre', 'Genre'],
              ['style', 'Style'],
              ['tone', 'Tone'],
            ] as [keyof Logline, string][]).map(([field, label]) => (
              <div className="flex items-center" key={field}>
                <span className="w-32 text-left text-sm font-medium flex-shrink-0">{label}</span>
                <Input
                  className="ml-2 flex-1"
                  value={item[field]}
                  onChange={e => onFieldChange(idx, field, e.target.value)}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          {/* 底部长字段：conflict, explanation 用 textarea */}
          <div className="mt-4 space-y-3">
            {([
              ['conflict', 'Conflict'],
              ['explanation', 'Explanation'],
            ] as [keyof Logline, string][]).map(([field, label]) => (
              <div className="flex items-start" key={field}>
                <span className="w-32 text-left text-sm font-medium flex-shrink-0 mt-2">{label}</span>
                <textarea
                  className="ml-2 flex-1 rounded border px-2 py-1 min-h-[60px]"
                  rows={3}
                  value={item[field]}
                  onChange={e => onFieldChange(idx, field, e.target.value)}
                  placeholder={label}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 