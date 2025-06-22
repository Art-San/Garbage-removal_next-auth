// import { AuthLayout } from '@/components/auth/auth-layout'
// import { RegisterForm } from '@/components/auth/register-form'
// import Link from 'next/link'

// export default function RegisterPage() {
//   return (
//     <>
//       <AuthLayout
//         form={<RegisterForm />}
//         title="Регистрация"
//         description="Введите ваш email и пароль для регистрации в системе"
//         footerText={
//           <>
//             Уже есть аккаунта? <Link href={'/login'}>Войти</Link>
//           </>
//         }
//       ></AuthLayout>
//     </>
//   )
// }

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    console.log(123, email)
    console.log(124, password)

    setLoading(true)
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      })
      if (!response.ok) {
        setError('Что то пошло не так')
        router.push('/')
      } else {
        router.push('/users-db')
      }
    } catch (error) {
      // setErrorMessage(error)
      console.error(12, 'Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Почта
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : `bg-blue-500 hover:bg-blue-600`
          }`}
        >
          {loading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
      </form>
    </div>
  )
}
