import { CONFIG } from '@/config/config'
import { createApi } from '../create-api'

export const publicApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL
})

export const authorizedApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL
})
