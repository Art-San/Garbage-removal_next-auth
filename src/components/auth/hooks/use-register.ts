import { useMutation } from '@tanstack/react-query'
// import { useSession } from '@/model/session'
// import { useRouter } from 'next/navigation'
import { register } from '@/paromov/api/auth'
import { FormLoginData } from '../login-form'
import { appSessionStore } from '@/paromov/session'

export function useRegister() {
  // const session = useSession()
  // const router = useRouter()

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: (data: FormLoginData) => register(data.email, data.password),
    // appFetch('api/register', { json: data }),

    onSuccess(data) {
      console.log(78, data)
      appSessionStore.setSessionToken(data.token)
      // session.login(data.token)
      // router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Произошла ошибка при входе:', error)
    }
  })

  const errorMessage = isError ? error.message : undefined

  return { mutate, isPending, errorMessage }
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
