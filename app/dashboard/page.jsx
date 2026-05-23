import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function DashboardPage() {
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

  let profile = null
  let lastCV  = null

  try {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, avatar_url')
      .eq('id', user.id)
      .maybeSingle()
    profile = data
  } catch {}

  try {
    const { data } = await supabase
      .from('cv_analyses')
      .select('id, score, created_at, filename')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    lastCV = data
  } catch {}

  const displayName = profile?.full_name || user.email?.split('@')[0] || 'Kamu'
  const firstName   = displayName.split(' ')[0]

  const featuresUsed = {
    cv:        !!lastCV,
    skillGap:  false,
    interview: false,
  }

  return (
    <div className="flex min-h-screen bg-[#F7F3EC]">
      <Sidebar displayName={displayName} email={user.email ?? ''} />

      <main className="flex-1 md:ml-64 pb-24 md:pb-8">
        <div className="max-w-2xl mx-auto px-4 pt-8 space-y-6 animate-fade-up">

          {/* Greeting */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#124136]">
                Halo, {firstName} 👋
              </h1>
              <p className="text-[#5E6B53] text-sm mt-1">
                Yuk mulai bangun karir impianmu hari ini.
              </p>
            </div>
            {/* Logout only visible on mobile — sidebar handles desktop */}
            <div className="md:hidden">
              <LogoutButton />
            </div>
          </div>

          {/* Last CV Card */}
          {lastCV ? <LastCVCard cv={lastCV} /> : <EmptyCVCard />}

          {/* Quick Actions */}
          <div>
            <h2 className="text-xs font-semibold text-[#5E6B53] uppercase tracking-wider mb-3">
              Aksi Cepat
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <QuickAction href="/cv"    icon="📄" title="Analisa CV Baru"      desc="Upload & dapat skor sekarang" primary />
              {lastCV && (
                <QuickAction href={`/cv/result/${lastCV.id}`} icon="📊" title="Lihat Hasil Terakhir" desc="Buka analisa CV sebelumnya" />
              )}
              <QuickAction href="/skill-gap" icon="🧩" title="Skill Gap"       desc="Segera hadir" disabled />
              <QuickAction href="/interview" icon="🎤" title="Mock Interview"   desc="Segera hadir" disabled />
            </div>
          </div>

          {/* Progress */}
          <ProgressSection featuresUsed={featuresUsed} />

        </div>
      </main>
    </div>
  )
}

// ─── Sub-components ────────────────────────────────────

function LastCVCard({ cv }) {
  const score = Number(cv.score) || 0
  const { label, barColor, scoreColor } = getScoreStyle(score)
  const date = new Date(cv.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <Link
      href={`/cv/result/${cv.id}`}
      className="block bg-white rounded-2xl border border-[#E8E2D6] p-5 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#5E6B53] mb-1">CV terakhir kamu</p>
          <p className="font-semibold text-[#1A1A1A] truncate">{cv.filename || 'CV kamu'}</p>
          <p className="text-xs text-[#5E6B53] mt-0.5">{date}</p>
        </div>
        <div className="text-right shrink-0">
          <span className={`text-3xl font-black ${scoreColor}`}>{score}</span>
          <p className="text-xs text-[#5E6B53]">/100</p>
          <span className={`mt-1 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
            label === 'Bagus!'
              ? 'bg-green-100 text-green-700'
              : label === 'Lumayan'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {label}
          </span>
        </div>
      </div>
      <div className="mt-4 w-full bg-[#E8E2D6] rounded-full h-2 overflow-hidden">
        <div className={`h-2 rounded-full ${barColor} transition-all`} style={{ width: `${score}%` }} />
      </div>
      <p className="mt-2 text-xs text-[#124136] font-medium text-right">Lihat detail →</p>
    </Link>
  )
}

function EmptyCVCard() {
  return (
    <Link
      href="/cv"
      className="block bg-white rounded-2xl border-2 border-dashed border-[#124136]/25 p-6 text-center hover:border-[#124136]/50 transition-colors"
    >
      <div className="text-4xl mb-3">📄</div>
      <p className="font-semibold text-[#1A1A1A]">Belum ada CV yang dianalisa</p>
      <p className="text-sm text-[#5E6B53] mt-1">
        Upload CV kamu dan Tambo kasih skor + saran perbaikan
      </p>
      <span className="mt-4 inline-block px-4 py-2 bg-[#124136] text-[#FAF6EC] rounded-xl text-sm font-medium">
        Analisa CV Sekarang
      </span>
    </Link>
  )
}

function QuickAction({ href, icon, title, desc, primary, disabled }) {
  const base = `flex flex-col gap-1 p-4 rounded-2xl border transition-all ${
    disabled
      ? 'border-[#E8E2D6] bg-[#F7F3EC] opacity-50 cursor-not-allowed'
      : primary
      ? 'border-[#124136] bg-[#124136] text-[#FAF6EC] hover:bg-[#0e3229] shadow-sm'
      : 'border-[#E8E2D6] bg-white hover:border-[#124136]/30 hover:shadow-sm'
  }`

  const content = (
    <>
      <span className="text-2xl">{icon}</span>
      <p className={`font-semibold text-sm ${primary && !disabled ? 'text-[#FAF6EC]' : 'text-[#1A1A1A]'}`}>{title}</p>
      <p className={`text-xs ${primary && !disabled ? 'text-[#FAF6EC]/70' : 'text-[#5E6B53]'}`}>{desc}</p>
    </>
  )

  if (disabled) return <div className={base}>{content}</div>
  return <Link href={href} className={base}>{content}</Link>
}

function ProgressSection({ featuresUsed }) {
  const features = [
    { key: 'cv',        icon: '📄', label: 'Analisa CV',    done: featuresUsed.cv },
    { key: 'skillGap',  icon: '🧩', label: 'Skill Gap',     done: featuresUsed.skillGap,  soon: true },
    { key: 'interview', icon: '🎤', label: 'Mock Interview', done: featuresUsed.interview, soon: true },
  ]
  const doneCount = features.filter(f => f.done).length

  return (
    <div className="bg-white rounded-2xl border border-[#E8E2D6] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#1A1A1A]">Progres kamu</h2>
        <span className="text-xs text-[#5E6B53]">{doneCount}/3 fitur dipakai</span>
      </div>
      <div className="w-full bg-[#E8E2D6] rounded-full h-2 mb-4 overflow-hidden">
        <div
          className="h-2 rounded-full bg-[#124136] transition-all duration-700"
          style={{ width: `${(doneCount / 3) * 100}%` }}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {features.map(f => (
          <div
            key={f.key}
            className={`rounded-xl p-3 text-center ${
              f.done
                ? 'bg-green-50 border border-green-200'
                : 'bg-[#F7F3EC] border border-[#E8E2D6]'
            }`}
          >
            <div className="text-xl mb-1">{f.icon}</div>
            <p className={`text-xs font-medium ${f.done ? 'text-green-700' : 'text-[#5E6B53]'}`}>{f.label}</p>
            {f.done ? (
              <span className="text-xs text-green-500 font-semibold">✓ Selesai</span>
            ) : f.soon ? (
              <span className="text-xs text-[#5E6B53]/50">Segera</span>
            ) : (
              <span className="text-xs text-[#5E6B53]/50">Belum</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function getScoreStyle(score) {
  if (score >= 75) return { label: 'Bagus!',           barColor: 'bg-green-500', scoreColor: 'text-green-600' }
  if (score >= 50) return { label: 'Lumayan',           barColor: 'bg-yellow-400', scoreColor: 'text-yellow-600' }
  return               { label: 'Perlu Diperbaiki',   barColor: 'bg-red-400',   scoreColor: 'text-red-500' }
}
