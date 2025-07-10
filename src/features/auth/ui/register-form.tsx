'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useRegister } from '../model/use-register'

import { Button } from '@/shared/ui/kit/button'
import { Input } from '@/shared/ui/kit/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/ui/kit/form'

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
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const { mutate: register, isPending, errorMessage } = useRegister()

  async function onSubmit(data: FormRegisterData) {
    register(data)
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

        <Button disabled={isPending} type="submit">
          {/* <Button disabled={loading} type="submit"> */}
          Зарегистрироваться
        </Button>
      </form>
    </Form>
  )
}
