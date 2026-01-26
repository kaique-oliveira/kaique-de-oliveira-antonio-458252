import { describe, it, expect, vi } from 'vitest'
import { petsFacade } from '../pets.facade'
import { petsService } from '../../../../shared/api/pets.service'

vi.spyOn(petsService, 'list').mockResolvedValue({
  data: {
    content: [{ id: 1, nome: 'Pet', raca: 'SRD', idade: 1 }],
    total: 1,
    page: 1,
    pageCount: 1,
  },
} as any)

describe('pets.facade', () => {
  it('should update state after load', async () => {
    const states: any[] = []

    const sub = petsFacade.pets$.subscribe((state) => {
      states.push(state)
    })

    await petsFacade.load(1, '')

    const finalState = states.at(-1)

    expect(finalState.loading).toBe(false)
    expect(finalState.items).toHaveLength(1)
    expect(finalState.items[0].nome).toBe('Pet')

    sub.unsubscribe()
  })
})
