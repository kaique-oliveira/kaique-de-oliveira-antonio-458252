import { http } from './http'

export type Pet = {
  id: number
  nome: string
  raca: string
  idade: number | null
  foto?: {
    url: string
  } | null
}

type PetsResponse = {
  content: Pet[]
  total: number
  page: number
  pageCount: number
}

export async function listPets(page = 1, search = '') {
  const { data } = await http.get<PetsResponse>('/v1/pets', {
    params: {
      page,
      size: 10,
      nome: search,
    },
  })

  return data
}