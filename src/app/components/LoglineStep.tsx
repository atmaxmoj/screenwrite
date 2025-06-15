"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useScriptStore } from '@/app/application/store/scriptStore'
import { generateCharacter } from '@/app/application/usecases/generateCharacter'
import type { Logline } from '@/app/domain/models/logline'
import LoglineList from './logline/LoglineList'

/**
 * LoglineStep: Handles character generation step (TODO placeholder).
 */
export default function LoglineStep() {
  const router = useRouter()
  const {
    loglineList,
    setLoglineList,
    logline,
    setLogline,
    idea,
    setCharacters
  } = useScriptStore()
  const [selectedIdx, setSelectedIdx] = useState(() => {
    if (loglineList && logline) {
      return loglineList.findIndex(l => l === logline)
    }
    return 0
  })
  const [error, setError] = useState<string | null>(null)
  const setGlobalLoading = useScriptStore(s => s.setGlobalLoading)
  const globalLoading = useScriptStore(s => s.globalLoading)

  // 处理 radio 选择
  const handleSelect = (idx: number) => {
    setSelectedIdx(idx)
    if (loglineList) setLogline(loglineList[idx])
  }

  // 处理字段编辑
  const handleFieldChange = (idx: number, field: keyof Logline, value: string) => {
    if (!loglineList) return
    const updated = loglineList.map((item, i) =>
      i === idx ? { ...item, [field]: value } : item
    )
    setLoglineList(updated)
    if (idx === selectedIdx) setLogline(updated[idx])
  }

  // 提交生成角色
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!loglineList || !loglineList[selectedIdx] || !idea) {
      setError('Please select and edit a logline, and ensure idea is not empty.')
      return
    }
    setGlobalLoading(true)
    setError(null)
    try {
      const result = await generateCharacter(loglineList[selectedIdx], idea)
      setCharacters(result)
      router.push('/?characters')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate character')
      } else {
        setError('Failed to generate character')
      }
    } finally {
      setGlobalLoading(false)
    }
  }

  if (!loglineList || loglineList.length === 0) {
    return <div className="p-8">No logline data. Please go back and generate logline first.</div>
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 2: Select and Edit Logline</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <LoglineList
              loglines={loglineList}
              selectedIdx={selectedIdx}
              onSelect={handleSelect}
              onFieldChange={handleFieldChange}
            />
            <Button type="submit" className="mt-6 w-full" disabled={globalLoading}>
              {globalLoading ? 'Generating Characters...' : 'Generate Characters'}
            </Button>
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 