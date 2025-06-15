"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useScriptStore } from '@/app/application/store/scriptStore'
import { generateScene } from '@/app/application/usecases/generateScene'
import ActsForm from './acts/ActsForm'
import type { Acts } from '@/app/domain/models/acts'

/**
 * SceneStep: Handles scene generation step.
 */
export default function SceneStep() {
  const router = useRouter()
  const idea = useScriptStore(s => s.idea)
  const logline = useScriptStore(s => s.logline)
  const characters = useScriptStore(s => s.characters)
  const acts = useScriptStore(s => s.acts)
  const setScenes = useScriptStore(s => s.setScenes)
  const [editActs, setEditActs] = useState<Acts | null>(acts ? JSON.parse(JSON.stringify(acts)) : null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!acts || !characters || !logline) {
    return <div className="p-8">No acts, characters, or logline data. Please go back and complete previous steps.</div>
  }

  const handleActsChange = (newActs: Acts) => {
    setEditActs(newActs)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editActs) return
    setLoading(true)
    setError(null)
    try {
      const scenes = await generateScene({ structure: editActs, characters, logline, idea })
      console.log(scenes);
      setScenes(scenes)
      router.push('/?write')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate scenes')
      } else {
        setError('Failed to generate scenes')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ActsForm
      acts={editActs!}
      onActsChange={handleActsChange}
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  )
} 