"use client"
import React, { useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import IdeationStep from './components/IdeationStep'
import LoglineStep from './components/LoglineStep'
import CharacterStep from './components/CharacterStep'
import ActsStep from './components/ActsStep'
import FinalScriptStep from './components/FinalScriptStep'
import SceneStep from "@/app/components/SceneStep";

const steps = [
  { key: 'ideation', label: 'Ideation' },
  { key: 'logline', label: 'Logline' },
  { key: 'characters', label: 'Characters' },
  { key: 'acts', label: 'Three-Act Structure' },
  { key: 'scene', label: 'Scene' },
  { key: 'final', label: 'Final Script' },
]

export default function MainPage() {
  const params = useSearchParams()
  const router = useRouter()

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
    <div className="flex min-h-screen">
      {/* 左侧导航栏 */}
      <nav className="w-56 bg-muted/40 border-r flex flex-col py-8 px-4 gap-2 h-screen sticky top-0 left-0">
        {steps.map((step) => (
          <Button
            key={step.key}
            variant={currentStep === step.key ? 'default' : 'ghost'}
            className="justify-start w-full"
            onClick={() => router.push('/?' + step.key)}
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
  )
}
