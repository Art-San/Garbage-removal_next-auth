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

  return response
}

export const logout = async () => {
  const response = await publicApiClient({
    url: '/logout',
    method: 'POST'
  })

  return response
}
