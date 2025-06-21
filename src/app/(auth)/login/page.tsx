import { AuthLayout } from '@/components/auth/auth-layout'
import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <AuthLayout
        form={<LoginForm />}
        title="Вход в систему"
        description="Введите ваш email и пароль для входа в систему"
        footerText={
          <>
            Нет аккаунта? <Link href={'/register'}>Зарегистрироваться</Link>
          </>
        }
      ></AuthLayout>
    </>
  )
}
