'use client'
// import { useServices } from '@/hooks/useServices'

export default function Dashboard() {
  // const { data, errorMessage } = useServices()

  return (
    <div>
      <h1>Dashboard</h1>

      {/* {data && (
        <ul className="space-y-4 p-4">
          {data.map((user) => (
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
      {errorMessage && <p className=" text-red-500">{errorMessage}</p>} */}
    </div>
  )
}
