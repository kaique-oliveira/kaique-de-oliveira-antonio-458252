import axios from 'axios'

export const refreshHttp = axios.create({
  baseURL: 'https://pet-manager-api.geia.vip',
})
