'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
export default function CreateUser() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch('/react-form/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      })
      if (response.ok) {
        router.push('/users-db')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-96">
      <label className="text-gray-700">
        Email
        <input
          type="text"
          className="block w-full p-2 text-black border rounded bg-white"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="text-gray-700">
        пароль
        <input
          type="text"
          className="block w-full p-2 text-black border rounded bg-white"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label className="text-gray-700">
        имя не обязательно
        <input
          type="text"
          className="block w-full p-2 text-black border rounded bg-white"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button
        type="submit"
        className="block w-full mt-3 p-2 text-white bg-blue-500 rounded disabled:bg-gray-500"
        disabled={loading}
      >
        {loading ? 'Отправляется...' : 'Отправить'}
      </button>
    </form>
  )
}
