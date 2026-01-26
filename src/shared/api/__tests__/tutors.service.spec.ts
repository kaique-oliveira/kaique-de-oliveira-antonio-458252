import { describe, it, expect, vi } from 'vitest'
import { http } from '../http'
import { tutorsService } from '../tutors.service'

vi.mock('../http', () => ({
  http: {
    get: vi.fn(),
  },
}))

describe('tutors.service', () => {
  it('should list tutors', async () => {
    ;(http.get as any).mockResolvedValue({
      data: {
        content: [{ id: 1, nome: 'Maria', email: 'maria@email.com' }],
        total: 1,
        page: 1,
        pageCount: 1,
      },
    })

    const response = await tutorsService.list({ page: 1, nome: '' })

    expect(response.data.content).toHaveLength(1)
    expect(response.data.content[0].nome).toBe('Maria')
  })
})
