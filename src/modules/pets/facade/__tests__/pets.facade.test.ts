import { describe, it, expect, vi } from 'vitest'
import { petsFacade } from '../pets.facade'
import * as service from '../../../../shared/api/pets.service'


describe('pets.facade', () => {
  it('should update state after load', async () => {
    vi.spyOn(service, 'listPets').mockResolvedValue({
      content: [{ id: 1, nome: 'Pet', raca: '', idade: 1 }],
      total: 1,
      page: 1,
      pageCount: 1,
    } as any)

    await petsFacade.load(1, '')

    petsFacade.pets$.subscribe(state => {
      expect(state.items.length).toBe(1)
    })
  })
})