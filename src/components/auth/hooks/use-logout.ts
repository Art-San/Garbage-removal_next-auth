import { useMutation } from '@tanstack/react-query'

import { useRouter } from 'next/navigation'
import { appFetch } from '@/utils/api'

export function useLogout() {
  const router = useRouter()

  const {
    mutate: logout,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => appFetch('api/logout', { json: { logout: 'yes' } }),
    onSuccess() {
      router.push('/')
    },
    onError: (error) => {
      // toast(`Произошла ошибка при входе: `)
      console.error('Произошла ошибка при выходе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { logout, isPending, errorMessage }
}
