"use client"
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Logline } from '@/app/domain/models/logline'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * PlaceholderStep: Displays logline output (for demo only).
 */
export default function PlaceholderStep() {
  // 这里可用 props 传递 loglineOutput，暂用本地 state 以便演示
  const [loglineOutput, setLoglineOutput] = useState<Logline[] | null>(null)
  const loglineList = useScriptStore((s) => s.loglineList)

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Logline Placeholder (For Demo Only)</CardTitle>
        </CardHeader>
        <CardContent>
          {loglineList && loglineList.length > 0 ? (
            <div className="space-y-6">
              {loglineList.map((item, idx) => (
                <div key={idx} className="p-4 border rounded bg-muted">
                  <div className="font-semibold mb-2">Logline {idx + 1}:</div>
                  <div className="mb-1"><span className="font-medium">Logline:</span> {item.logline}</div>
                  <div className="mb-1"><span className="font-medium">Protagonist:</span> {item.protagonist}</div>
                  <div className="mb-1"><span className="font-medium">Objective:</span> {item.objective}</div>
                  <div className="mb-1"><span className="font-medium">Conflict:</span> {item.conflict}</div>
                  <div className="mb-1"><span className="font-medium">Genre:</span> {item.genre}</div>
                  <div className="mb-1"><span className="font-medium">Style:</span> {item.style}</div>
                  <div className="mb-1"><span className="font-medium">Tone:</span> {item.tone}</div>
                  <div className="mb-1"><span className="font-medium">Explanation:</span> {item.explanation}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No logline data. Please go back and generate again.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 