import { describe, it, expect, vi } from 'vitest'
import { listPets } from '../pets.service'
import { http } from '../http'

vi.mock('../http')

describe('pets.service', () => {
  it('should list pets', async () => {
    ;(http.get as any).mockResolvedValue({
      data: { content: [{ id: 1, nome: 'Pet' }] },
    })

    const data = await listPets(1, '')

    expect(data.content).toHaveLength(1)
    expect(data.content[0].nome).toBe('Pet')
  })
})