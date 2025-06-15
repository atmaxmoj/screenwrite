import { render, screen, fireEvent } from '@testing-library/react'
import { LoglineForm } from './LoglineForm'

describe('LoglineForm', () => {
  it('renders input and button', () => {
    render(<LoglineForm loading={false} onSubmitAction={() => {}} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('calls onSubmit with idea', () => {
    const fn = jest.fn()
    render(<LoglineForm loading={false} onSubmitAction={fn} />)
    fireEvent.change(screen.getByPlaceholderText(/idea/i), { target: { value: 'test' } })
    fireEvent.click(screen.getByRole('button'))
    expect(fn).toHaveBeenCalledWith('test')
  })
}) 