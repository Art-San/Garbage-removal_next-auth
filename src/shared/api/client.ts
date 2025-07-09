import { CONFIG } from '@/shared/model/config'
import { createApi } from '../lib/create-api'
import { appSessionStore } from '../session'

export const publicApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL
})

let refreshPromise: Promise<string | null> | null = null

const getRefreshToken = () => {
  refreshPromise =
    refreshPromise ??
    publicApiClient<{ token: string }>({
      url: '/refresh',
      method: 'POST'
    })
      .then((result) => {
        appSessionStore.setSessionToken(result.token)
        return result.token
      })
      .catch(() => {
        appSessionStore.removeSession()
        return null
      })
      .finally(() => {
        refreshPromise = null
      })

  return refreshPromise
}

export const authorizedApiClient = createApi({
  baseUrl: CONFIG.API_BASE_URL,
  requestMiddlewares: [
    async (config) => {
      let token = appSessionStore.tokenAtom.get()

      if (!token || appSessionStore.isSessionExpired()) {
        token = await getRefreshToken()
      }

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`
        }
      }
      return config
    }
  ],
  responseMiddlewares: [
    async (response, config) => {
      if (response.status === 401) {
        const token = appSessionStore.getSessionToken()

        if (token) {
          const newToken = await getRefreshToken()
          if (newToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newToken}`
            }
            // TODO поправить багу)
            return fetch(`${config.url}`, config)
          }
        }
        appSessionStore.removeSession()
      }
      return response
    }
  ]
})
