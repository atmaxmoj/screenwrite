"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { IdeationForm } from '@/app/components/ideation/IdeationForm'
import { generateLogline } from '@/app/application/usecases/generateLogline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * IdeationStep: Handles logline generation step.
 */
export default function IdeationStep() {
  const setGlobalLoading = useScriptStore(s => s.setGlobalLoading)
  const globalLoading = useScriptStore(s => s.globalLoading)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const setLoglineList = useScriptStore((s) => s.setLoglineList)
  const idea = useScriptStore((s) => s.idea)
  const setIdea = useScriptStore((s) => s.setIdea)

  const handleGenerateLogline = async () => {
    setGlobalLoading(true)
    setError(null)
    try {
      const result = await generateLogline(idea)
      setLoglineList(result)
      router.push('/?logline')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate logline')
      } else {
        setError('Failed to generate logline')
      }
    } finally {
      setGlobalLoading(false)
    }
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Generate a Logline</CardTitle>
        </CardHeader>
        <CardContent>
          <IdeationForm loading={globalLoading} idea={idea} action={setIdea} onSubmitAction={handleGenerateLogline} />
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 