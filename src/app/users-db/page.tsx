import { getUsers } from '@/prisma-db'
type Users = {
  id: number
  email: string
  password: string
  name: string | null
}

export default async function UsersPrismaDBPage() {
  const users: Users[] = await getUsers()

  return (
    <ul className="space-y-4 p-4">
      <h1>Все юзеры из базы</h1>
      <p>Серверный компонент</p>
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
  )
}
