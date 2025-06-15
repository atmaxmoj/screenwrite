"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScriptStore } from '@/app/application/store/scriptStore'
import { Button } from '@/components/ui/button'
import { Copy } from 'lucide-react'
import { useState } from 'react'

/**
 * FinalScriptStep: Displays character output (for demo only).
 */
export default function FinalScriptStep() {
  const script = useScriptStore((s) => s.script)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (script?.full_script) {
      await navigator.clipboard.writeText(script.full_script)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    }
  }

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Final Script</CardTitle>
        </CardHeader>
        <CardContent>
          {script?.full_script ? (
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center justify-between">
                <span>Final Script Output</span>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="ml-2 px-2 py-1 h-8"
                  onClick={handleCopy}
                  disabled={copied}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </h3>
              <pre className="bg-muted rounded p-4 whitespace-pre-wrap text-sm overflow-x-auto relative">{script.full_script}</pre>
            </div>
          ) : (
            <div>No script data. Please go back and generate the script.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 