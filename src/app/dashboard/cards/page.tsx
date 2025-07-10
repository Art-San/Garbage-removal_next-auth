'use client'

import { useServices } from '@/features/services/model/use-get-services'

export default function UsersPrismaDBPage() {
  const { data: users } = useServices()

  // console.log(567, isLoading)

  return (
    <ul className="space-y-4 p-4">
      <h1>Все юзеры из базы</h1>
      <p>Клиентский компонент</p>
      {users ? (
        users.map((user) => (
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
        ))
      ) : (
        <div className="">Нет данных</div>
      )}
    </ul>
  )
}
