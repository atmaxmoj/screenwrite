import { render, screen } from '@testing-library/react'
import CharacterList from './CharacterList'
import type { Character } from '@/app/domain/models/character'

describe('CharacterList', () => {
  const mockCharacters: Character[] = [
    {
      name: 'John', role: 'Protagonist', summary: 'Hero', motivation: 'Justice', flaw: 'Pride', arc: 'Learns humility', voice_style: 'Direct', backstory: 'Lost family'
    }
  ]

  it('renders character info', () => {
    render(<CharacterList characters={mockCharacters} />)
    expect(screen.getByText(/Protagonist: John/i)).toBeInTheDocument()
    expect(screen.getByText(/Hero/)).toBeInTheDocument()
    expect(screen.getByText(/Justice/)).toBeInTheDocument()
    expect(screen.getByText(/Pride/)).toBeInTheDocument()
    expect(screen.getByText(/Learns humility/)).toBeInTheDocument()
    expect(screen.getByText(/Direct/)).toBeInTheDocument()
    expect(screen.getByText(/Lost family/)).toBeInTheDocument()
  })

  it('renders no data message', () => {
    render(<CharacterList characters={[]} />)
    expect(screen.getByText(/no character data/i)).toBeInTheDocument()
  })
}) 