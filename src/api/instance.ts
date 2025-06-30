// src/api/instance.ts
import createFetchClient from 'openapi-fetch'
import createClient from 'openapi-react-query'
import { CONFIG } from '@/config/config'
import { useSession } from '@/model/session'
import { ApiPaths } from '.'

export const publicFetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL
})

export const publicRqClient = createClient(publicFetchClient)

export const fetchClient = createFetchClient<ApiPaths>({
  baseUrl: CONFIG.API_BASE_URL
})

export const rqClient = createClient(fetchClient)

fetchClient.use({
  async onRequest({ request }) {
    const token = await useSession.getState().refreshToken()

    if (token) {
      request.headers.set('Authorization', `Bearer ${token}`)
    } else {
      return new Response(
        JSON.stringify({
          code: 'NOT_AUTHORIZED',
          message: 'You are not authorized to access this resource'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
  }
})
