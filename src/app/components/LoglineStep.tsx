"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { LoglineForm } from '@/app/components/logline/LoglineForm'
import { generateLogline } from '@/app/application/usecases/generateLogline'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * LoglineStep: Handles logline generation step.
 */
export default function LoglineStep() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const setLoglineList = useScriptStore((s) => s.setLoglineList)

  const handleGenerateLogline = async (idea: string) => {
    setLoading(true)
    setError(null)
    try {
      const result = await generateLogline(idea)
      setLoglineList(result)
      // 这里可用 props/state 传递 logline output
      // 目前直接跳转到 placeholder
      router.push('/?placeholder')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate logline')
      } else {
        setError('Failed to generate logline')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Generate a Logline</CardTitle>
        </CardHeader>
        <CardContent>
          <LoglineForm loading={loading} onSubmitAction={handleGenerateLogline} />
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