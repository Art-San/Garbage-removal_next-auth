'use client'
import { useState } from 'react'
import { jwtDecode } from 'jwt-decode'

type Session = {
  userId: string
  email: string
  exp: number
  iat: number
}

const TOKEN_KEY = 'token'

let refreshTokenPromise: Promise<string | null> | null = null

export const useSession = () => {
  const [token, setToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY) || ''
    }
    return ''
  })

  const login = (newToken: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, newToken)
    }
    setToken(newToken)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY)
    }
    setToken('')
  }

  const refreshAccessToken = async () => {
    if (!token) return null

    const decoded = jwtDecode<Session>(token)

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

  return { token, login, logout, refreshAccessToken }
}

// 'use client'
// import { createGStore } from 'create-gstore'
// import { jwtDecode } from 'jwt-decode'
// import { useState } from 'react'

// type Session = {
//   userId: string
//   email: string
//   exp: number
//   iat: number
// }

// const TOKEN_KEY = 'token'

// let refreshTokenPromise: Promise<string | null> | null = null

// export const useSession = createGStore(() => {
//   // const [token, setToken] = useState('')
//   const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))

//   const login = (newToken: string) => {
//     localStorage.setItem(TOKEN_KEY, newToken)
//     setToken(newToken)
//   }

//   const logout = () => {
//     localStorage.removeItem(TOKEN_KEY)
//     setToken(null)
//   }

//   const session = token ? jwtDecode<Session>(token) : null

//   const refreshToken = async () => {
//     if (!token) return null

//     const decoded = jwtDecode<Session>(token)

//     // Проверяем, просрочен ли токен
//     if (decoded.exp < Date.now() / 1000) {
//       if (!refreshTokenPromise) {
//         refreshTokenPromise = fetch('/api/auth/refresh')
//           .then((res) => res.json())
//           .then((data) => {
//             if (data.accessToken) {
//               login(data.accessToken)
//               return data.accessToken
//             } else {
//               logout()
//               return null
//             }
//           })
//           .finally(() => {
//             refreshTokenPromise = null
//           })
//       }

//       const newToken = await refreshTokenPromise

//       if (newToken) {
//         return newToken
//       } else {
//         return null
//       }
//     }

//     return token
//   }

//   return { refreshToken, login, logout, session }
// })
