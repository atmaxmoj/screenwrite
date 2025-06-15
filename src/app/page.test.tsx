import { render, waitFor } from '@testing-library/react'
import MainPage from './page'

// 1. 定义全局 routerMock
const routerMock = {
  replace: jest.fn(),
  push: jest.fn(),
}

jest.mock('next/navigation', () => {
  const actual = jest.requireActual('next/navigation')
  return {
    ...actual,
    useRouter: () => routerMock,
    useSearchParams: () => ({ get: () => null, has: () => false }),
  }
})

describe('MainPage', () => {
  beforeEach(() => {
    routerMock.replace.mockClear()
    routerMock.push.mockClear()
  })

  it('redirects to /?logline if no step param', async () => {
    render(<MainPage />)
    // 2. 等待 useEffect 执行
    await waitFor(() => {
      expect(routerMock.replace).toHaveBeenCalledWith('/?logline')
    })
  })
}) 