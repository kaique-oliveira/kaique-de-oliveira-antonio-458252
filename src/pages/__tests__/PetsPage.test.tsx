import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import PetsPage from '../../modules/pets/pages/PetsPage'

vi.mock('../../modules/pets/facade/usePets', () => ({
  usePets: () => ({
    items: [{ id: 1, nome: 'Pet', raca: 'Teste' }],
    loading: false,
  }),
}))

describe('PetsPage', () => {
  it('should render pets list', () => {
    const { getByText } = render(
      <BrowserRouter>
        <PetsPage />
      </BrowserRouter>
    )

    expect(getByText('Pet')).toBeTruthy()
  })
})
