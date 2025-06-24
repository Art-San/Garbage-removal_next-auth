'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { appFetch } from '@/utils/api'
import { useState } from 'react'

const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email обязателен'
    })
    .email('Неверный email'),
  password: z
    .string({
      required_error: 'Пароль обязателен'
    })
    .min(6, 'Пароль должен быть не менее 6 символов')
})

export type FormLoginData = z.infer<typeof loginSchema>

export function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm<FormLoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormLoginData) {
    setLoading(true)
    try {
      const { token } = await appFetch('api/login', { json: data })

      if (token) {
        document.cookie = `token=${token}; Path=/; Max-Age=3600;`
        // localStorage.setItem('token', token)
        router.push('/dashboard')
      } else {
        throw new Error('token not generated')
      }
    } catch (error) {
      let message = 'Неизвестная ошибка'

      if (error instanceof Error) {
        message = error.message
      } else if (typeof error === 'string') {
        message = error
      }

      setErrorMessage(message)
    } finally {
      setLoading(false)
    }
  }

  // async function onSubmit(data: FormLoginData) {
  //   setLoading(true)
  //   await appFetch('api/login', { json: data })
  //     .then((user) => {
  //       if (user) {
  //         // const token = generateToken(user.id)
  //         // localStorage.setItem('token', token)
  //         router.push('/dashboard')
  //       } else {
  //         throw new Error('User not found')
  //       }
  //     })
  //     .catch((error) => {
  //       setErrorMessage(error.message)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }

  // const { errorMessage, isPending, login } = useLogin()
  // const onSubmit = form.handleSubmit(login)

  return (
    <Form {...form}>
      <form
        className=" flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="admin@gmail.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="*****" type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button disabled={loading} type="submit">
          Войти
        </Button>
      </form>
    </Form>
  )
}
