'use client'

import { useServices } from '@/features/services/model/use-get-services'

export default function UserPage() {
  const { data, isLoading } = useServices()
  console.log(45, isLoading ? 'true' : data)
  return <div>UserPage</div>
}
