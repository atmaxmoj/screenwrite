"use client"
import React, { useEffect, useMemo, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import IdeationStep from './IdeationStep'
import LoglineStep from './LoglineStep'
import CharacterStep from './CharacterStep'
import ActsStep from './ActsStep'
import FinalScriptStep from './FinalScriptStep'
import SceneStep from "@/app/components/SceneStep";
import { useScriptStore } from '@/app/application/store/scriptStore'
import GlobalLoadingBar from './GlobalLoadingBar'

const steps = [
  { key: 'ideation', label: 'Ideation' },
  { key: 'logline', label: 'Logline' },
  { key: 'characters', label: 'Characters' },
  { key: 'acts', label: 'Three-Act Structure' },
  { key: 'scene', label: 'Scene' },
  { key: 'finalscript', label: 'Final Script' },
]

export default function MainPage() {
  const params = useSearchParams()
  const router = useRouter()

  // 全局 store 依赖数据
  const loglineList = useScriptStore(s => s.loglineList)
  const characters = useScriptStore(s => s.characters)
  const acts = useScriptStore(s => s.acts)
  const scenes = useScriptStore(s => s.scenes)
  const script = useScriptStore(s => s.script)
  const globalLoading = useScriptStore(s => s.globalLoading)

  // 步骤禁用逻辑
  const stepDisabled = [
    false, // Ideation 永远可点
    !loglineList || loglineList.length === 0, // Characters 需要 loglineList
    !characters || characters.length === 0, // Acts 需要 characters
    !acts, // Scene 需要 acts
    !scenes || scenes.length === 0, // Final Script 需要 scenes
    !script, // Final Script 需要 scenes
  ]

  // 当前 step key
  const currentStep = useMemo(() => {
    for (const step of steps) {
      if (params.has(step.key)) return step.key
    }
    return ''
  }, [params])

  useEffect(() => {
    if (!currentStep) {
      router.replace('/?ideation')
    }
  }, [currentStep, router])

  // 右侧内容区分发
  let content: React.ReactNode
  switch (currentStep) {
    case 'ideation':
      content = <IdeationStep />
      break
    case 'logline':
      content = <LoglineStep />
      break
    case 'characters':
      content = <CharacterStep />
      break
    case 'acts':
      content = <ActsStep />
      break
    case 'scene':
      content = <SceneStep />
      break
    case 'finalscript':
      content = <FinalScriptStep />
      break
    default:
      content = <div className="p-8">Welcome! Please select a step.</div>
  }

  return (
    <Suspense>
      <div className="flex flex-col min-h-screen">
        <GlobalLoadingBar />
        <div className="flex flex-1">
          {/* 左侧导航栏 */}
          <nav className="w-56 bg-muted/40 border-r flex flex-col py-8 px-4 gap-2 h-screen sticky top-0 left-0">
            {steps.map((step, idx) => (
              <Button
                key={step.key}
                variant={currentStep === step.key ? 'default' : 'ghost'}
                className="justify-start w-full"
                onClick={() => router.push('/?' + step.key)}
                disabled={globalLoading || stepDisabled[idx]}
              >
                {step.label}
              </Button>
            ))}
          </nav>
          {/* 右侧内容区 */}
          <div className="flex-1">
            {content}
          </div>
        </div>
      </div>
    </Suspense>
  )
} 