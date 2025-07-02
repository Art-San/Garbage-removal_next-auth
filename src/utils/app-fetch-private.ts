const baseUrl = 'http://localhost:3000/'

// import { fullSession } from '@/model/session'

// export const appFetchPrivate = async (
//   url: string,
//   options?: { json?: unknown }
// ) => {
//   const { token, refreshAccessToken } = fullSession()

//   let accessToken = token || null

//   if (!accessToken) {
//     accessToken = await refreshAccessToken()
//   }

//   const response = await fetch(`${baseUrl}${url}`, {
//     method: options?.json ? 'POST' : 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`
//     },
//     body: options?.json ? JSON.stringify(options.json) : undefined
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     throw new Error(data.error || 'Ошибка запроса')
//   }

//   return { data, response }
// }

export const appFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const { token, refreshAccessToken } = useSession()

  let accessToken = token

  if (!accessToken) {
    accessToken = await refreshAccessToken()
  }

  const headers = new Headers(options?.headers || {})
  headers.set('Authorization', `Bearer ${accessToken}`)
  headers.set('Content-Type', 'application/json')

  const response = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers
  })

  if (response.status === 401) {
    // Попробуем обновить токен
    const newToken = await refreshAccessToken()

    if (newToken) {
      // Повторяем запрос с новым токеном
      headers.set('Authorization', `Bearer ${newToken}`)

      const retryResponse = await fetch(url, {
        ...options,
        headers
      })

      if (retryResponse.ok) {
        return (await retryResponse.json()) as T
      }
    }

    throw new Error('Unauthorized')
  }

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'API request failed')
  }

  return (await response.json()) as T
}
