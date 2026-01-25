import { http } from './http'

type LoginResponse = {
  access_token: string
  refresh_token: string
}

export async function login(username: string, password: string) {
  const { data } = await http.post<LoginResponse>(
    '/autenticacao/login',
    { username, password }
  )
  return data
}

export async function refresh(refreshToken: string) {
  const { data } = await http.put<LoginResponse>(
    '/autenticacao/refresh',
    null,
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  )

  return data
}