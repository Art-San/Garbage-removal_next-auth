'use client'
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  return (
    <header className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1>Дашборд</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-2 mt-4 text-white bg-red-500 hover:bg-red-800 rounded-md cursor-pointer"
        >
          выйти
        </button>
      </div>
    </header>
  )
}
// import { deleteSession } from '@/lib/session'
// import { redirect } from 'next/navigation'

// const handleLogout = async () => {
//   'use server'
//   console.log(12, 'button')
//   await deleteSession()
//   redirect('/login')
// }

// export default function Header() {
//   return (
//     <header className="p-4 bg-gray-800 text-white">
//       <div className="container mx-auto flex justify-between items-center">
//         <h1>Дашборд</h1>
//         <form action={handleLogout}>
//           <button
//             type="submit"
//             className="px-4 py-2 mt-4 text-white bg-red-500 hover:bg-red-800 rounded-md cursor-pointer"
//           >
//             выйти
//           </button>
//         </form>
//       </div>
//     </header>
//   )
// }
