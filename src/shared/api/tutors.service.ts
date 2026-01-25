import { http } from './http'

export type Tutor = {
  id: number
  nome: string
  email: string
  telefone?: string | null
  foto?: {
    url: string
  } | null
}

export type TutorsListParams = {
  page?: number
  size?: number
  nome?: string
}

export type TutorsResponse = {
  content: Tutor[]
  total: number
  page: number
  pageCount: number
}

export type CreateTutorInput = {
  nome: string
  email: string
  telefone?: string | null
}

export const tutorsService = {
  list(params?: TutorsListParams) {
    return http.get<TutorsResponse>('/v1/tutores', { params })
  },

  getById(id: number) {
    return http.get<Tutor>(`/v1/tutores/${id}`)
  },

  create(data: CreateTutorInput) {
    return http.post<Tutor>('/v1/tutores', data)
  },

  update(id: number, data: CreateTutorInput) {
    return http.put<Tutor>(`/v1/tutores/${id}`, data)
  },

  remove(id: number) {
    return http.delete<void>(`/v1/tutores/${id}`)
  },

  uploadPhoto(tutorId: number, file: File) {
    const formData = new FormData()
    formData.append('foto', file)

    return http.post(`/v1/tutores/${tutorId}/fotos`, formData)
  },
}