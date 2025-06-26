import Header from '@/components/header'

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  // const router = useRouter()

  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
