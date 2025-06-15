"use client"
import * as React from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface LoglineFormProps {
  loading?: boolean
  onSubmitAction: (idea: string) => void
}

/**
 * LoglineForm 组件：输入 idea，提交生成 logline
 */
export function LoglineForm({ loading, onSubmitAction }: LoglineFormProps) {
  const [idea, setIdea] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    onSubmitAction(idea.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
      <Input
        value={idea}
        onChange={e => setIdea(e.target.value)}
        placeholder="Enter your story idea..."
        disabled={loading}
        required
      />
      <Button type="submit" disabled={loading || !idea.trim()} className="w-full">
        {loading ? 'Generating...' : 'Generate Logline'}
      </Button>
    </form>
  )
} 