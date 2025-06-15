"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScriptStore } from '@/app/application/store/scriptStore'

/**
 * PlaceholderStep: Displays character output (for demo only).
 */
export default function PlaceholderStep() {
  const acts = useScriptStore((s) => s.acts)

  return (
    <div className="py-10 px-4 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>3-Act Structure Output</CardTitle>
        </CardHeader>
        <CardContent>
          {acts ? (
            <div className="space-y-6">
              <div className="p-4 border rounded bg-muted">
                <div className="font-semibold text-lg mb-2">Act 1</div>
                <div className="mb-1"><span className="font-medium">Setup:</span> {acts.act_1.setup}</div>
                <div className="mb-1"><span className="font-medium">Inciting Incident:</span> {acts.act_1.inciting_incident}</div>
                <div className="mb-1"><span className="font-medium">Turning Point:</span> {acts.act_1.turning_point}</div>
              </div>
              <div className="p-4 border rounded bg-muted">
                <div className="font-semibold text-lg mb-2">Act 2</div>
                <div className="mb-1"><span className="font-medium">Rising Action:</span> {acts.act_2.rising_action}</div>
                <div className="mb-1"><span className="font-medium">Midpoint:</span> {acts.act_2.midpoint}</div>
                <div className="mb-1"><span className="font-medium">Crisis:</span> {acts.act_2.crisis}</div>
              </div>
              <div className="p-4 border rounded bg-muted">
                <div className="font-semibold text-lg mb-2">Act 3</div>
                <div className="mb-1"><span className="font-medium">Climax:</span> {acts.act_3.climax}</div>
                <div className="mb-1"><span className="font-medium">Denouement:</span> {acts.act_3.denouement}</div>
              </div>
            </div>
          ) : (
            <div>No 3-Act data. Please go back and generate again.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 