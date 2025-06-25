const baseUrl = 'http://localhost:3000/'

// export const appFetch = async (
//   url: string,
//   options: RequestInit & { json?: Record<string, unknown> } = {}
// ) => {
//   const response = await fetch(`${baseUrl}${url}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...options.headers
//     },
//     ...options,
//     ...(options.json && {
//       body: JSON.stringify(options.json),
//       method: 'POST'
//     })
//   })

//   const data = await response.json() // Парсим ответ (даже если ошибка)

//   if (!response.ok) {
//     // Бросаем ошибку с текстом из ответа сервера
//     throw new Error(data.error || `HTTP error! status: ${response.status}`)
//   }

//   return data
// }

// utils/api.ts
export const appFetch = async (url: string, options?: { json?: unknown }) => {
  const response = await fetch(`${baseUrl}${url}`, {
    method: options?.json ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: options?.json ? JSON.stringify(options.json) : undefined
  })

  const data = await response.json()

  console.log('data', 345, data)

  if (!response.ok) {
    throw new Error(data.error || 'Ошибка запроса')
  }

  return data
}
