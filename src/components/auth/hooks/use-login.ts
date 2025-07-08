import { useMutation } from '@tanstack/react-query'
// import { useSession } from '@/model/session'
// import { useRouter } from 'next/navigation'
// import { appFetch } from '@/utils/api'
import { FormLoginData } from '../login-form'
import { login } from '@/paromov/api/auth'
import { appSessionStore } from '@/paromov/session'

export function useLogin() {
  // const session = useSession()
  // const router = useRouter()
  // const queryClient = useQueryClient()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login-user'],
    mutationFn: (data: FormLoginData) => login(data.email, data.password),
    // mutationFn: (data: FormLoginData) => appFetch('api/login', { json: data }),
    // mutationFn: (data: IAuthForm) => AuthService.login(data), // Взял из TG ьот грузчики, там дальше аксиом стои
    onSuccess(data) {
      console.log(78, data.token)
      // session.login(data.token)
      appSessionStore.setSessionToken(data.token)
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

  return { mutate, isPending, errorMessage }
}
