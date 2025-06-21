import { Link } from 'lucide-react'
import { AuthLayout } from './auth/auth-layout'
import { RegisterForm } from './auth/register-form'

export default function test() {
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
