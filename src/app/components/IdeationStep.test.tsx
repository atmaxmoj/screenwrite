import { render, screen } from '@testing-library/react'
import IdeationStep from './IdeationStep'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(''),
  usePathname: () => '/',
}))

describe('IdeationStep', () => {
  it('renders logline form', () => {
    render(<IdeationStep />)
    expect(screen.getByPlaceholderText(/idea/i)).toBeInTheDocument()
    expect(screen.getByText(/generate a logline/i)).toBeInTheDocument()
  })
}) 