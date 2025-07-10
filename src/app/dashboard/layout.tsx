import Header from '@/features/header/header'

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
