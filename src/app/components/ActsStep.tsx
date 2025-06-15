"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { useScriptStore } from '@/app/application/store/scriptStore'
import { generate3Acts } from '@/app/application/usecases/generate3Acts'
import type { Character } from '@/app/domain/models/character'

/**
 * ActsStep: Handles three-act structure step (TODO placeholder).
 */
export default function ActsStep() {
  const router = useRouter()
  const idea = useScriptStore(s => s.idea)
  const logline = useScriptStore(s => s.logline)
  const characters = useScriptStore(s => s.characters)
  const setActs = useScriptStore(s => s.setActs)
  const [selected, setSelected] = useState(() => characters ? characters.map(() => true) : [])
  const [editList, setEditList] = useState<Character[]>(characters ? JSON.parse(JSON.stringify(characters)) : [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!characters || !logline) {
    return <div className="p-8">No character or logline data. Please go back and complete previous steps.</div>
  }

  const handleCheckbox = (idx: number) => {
    setSelected(sel => sel.map((v, i) => i === idx ? !v : v))
  }

  const handleFieldChange = (idx: number, field: keyof Character, value: string) => {
    setEditList(list => list.map((item, i) => i === idx ? { ...item, [field]: value } : item))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const chosen = editList.filter((_, i) => selected[i])
    if (chosen.length === 0) {
      setError('Please select at least one character.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const acts = await generate3Acts({ characters: chosen, logline, idea })
      setActs(acts)
      router.push('/?scene')
    }  catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate 3 Acts')
      } else {
        setError('Failed to generate 3 Acts')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 3: Select Characters for 3-Act Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {editList.map((item, idx) => (
                <div key={idx} className={`p-4 border rounded mb-4 ${selected[idx] ? 'border-primary' : 'border-muted'}`}>
                  <label className="flex items-center mb-4 gap-2">
                    <input
                      type="checkbox"
                      checked={selected[idx]}
                      onChange={() => handleCheckbox(idx)}
                      className="accent-primary"
                    />
                    <span className="font-semibold">{item.role}: {item.name}</span>
                  </label>
                  <div className="space-y-3">
                    {(['name', 'summary', 'motivation', 'flaw', 'arc', 'voice_style', 'backstory'] as (keyof Character)[]).map(field => (
                      <div className="flex items-center" key={field}>
                        <span className="w-32 text-left text-sm font-medium flex-shrink-0 capitalize">{field.replace('_', ' ')}:</span>
                        <Input
                          className="ml-2 flex-1"
                          value={item[field] as string}
                          onChange={e => handleFieldChange(idx, field, e.target.value)}
                          placeholder={field.replace('_', ' ')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Button type="submit" className="mt-6 w-full" disabled={loading}>
              {loading ? 'Generating 3 Acts...' : 'Generate 3 Acts'}
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