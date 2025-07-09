import { logout } from '@/shared/api/auth'
import { appSessionStore } from '@/shared/session'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const router = useRouter()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logout(),
    // mutationFn: () => appFetch('api/logout', { json: { logout: 'yes' } }),
    onSuccess() {
      appSessionStore.removeSession()
      router.push('/')
    },
    onError: (error) => {
      // toast(`Произошла ошибка при входе: `)
      console.error('Произошла ошибка при выходе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { mutate, isPending, errorMessage }
}
