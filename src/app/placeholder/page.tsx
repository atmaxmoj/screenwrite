"use client"
import { useScriptStore } from '@/app/application/store/scriptStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function LoglinePlaceholderPage() {
  const { loglineList, setLoglineList } = useScriptStore()

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Logline Placeholder (For Demo Only)</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.isArray(loglineList) && loglineList.length > 0 ? (
            <div className="space-y-6">
              {loglineList.map((item: import('@/app/domain/models/logline').Logline, idx: number) => (
                <div key={idx} className="p-4 border rounded bg-muted">
                  <div className="font-semibold mb-2">Logline {idx + 1}:</div>
                  <div className="mb-1"><span className="font-medium">Logline:</span> {item.logline}</div>
                  <div className="mb-1"><span className="font-medium">Protagonist:</span> {item.protagonist}</div>
                  <div className="mb-1"><span className="font-medium">Objective:</span> {item.objective}</div>
                  <div className="mb-1"><span className="font-medium">Conflict:</span> {item.conflict}</div>
                  <div className="mb-1"><span className="font-medium">Genre:</span> {item.genre}</div>
                  <div className="mb-1"><span className="font-medium">Style:</span> {item.style}</div>
                  <div className="mb-1"><span className="font-medium">Tone:</span> {item.tone}</div>
                  <div className="mb-1"><span className="font-medium">Explanation:</span> {item.explanation}</div>
                </div>
              ))}
              <Button variant="outline" className="mt-4" onClick={() => setLoglineList(null)}>
                Back
              </Button>
            </div>
          ) : (
            <div>No logline data. Please go back and generate again.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 