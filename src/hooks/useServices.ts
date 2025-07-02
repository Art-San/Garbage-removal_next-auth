import { appFetch } from '@/utils/api'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

// import { useEffect, useState } from 'react'

// const isAuth = true

type User = {
  id: number
  email: string
  password: string
  name: string | null
}

export function useServices() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => appFetch('api/services'),
    // queryFn: () => fetch('api/dashboard'),
    select: (data) => data.data
  })

  const [services, setServices] = useState<User[]>(data)

  useEffect(() => {
    setServices(data)
  }, [data])

  const errorMessage = isError ? error.message : undefined

  return { data: services, isLoading, errorMessage }
}
