import { http } from './http'

export type LoginResponse = {
  access_token: string
  refresh_token: string
}

export async function login(username: string, password: string) {
  const { data } = await http.post<LoginResponse>('/autenticacao/login', { username, password })

  return data
}
