'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navSections = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'AI Briefing', href: '/briefing' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { label: 'Lead Pipeline', href: '/leads' },
      { label: 'Maintenance Tickets', href: '/tickets' },
      { label: 'Facility Services', href: '/services' },
      { label: 'Vendor Registry', href: '/vendors' },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { label: 'Live Chats', href: '/live-chats' },
      { label: 'Reports', href: '/reports' },
    ],
  },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('mazaya_admin_token')
    router.push('/login')
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  const close = () => setIsOpen(false)

  return (
    <>
      {/* Hamburger button — mobile only */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-100 transition-opacity duration-200 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop — mobile only */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{ width: '220px', minWidth: '220px' }}
        className={`h-screen bg-white shadow-sm flex flex-col fixed left-0 top-0 z-40 border-r border-gray-100 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              style={{ backgroundColor: '#005B41' }}
            >
              M
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 leading-tight">Mazaya FM</div>
              <div className="text-xs text-gray-500 leading-tight">Operations Console</div>
            </div>
          </div>

          {/* Close button — mobile only */}
          <button
            className="md:hidden p-1 text-gray-400 hover:text-gray-600"
            onClick={close}
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {navSections.map((section) => (
            <div key={section.label} className="mb-5">
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
                {section.label}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                      style={
                        isActive(item.href)
                          ? { backgroundColor: '#005B41' }
                          : {}
                      }
                    >
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
