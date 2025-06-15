import React from 'react'
import type { Scene } from '@/app/domain/models/scene'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SceneListFormProps {
  scenes: Scene[]
  onScenesChange: (scenes: Scene[]) => void
}

export default function SceneListForm({ scenes, onScenesChange }: SceneListFormProps) {
  const handleFieldChange = (idx: number, field: keyof Scene, value: string | string[]) => {
    onScenesChange(
      scenes.map((scene, i) =>
        i === idx ? { ...scene, [field]: value } : scene
      )
    )
  }

  const handleDelete = (idx: number) => {
    const newScenes = scenes.filter((_, i) => i !== idx)
    onScenesChange(newScenes)
  }

  return (
    <div className="space-y-8">
      {scenes.map((scene, idx) => (
        <Card key={scene.scene_id || idx}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              Scene {scene.scene_id || idx + 1}: {scene.title}
            </CardTitle>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => handleDelete(idx)}
              className="ml-4"
            >
              Delete
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(['title', 'summary', 'location', 'time', 'purpose', 'transition', 'visual_style'] as (keyof Scene)[]).map(field => (
                <div className="flex items-start" key={field}>
                  <span className="w-40 text-left text-sm font-medium flex-shrink-0 mt-2 capitalize">{field.replace('_', ' ')}:</span>
                  <textarea
                    className="ml-2 flex-1 rounded border px-2 py-2 min-h-[60px] resize-vertical"
                    value={scene[field] as string}
                    onChange={e => handleFieldChange(idx, field, e.target.value)}
                    placeholder={field.replace('_', ' ')}
                    rows={3}
                  />
                </div>
              ))}
              {/* characters 字段特殊处理 */}
              <div className="flex items-start">
                <span className="w-40 text-left text-sm font-medium flex-shrink-0 mt-2 capitalize">characters:</span>
                <Input
                  className="ml-2 flex-1"
                  value={scene.characters.join(', ')}
                  onChange={e => handleFieldChange(idx, 'characters', e.target.value.split(',').map(s => s.trim()))}
                  placeholder="Comma separated"
                />
              </div>
              {/* act 字段 */}
              <div className="flex items-center">
                <span className="w-40 text-left text-sm font-medium flex-shrink-0 capitalize">act:</span>
                <Input
                  className="ml-2 flex-1"
                  type="number"
                  value={scene.act}
                  onChange={e => handleFieldChange(idx, 'act', e.target.value)}
                  placeholder="Act"
                />
              </div>
              {/* scene_id 字段（只读） */}
              <div className="flex items-center">
                <span className="w-40 text-left text-sm font-medium flex-shrink-0 capitalize">scene_id:</span>
                <Input
                  className="ml-2 flex-1"
                  value={scene.scene_id}
                  readOnly
                  disabled
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 