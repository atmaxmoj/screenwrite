"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * PlaceholderStep: Displays character output (for demo only).
 */
export default function PlaceholderStep() {
  const characters = useScriptStore((s) => s.characters)

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Character Output</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(characters) && characters.length > 0 ? (
            <div className="space-y-6">
              {characters.map((c, idx) => (
                <div key={idx} className="p-4 border rounded bg-muted">
                  <div className="font-semibold mb-2">{c.role}: {c.name}</div>
                  <div className="mb-1"><span className="font-medium">Summary:</span> {c.summary}</div>
                  <div className="mb-1"><span className="font-medium">Motivation:</span> {c.motivation}</div>
                  <div className="mb-1"><span className="font-medium">Flaw:</span> {c.flaw}</div>
                  <div className="mb-1"><span className="font-medium">Arc:</span> {c.arc}</div>
                  <div className="mb-1"><span className="font-medium">Voice/Style:</span> {c.voice_style}</div>
                  <div className="mb-1"><span className="font-medium">Backstory:</span> {c.backstory}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No character data. Please go back and generate again.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 