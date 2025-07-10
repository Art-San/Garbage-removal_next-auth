'use client'
import { appSessionStore } from '@/shared/session'
// import { useRouter } from 'next/navigation'
import { useLogout } from '../auth/model/use-logout'

export default function Header() {
  const session = appSessionStore.useSession()
  const { mutate: logout, isPending } = useLogout()

  async function onSubmit() {
    // localStorage.removeItem('token')
    logout()
  }
  return (
    <header className="p-4 bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1>Дашборд</h1>
        {session ? (
          <>
            <span>Welcome {session?.email}</span>
          </>
        ) : (
          <p>Нет ни кого</p>
        )}

        <button
          onClick={onSubmit}
          // onClick={() => logout()}
          disabled={isPending}
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
