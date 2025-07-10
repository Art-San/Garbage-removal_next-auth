import { AuthLayout } from '@/features/auth/ui/auth-layout'
import { LoginForm } from '@/features/auth/ui/login-form'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <AuthLayout
        form={<LoginForm />}
        title="Вход в систему: art@san.com"
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
