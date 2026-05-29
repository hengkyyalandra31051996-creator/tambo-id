'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/cv', label: 'CV', icon: FileText },
  { href: '/profil', label: 'Profil', icon: User },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    // Only visible on mobile (md: hidden)
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-100 pb-2">
      <div className="flex items-center justify-around h-16 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex flex-col items-center justify-center gap-0.5 flex-1 h-full
                transition-colors duration-150
                ${active ? 'text-[#4F7942]' : 'text-gray-400 hover:text-gray-600'}
              `}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className="transition-all duration-150"
              />
              <span
                className={`text-[10px] font-medium transition-all duration-150 ${
                  active ? 'text-[#4F7942]' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
              {/* Active dot */}
              {active && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#4F7942]" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
