'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { verifyPassword } from '@/utils/hash.util'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        setError('Пользователь не найден')
        return
      }

      const isValid = await verifyPassword(password, user.password)

      if (!isValid) {
        setError('Неверный пароль')
        return
      }

      // Здесь можно установить cookie или JWT, например
      localStorage.setItem('user', JSON.stringify(user)) // Простой пример

      router.push('/dashboard') // Перенаправление на защищённую страницу
    } catch (err) {
      setError('Ошибка при входе')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Вход</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Войти
        </button>
      </form>
    </div>
  )
}
