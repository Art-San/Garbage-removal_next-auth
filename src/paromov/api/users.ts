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

export const getTasks = async (): Promise<User[]> => {
  return authorizedApiClient<User[]>({
    url: '/users'
  })
}

export const createTask = async (title: string): Promise<User> => {
  return authorizedApiClient<User>({
    url: '/users',
    method: 'POST',
    json: { title }
  })
}

export const deleteTask = async (id: number): Promise<void> => {
  return authorizedApiClient({
    url: `/users/${id}`,
    method: 'DELETE'
  })
}

export const changeRoleUser = async (
  id: number,
  newRole: string
): Promise<User> => {
  return authorizedApiClient<User>({
    url: `/users/${id}`,
    method: 'PATCH',
    json: { role: newRole }
  })
}
