import { render, screen, fireEvent } from '@testing-library/react'
import { IdeationForm } from './IdeationForm'
import React from 'react'

describe('LoglineForm', () => {
  it('renders input and button, calls onSubmitAction with idea', () => {
    const onSubmitAction = jest.fn()
    let idea = ''
    const setIdea = (val: string) => { idea = val }
    render(
      <IdeationForm loading={false} idea={idea} action={setIdea} onSubmitAction={onSubmitAction} />
    )
    const input = screen.getByPlaceholderText(/enter your story idea/i)
    fireEvent.change(input, { target: { value: 'my idea' } })
    // 受控组件，需重新渲染
    render(
      <IdeationForm loading={false} idea={'my idea'} action={setIdea} onSubmitAction={onSubmitAction} />
    )
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onSubmitAction).toHaveBeenCalledWith('my idea')
  })

  it('disables button when loading', () => {
    const onSubmitAction = jest.fn()
    const setIdea = jest.fn()
    render(
      <IdeationForm loading={true} idea={''} action={setIdea} onSubmitAction={onSubmitAction} />
    )
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })
}) 