"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * WriteStep: Handles script output step (TODO placeholder).
 */
export default function WriteStep() {
  const script = useScriptStore(s => s.script)

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Step 5: Script Output</CardTitle>
        </CardHeader>
        <CardContent>
          {script?.content ? (
            <div>
              <h3 className="font-semibold text-lg mb-2">Final Script Output</h3>
              <pre className="bg-muted rounded p-4 whitespace-pre-wrap text-sm overflow-x-auto">{script.content}</pre>
            </div>
          ) : (
            <div>No script data. Please go back and generate the script.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 