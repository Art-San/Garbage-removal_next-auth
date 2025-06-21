'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/utils/hash.util'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      // Проверка уникальности почты
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        setError('Пользователь с такой почтой уже существует')
        return
      }

      // Хэширование пароля
      const hashedPassword = await hashPassword(password)

      // Создание пользователя
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword
        }
      })

      router.push('/auth/login') // Перенаправление на авторизацию
    } catch (err) {
      setError('Ошибка при регистрации')
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
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}
