import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import TopNav from '@/components/navigation/TopNav'
import BottomNav from '@/components/navigation/BottomNav'

/**
 * AppLayout — wraps all authenticated pages.
 * 
 * Usage in any page's layout.jsx inside (app) group:
 * 
 *   import AppLayout from '@/components/layout/AppLayout'
 *   export default function Layout({ children }) {
 *     return <AppLayout>{children}</AppLayout>
 *   }
 */
export default async function AppLayout({ children }) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options))
          } catch {}
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-[#F9F7F2]">
      <TopNav user={user} profile={profile} />
      <main className="pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  )
}
