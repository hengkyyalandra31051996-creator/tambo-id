'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import TamboLogo from '@/components/ui/TamboLogo'

export default function TopNav({ user, profile }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const displayName = profile?.full_name || user?.email?.split('@')[0] || ''
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <header className="hidden md:block sticky top-0 z-40 bg-[#FAF6EC]/90 backdrop-blur border-b border-[#E8E2D6]">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/">
          <TamboLogo variant="light" />
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6">
          <NavLink href="/dashboard" active={pathname === '/dashboard'}>Dashboard</NavLink>
          <NavLink href="/cv" active={pathname.startsWith('/cv')}>CV</NavLink>
          <NavLink href="/skill-gap" active={pathname.startsWith('/skill-gap')} disabled>
            Skill Gap
          </NavLink>
          <NavLink href="/interview" active={pathname.startsWith('/interview')} disabled>
            Interview
          </NavLink>
        </nav>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-[#E8E2D6]/60 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#124136] text-[#FAF6EC] flex items-center justify-center text-xs font-bold">
              {initials || '?'}
            </div>
            <span className="text-sm font-medium text-gray-700 max-w-[120px] truncate">
              {displayName}
            </span>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMenuOpen(false)}
              />
              <div className="
                absolute right-0 mt-2 w-44 bg-white rounded-2xl border border-gray-100
                shadow-lg z-20 overflow-hidden py-1
              ">
                <Link
                  href="/profil"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                >
                  Profil
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
                >
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, active, disabled, children }) {
  if (disabled) {
    return (
      <span className="text-sm text-gray-300 cursor-default flex items-center gap-1">
        {children}
        <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
          Soon
        </span>
      </span>
    )
  }
  return (
    <Link
      href={href}
      className={`
        text-sm font-medium transition-colors
        ${active ? 'text-[#124136] font-semibold' : 'text-[#5E6B53] hover:text-[#1A1A1A]'}
      `}
    >
      {children}
    </Link>
  )
}
