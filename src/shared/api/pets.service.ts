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

export type PetsListParams = {
  page?: number
  size?: number
  nome?: string
}

export type PetsResponse = {
  content: Pet[]
  total: number
  page: number
  pageCount: number
}

export type CreatePetInput = {
  nome: string
  raca: string
  idade: number | null
}

export const petsService = {
  list(params?: PetsListParams) {
    return http.get<PetsResponse>('/v1/pets', { params })
  },

  getById(id: number) {
    return http.get<Pet>(`/v1/pets/${id}`)
  },

  create(data: CreatePetInput) {
    return http.post<Pet>('/v1/pets', data)
  },

  update(id: number, data: CreatePetInput) {
    return http.put<Pet>(`/v1/pets/${id}`, data)
  },

  remove(id: number) {
    return http.delete<void>(`/v1/pets/${id}`)
  },
}

export async function uploadPetPhoto(petId: number, file: File) {
  const formData = new FormData()
  formData.append('file', file)

  await http.post(`/v1/pets/${petId}/fotos`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}