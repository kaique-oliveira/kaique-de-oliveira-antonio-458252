import { http } from './http'

type LoginResponse = {
  access_token: string
  refresh_token: string
}

export async function login(email: string, password: string) {
  const { data } = await http.post<LoginResponse>(
    '/autenticacao/login',
    { email, password }
  )
  return data
}

export async function refresh(refreshToken: string) {
  const { data } = await http.put<LoginResponse>(
    '/autenticacao/refresh',
    { refresh_token: refreshToken }
  )
  return data
}