import { getUsers } from '@/prisma-db'
type Product = {
  id: number
  email: string
  password: number
  name: string | null
}

export default async function UsersPrismaDBPage() {
  const users: Product[] = await getUsers()

  return (
    <ul className="space-y-4 p-4">
      {users.map((user) => (
        <li
          key={user.id}
          className="p-4 bg-white shadow-md rounded-lg text-gray-700"
        >
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p>{user.email}</p>
          <p className="text-lg font-medium">{user.password}</p>
        </li>
      ))}
    </ul>
  )
}
