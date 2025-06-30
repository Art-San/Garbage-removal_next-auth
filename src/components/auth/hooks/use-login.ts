import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from '@/model/session'
import { useRouter } from 'next/navigation'
import { appFetch } from '@/utils/api'
import { FormLoginData } from '../login-form'

export function useLogin() {
  const session = useSession()
  const router = useRouter()
  const queryClient = useQueryClient()

  const {
    mutate: login,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['login user'],
    mutationFn: (data: FormLoginData) => appFetch('api/login', { json: data }),
    // mutationFn: (data: IAuthForm) => AuthService.login(data), // Взял из TG ьот грузчики, там дальше аксиом стои
    onSuccess(data) {
      session.login(data.accessToken)
      // toast.success('Успешный вход')
      router.push('/dashboard')
      queryClient.invalidateQueries({
        queryKey: ['login']
      })
    },
    onError: (error) => {
      // toast(`Произошла ошибка при входе: `)
      console.error('Произошла ошибка при входе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { login, isPending, errorMessage }
}

// import { useSession } from '@/model/session'
// import { useRouter } from 'next/navigation'

// import { FormLoginData } from '../login-form'
// import { publicRqClient } from '@/api/instance'

// export function useLogin() {
//   const router = useRouter()
//   const session = useSession()
//   const loginMutation = publicRqClient.useMutation('post', '/login', {
//     onSuccess(data) {
//       // console.log(456, data)
//       session.login(data.accessToken)
//       // router.push('/dashboard')
//     }
//   })

//   const login = (data: FormLoginData) => {
//     loginMutation.mutate({ body: data })
//   }

//   const errorMessage = loginMutation.isError
//     ? loginMutation.error.message
//     : undefined

//   return {
//     login,
//     isPending: loginMutation.isPending,
//     errorMessage
//   }
// }
