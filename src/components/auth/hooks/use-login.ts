import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/model/session'
// import { useRouter } from 'next/navigation'
import { appFetch } from '@/utils/api'
import { FormLoginData } from '../login-form'

export function useLogin() {
  const session = useSession()
  // const router = useRouter()
  // const queryClient = useQueryClient()

  const {
    mutate: login,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: (data: FormLoginData) => appFetch('api/login', { json: data }),
    // mutationFn: (data: IAuthForm) => AuthService.login(data), // Взял из TG ьот грузчики, там дальше аксиом стои
    onSuccess(data) {
      session.login(data.accessToken)
      // toast.success('Успешный вход')
      // router.push('/dashboard')
      // queryClient.invalidateQueries({
      //   queryKey: ['users']
      // })
    },
    onError: (error) => {
      // toast(`Произошла ошибка при входе: `)
      console.error('Произошла ошибка при входе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { login, isPending, errorMessage }
}
