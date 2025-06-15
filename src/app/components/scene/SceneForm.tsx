import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import type { Acts } from '@/app/domain/models/acts'

interface SceneFormProps {
  acts: Acts
  onActsChange: (acts: Acts) => void
  onSubmit: (e: React.FormEvent) => void
  loading?: boolean
  error?: string | null
}

export default function SceneForm({ acts, onActsChange, onSubmit, loading, error }: SceneFormProps) {
  const handleFieldChange = (act: keyof Acts, field: string, value: string) => {
    onActsChange({
      ...acts,
      [act]: {
        ...acts[act],
        [field]: value
      }
    })
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
      <div className="space-y-8">
        {(['act_1', 'act_2', 'act_3'] as (keyof Acts)[]).map(actKey => (
          <Card key={actKey}>
            <CardHeader>
              <CardTitle>{actKey.replace('_', ' ').toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(acts[actKey] || {}).map(([field, value]) => (
                  <div className="flex items-start" key={field}>
                    <span className="w-40 text-left text-sm font-medium flex-shrink-0 mt-2 capitalize">{field.replace('_', ' ')}:</span>
                    <textarea
                      className="ml-2 flex-1 rounded border px-2 py-2 min-h-[120px] resize-vertical"
                      value={value as string}
                      onChange={e => handleFieldChange(actKey, field, e.target.value)}
                      placeholder={field.replace('_', ' ')}
                      rows={6}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button type="submit" className="mt-8 w-full" disabled={loading}>
        {loading ? 'Generating Scenes...' : 'Generate Scenes'}
      </Button>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </form>
  )
} 