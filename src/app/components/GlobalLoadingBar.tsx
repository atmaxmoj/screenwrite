"use client"
import { useScriptStore } from '@/app/application/store/scriptStore'

export default function GlobalLoadingBar() {
  const globalLoading = useScriptStore(s => s.globalLoading)
  if (!globalLoading) return null
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-100 text-yellow-800 text-center py-2 font-medium z-[9999] shadow">
      Generating, please do not refresh the page...
    </div>
  )
} 