import axios from 'axios'
import { refresh } from './auth.service'

let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: any) => void
}[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else p.resolve(token!)
  })
  failedQueue = []
}

export const http = axios.create({
  baseURL: 'https://pet-manager-api.geia.vip',
})

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return http(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw error

        const { access_token, refresh_token } = await refresh(refreshToken)

        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)

        processQueue(null, access_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return http(originalRequest)
      } catch (err) {
        processQueue(err, null)
        localStorage.clear()
        window.location.href = '/login'
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)
