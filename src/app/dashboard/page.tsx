'use client'
import { appFetch } from '@/utils/api'
import { getCookie } from '@/utils/get-cookie.util'
import { useEffect, useState } from 'react'

type User = {
  id: number
  email: string
  password: string
  name: string | null
}
export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  async function fetchData() {
    try {
      const session = getCookie('session')
      console.log(67, session)
      // const response = await fetch('/api/check-auth')

      const response = await fetch('/api/check-auth', {
        headers: {
          Authorization: `Bearer ${session}`
        }
      })

      if (response.ok) {
        const data = await appFetch('api/dashboard')
        setUsers(data)
      }

      // const data = await appFetch('api/check-auth')
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Произошла неизвестная ошибка')
      }
      // console.log(34, error.message)
      // setErrorMessage(error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div>
      <h1>Dashboard</h1>

      {users && (
        <ul className="space-y-4 p-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="p-4 bg-gray-100 shadow-md rounded-lg text-gray-700"
            >
              <h2 className="text-xl font-semibold">
                {user.name || 'Отсутствует'}
              </h2>
              <p className=" text-red-400">{user.email}</p>
              <p className="text-lg font-medium">{user.password}</p>
            </li>
          ))}
        </ul>
      )}
      {errorMessage && <p className=" text-red-500">{errorMessage}</p>}
    </div>
  )
}
