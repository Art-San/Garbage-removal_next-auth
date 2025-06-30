import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/model/session'
import { useRouter } from 'next/navigation'
import { appFetch } from '@/utils/api'
import { FormLoginData } from '../login-form'

export function useRegister() {
  const session = useSession()
  const router = useRouter()

  const {
    mutate: register,
    isPending,
    isError,
    error
  } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: (data: FormLoginData) =>
      appFetch('api/register', { json: data }),

    onSuccess(data) {
      session.login(data.accessToken)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Произошла ошибка при входе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { register, isPending, errorMessage }
}
// export function useRegister() {
//   const navigate = useNavigate()

//   const session = useSession()
//   const registerMutation = publicRqClient.useMutation(
//     'post',
//     '/auth/register',
//     {
//       onSuccess(data) {
//         session.login(data.accessToken)
//         navigate(ROUTES.HOME)
//       }
//     }
//   )

//   const register = (data: ApiSchemas['RegisterRequest']) => {
//     registerMutation.mutate({ body: data })
//   }

//   const errorMessage = registerMutation.isError
//     ? registerMutation.error.message
//     : undefined

//   return {
//     register,
//     isPending: registerMutation.isPending,
//     errorMessage
//   }
// }
