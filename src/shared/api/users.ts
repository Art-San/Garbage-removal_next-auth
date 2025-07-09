import { authorizedApiClient } from './client'

export interface User {
  id: number
  email: string
  password: string
  name: string
  refreshToken: string
  role: string
  createdAt: string
}

export const getUsers = async (): Promise<User[]> => {
  return authorizedApiClient<User[]>({
    url: '/private/users'
  })
}

export const createUser = async (title: string): Promise<User> => {
  return authorizedApiClient<User>({
    url: '/private/users',
    method: 'POST',
    json: { title }
  })
}

export const deleteUser = async (id: number): Promise<void> => {
  return authorizedApiClient({
    url: `/private/users/${id}`,
    method: 'DELETE'
  })
}

export const changeRoleUser = async (
  id: number,
  newRole: string
): Promise<User> => {
  return authorizedApiClient<User>({
    url: `/private/users/${id}`,
    method: 'PATCH',
    json: { role: newRole }
  })
}
