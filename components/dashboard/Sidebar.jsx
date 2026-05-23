'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import TamboLogo from '@/components/ui/TamboLogo'

const NAV = [
  { href: '/dashboard', label: 'Dashboard',     icon: '⊞' },
  { href: '/cv',        label: 'CV Optimizer',  icon: '📄' },
  { href: '/skill-gap', label: 'Skill Gap',     icon: '🧩', disabled: true },
  { href: '/interview', label: 'Mock Interview', icon: '🎤', disabled: true },
]

export default function Sidebar({ displayName, email }) {
  const pathname = usePathname()
  const router   = useRouter()
  const supabase = createClient()

  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#124136] fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/">
          <TamboLogo variant="dark" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(item => {
          const active =
            item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname.startsWith(item.href)

          if (item.disabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl opacity-35 cursor-not-allowed select-none"
              >
                <span className="w-5 text-center text-sm">{item.icon}</span>
                <span className="text-sm text-white/70">{item.label}</span>
                <span className="ml-auto text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">
                  Soon
                </span>
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                active
                  ? 'bg-white/15 text-white font-semibold'
                  : 'text-white/60 hover:bg-white/8 hover:text-white font-medium'
              }`}
            >
              <span className="w-5 text-center text-sm">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="px-3 pb-5 pt-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#C89B4C]/20 border border-[#C89B4C]/40 flex items-center justify-center text-xs font-bold text-[#C89B4C] shrink-0">
            {initials || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{displayName}</p>
            <p className="text-xs text-white/40 truncate">{email}</p>
          </div>
          <button
            onClick={handleSignOut}
            title="Keluar"
            className="text-white/30 hover:text-red-400 transition-colors shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
