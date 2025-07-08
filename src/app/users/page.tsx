'use client'
import { useServices } from '@/hooks/useServices'
export default function UserPage() {
  const { data, isLoading } = useServices()
  console.log(45, isLoading ? 'true' : data)
  return <div>UserPage</div>
}
