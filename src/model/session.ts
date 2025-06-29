'use client'
import { createGStore } from 'create-gstore'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

type Session = {
  userId: string
  email: string
  exp: number
  iat: number
}

const TOKEN_KEY = 'token'

let refreshTokenPromise: Promise<string | null> | null = null

export const useSession = createGStore(() => {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

  const login = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  const session = token ? jwtDecode<Session>(token) : null

  const refreshToken = async () => {
    if (!token) return null

    const decoded = jwtDecode<Session>(token)

    // Проверяем, просрочен ли токен
    if (decoded.exp < Date.now() / 1000) {
      if (!refreshTokenPromise) {
        refreshTokenPromise = fetch('/api/auth/refresh')
          .then((res) => res.json())
          .then((data) => {
            if (data.accessToken) {
              login(data.accessToken)
              return data.accessToken
            } else {
              logout()
              return null
            }
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      const newToken = await refreshTokenPromise

      if (newToken) {
        return newToken
      } else {
        return null
      }
    }

    return token
  }

  return { refreshToken, login, logout, session }
})
