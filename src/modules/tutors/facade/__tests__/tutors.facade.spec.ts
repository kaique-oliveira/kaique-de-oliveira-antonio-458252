import { describe, it, expect, vi } from 'vitest'
import { tutorsFacade } from '../tutors.facade'
import { tutorsService } from '../../../../shared/api/tutors.service'

vi.spyOn(tutorsService, 'list').mockResolvedValue({
  data: {
    content: [{ id: 1, nome: 'Maria', email: 'maria@email.com' }],
    total: 1,
    page: 1,
    pageCount: 1,
  },
} as any)

describe('tutors.facade', () => {
  it('should update state after load', async () => {
    const states: any[] = []

    const sub = tutorsFacade.tutors$.subscribe((state) => {
      states.push(state)
    })

    await tutorsFacade.load(1, '')

    const finalState = states.at(-1)

    expect(finalState.loading).toBe(false)
    expect(finalState.items).toHaveLength(1)
    expect(finalState.items[0].nome).toBe('Maria')

    sub.unsubscribe()
  })
})
