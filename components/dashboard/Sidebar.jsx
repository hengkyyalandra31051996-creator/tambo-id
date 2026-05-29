'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import TamboLogo from '@/components/ui/TamboLogo'

const KARIER = [
  { href: '/dashboard',  label: 'Dashboard',        icon: '⊞',  badge: null },
  { href: '/cv',         label: 'CV Optimizer',      icon: '📄', badge: 'Baru' },
  { href: '/career',     label: 'Career Match',      icon: '🎯', disabled: true },
  { href: '/tracker',    label: 'Tracker Lamaran',   icon: '📋', badge: '0', disabled: true },
  { href: '/coach',      label: 'AI Coach',          icon: '🤖', disabled: true },
  { href: '/skill-path', label: 'Skill Path',        icon: '🧩', disabled: true },
]

const KOMUNITAS = [
  { href: '/profil',     label: 'Profil saya',       icon: '👤' },
  { href: '/alumni',     label: 'Cerita alumni',     icon: '📖', disabled: true },
  { href: '/jobs',       label: 'Lowongan kerja',    icon: '💼', disabled: true },
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

  const isActive = (href) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href)

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#1B4332] fixed left-0 top-0 z-30">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <Link href="/">
          <TamboLogo variant="dark" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-5">
        {/* KARIER */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
            Karier
          </p>
          <div className="space-y-0.5">
            {KARIER.map(item => (
              <NavItem key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
        </div>

        {/* KOMUNITAS */}
        <div>
          <p className="px-3 mb-2 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
            Komunitas
          </p>
          <div className="space-y-0.5">
            {KOMUNITAS.map(item => (
              <NavItem key={item.href} item={item} active={isActive(item.href)} />
            ))}
          </div>
        </div>
      </nav>

      {/* Tambo Pro card */}
      <div className="px-3 pb-3">
        <div className="bg-[#B89858]/12 border border-[#B89858]/20 rounded-2xl p-4">
          <p className="text-xs font-semibold text-[#B89858] mb-1">Tambo Pro</p>
          <p className="text-xs text-white/50 leading-snug mb-3">
            Unlock semua fitur premium dan dapatkan review CV prioritas.
          </p>
          <button className="w-full py-2 rounded-xl bg-[#B89858] text-[#1B4332] text-xs font-bold hover:bg-[#c89b43] transition-colors">
            Upgrade · Gratis 7 hari
          </button>
        </div>
      </div>

      {/* User section */}
      <div className="px-3 pb-5 pt-2 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#B89858]/20 border border-[#B89858]/40 flex items-center justify-center text-xs font-bold text-[#B89858] shrink-0">
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

function NavItem({ item, active }) {
  const base = 'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm'

  if (item.disabled) {
    return (
      <div className={`${base} opacity-35 cursor-not-allowed select-none`}>
        <span className="w-5 text-center text-sm">{item.icon}</span>
        <span className="text-white/70 flex-1">{item.label}</span>
        <span className="text-[10px] bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">
          Soon
        </span>
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      className={`${base} ${
        active
          ? 'bg-white/15 text-white font-semibold'
          : 'text-white/60 hover:bg-white/8 hover:text-white font-medium'
      }`}
    >
      <span className="w-5 text-center text-sm">{item.icon}</span>
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
          item.badge === 'Baru'
            ? 'bg-[#B89858]/20 text-[#B89858]'
            : 'bg-white/15 text-white/70'
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  )
}
