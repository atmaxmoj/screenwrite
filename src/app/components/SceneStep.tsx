"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useScriptStore } from '@/app/application/store/scriptStore'
import { generateWrite } from '@/app/application/usecases/generateWrite'
import { useState } from 'react'
import SceneListForm from './scene/SceneListForm'
import { useRouter } from 'next/navigation'

/**
 * SceneStep: Handles script output step (TODO placeholder).
 */
export default function SceneStep() {
  const idea = useScriptStore(s => s.idea)
  const logline = useScriptStore(s => s.logline)
  const characters = useScriptStore(s => s.characters)
  const acts = useScriptStore(s => s.acts)
  const scenes = useScriptStore(s => s.scenes)
  const script = useScriptStore(s => s.script)
  const setScript = useScriptStore(s => s.setScript)
  const [editScenes, setEditScenes] = useState(scenes ? JSON.parse(JSON.stringify(scenes)) : [])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleGenerate = async () => {
    if (!editScenes || !characters || !logline || !idea || !acts) {
      setError('Missing required data. Please complete all previous steps.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const result = await generateWrite({
        scenes: editScenes,
        structure: acts,
        characters,
        logline,
        idea,
      })
      setScript(result)
      router.push('/?finalscript')
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'message' in e) {
        setError((e as { message?: string }).message || 'Failed to generate script')
      } else {
        setError('Failed to generate script')
      }
    } finally {
      setLoading(false)
    }
  }

  if (!scenes) {
    return <div className="p-8">No scene data. Please go back and generate scenes first.</div>
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 5: Script Output</CardTitle>
        </CardHeader>
        <CardContent>
          <SceneListForm scenes={editScenes} onScenesChange={setEditScenes} />
          <Button onClick={handleGenerate} disabled={loading} className="my-6 w-full">
            {loading ? 'Generating Script...' : 'Generate Final Script'}
          </Button>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {script?.full_script && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Final Script Output</h3>
              <pre className="bg-muted rounded p-4 whitespace-pre-wrap text-sm overflow-x-auto">{script.full_script}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 