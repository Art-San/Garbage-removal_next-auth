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
    url: '/tasks'
  })
}

export const createTask = async (title: string): Promise<User> => {
  return authorizedApiClient<User>({
    url: '/tasks',
    method: 'POST',
    json: { title }
  })
}

export const deleteTask = async (id: number): Promise<void> => {
  return authorizedApiClient({
    url: `/tasks/${id}`,
    method: 'DELETE'
  })
}

export const toggleTask = async (
  id: number,
  completed: boolean
): Promise<User> => {
  return authorizedApiClient<User>({
    url: `/tasks/${id}`,
    method: 'PATCH',
    json: { completed }
  })
}
