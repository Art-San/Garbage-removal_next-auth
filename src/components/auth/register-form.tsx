'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { useForm } from 'react-hook-form'
import { use, useState } from 'react'
import { appFetch } from '@/utils/api'

const registerSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email обязателен'
      })
      .email('Неверный email'),
    password: z
      .string({
        required_error: 'Пароль обязателен'
      })
      .min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string().optional()
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают'
  })

export type FormRegisterData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  async function onSubmit(data: FormRegisterData) {
    setLoading(true)
    try {
      const { user } = await appFetch('api/register', { json: data })

      if (user.id) {
        router.push('/users-db')
      } else {
        setErrorMessage('Что то пошло не так')
        // router.push('/')
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

  // const { register, isPending, errorMessage } = useRegister()
  // const onSubmit = form.handleSubmit(register)

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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Подтвердите пароль</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && (
          <p className="text-destructive text-sm">{errorMessage}</p>
        )}

        <Button disabled={loading} type="submit">
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
