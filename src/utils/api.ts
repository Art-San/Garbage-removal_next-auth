// const baseUrl = 'http://localhost:3000/'

// export const appFetch = async (url: string, options?: { json?: unknown }) => {
//   const response = await fetch(`${baseUrl}${url}`, {
//     method: options?.json ? 'POST' : 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: options?.json ? JSON.stringify(options.json) : undefined
//   })

//   const data = await response.json()

//   if (!response.ok) {
//     throw new Error(data.error || 'Ошибка запроса')
//   }

//   return data
// }
