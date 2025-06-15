import MainPage from './components/MainPage'
import { Suspense } from 'react'

export default function Page() {
  return (
    <Suspense>
      <MainPage />
    </Suspense>
  )
}
