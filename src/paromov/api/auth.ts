import { publicApiClient } from './client'

export interface User {
  username: string
  token: string
}

export const register = async (username: string, password: string) => {
  const response = await publicApiClient<{ token: string }>({
    url: '/register',
    method: 'POST',
    json: {
      username,
      password
    }
  })

  return response
}

export const login = async (username: string, password: string) => {
  const response = await publicApiClient<{ token: string }>({
    url: '/login',
    method: 'POST',
    json: {
      username,
      password
    }
  })

  return response
}

export const logout = async () => {
  const response = await publicApiClient({
    url: '/logout',
    method: 'POST'
  })

  return response
}
