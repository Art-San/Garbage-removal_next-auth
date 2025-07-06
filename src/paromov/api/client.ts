import { CONFIG } from '@/config/config'
import { createApi } from '../create-api'
import { appSessionStore } from '../session'

export const publicApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL
})

export const authorizedApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL,
  requestMiddlewares: [
    async (config) => {
      const token = appSessionStore.token
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }
  ]
})
