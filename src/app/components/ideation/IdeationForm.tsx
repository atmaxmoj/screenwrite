"use client"
import * as React from 'react'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

interface IdeationFormProps {
    idea: string
    action: (idea: string) => void
    loading?: boolean
    onSubmitAction: () => void
}

/**
 * Ideation 组件：输入 idea，提交生成 logline
 */
export function IdeationForm({loading, idea, action, onSubmitAction}: IdeationFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmitAction()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xl mx-auto">
            <Input
                value={idea}
                onChange={e => action(e.target.value)}
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