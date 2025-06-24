'use server'

const URL = process.env.BASE_URL

function getApiUrl(path: string) {
  if (typeof window !== 'undefined') {
    // Клиентский режим: используем относительный URL
    return path
  }
  // Серверный режим: подставляем базовый URL
  return `${URL}${path}`
}

export async function checkUser(token: string) {
  const response = await fetch(getApiUrl('/api/check-auth'), {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  console.log(56, response)
}
