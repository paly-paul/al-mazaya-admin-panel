import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-mazaya-bg">
        <Sidebar />
        <main className="flex-1 md:ml-55 min-h-screen min-w-0 overflow-x-hidden">
          <div className="p-4 pt-16 md:p-8">{children}</div>
        </main>
      </div>
    </AuthGuard>
  )
}
