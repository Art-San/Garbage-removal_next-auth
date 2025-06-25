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
      const { user } = await appFetch('api/login', { json: data })

      if (user) {
        // document.cookie = `token=${token}; Path=/; Max-Age=3600;`
        router.push('/dashboard')
      } else {
        throw new Error('LoginForm: not user')
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
