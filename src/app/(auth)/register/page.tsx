import { AuthLayout } from '@/components/auth/auth-layout'
import { RegisterForm } from '@/components/auth/register-form'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <>
      <AuthLayout
        form={<RegisterForm />}
        title="Регистрация"
        description="Введите ваш email и пароль для регистрации в системе"
        footerText={
          <>
            Уже есть аккаунта? <Link href={'/login'}>Войти</Link>
          </>
        }
      ></AuthLayout>
    </>
  )
}
