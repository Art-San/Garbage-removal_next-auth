import { publicApiClient } from './client'

export interface User {
  email: string
  token: string
}

export const register = async (email: string, password: string) => {
  const response = await publicApiClient<{ token: string }>({
    url: '/register',
    method: 'POST',
    json: {
      email,
      password
    }
  })

  // if (response.token) {
  //   appSessionStore.setSessionToken(response.token)
  // }

  return response
}

export const login = async (email: string, password: string) => {
  const response = await publicApiClient<{ token: string }>({
    url: '/login',
    method: 'POST',
    json: {
      email,
      password
    }
  })

  // if (response.token) {
  //   appSessionStore.setSessionToken(response.token)
  // }

  return response
}

export const logout = async () => {
  const response = await publicApiClient({
    url: '/logout',
    method: 'POST'
  })

  return response
}
export const refreshToken = async () => {
  const response = await publicApiClient({
    url: '/refresh',
    method: 'POST'
  })

  return response
}
