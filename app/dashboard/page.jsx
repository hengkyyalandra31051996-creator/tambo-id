import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
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
  const cvScore     = lastCV ? Number(lastCV.score) : null

  const now     = new Date()
  const days    = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu']
  const months  = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Ags','Sep','Okt','Nov','Des']
  const dateStr = `${days[now.getDay()]} · ${now.getDate()} ${months[now.getMonth()]} · ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} WIB`

  const scoreGapToTop = cvScore ? Math.max(0, 85 - cvScore) : null

  return (
    <div className="flex min-h-screen bg-[#F4EFE3]">
      <Sidebar displayName={displayName} email={user.email ?? ''} />

      <main className="flex-1 md:ml-64 pb-24 md:pb-8">

        {/* ── Top bar ──────────────────────────────── */}
        <div className="sticky top-0 z-20 bg-[#F4EFE3]/90 backdrop-blur border-b border-[#E5E0D8]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
            <div className="flex-1 max-w-sm">
              <div className="flex items-center gap-2 bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-sm text-[#5E6B53]">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-[#5E6B53]/50 text-xs">Cari lowongan, skill, atau perusahaan…</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-8 h-8 rounded-xl bg-white border border-[#E5E0D8] flex items-center justify-center text-[#5E6B53] hover:bg-[#F4EFE3] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-2 bg-white border border-[#E5E0D8] rounded-xl px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-[#1B4332] flex items-center justify-center text-[9px] font-bold text-[#FAF6EC]">
                  {firstName[0]?.toUpperCase() || '?'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-semibold text-[#1A1A1A] leading-none">{firstName}</p>
                  <p className="text-[10px] text-[#5E6B53] leading-none mt-0.5">Fresh Grad · UI</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-5">

          {/* ── Hero card (2-col) ─────────────────── */}
          <div className="bg-[#1B4332] rounded-3xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: greeting + CTA */}
              <div className="p-6 sm:p-8">
                <p className="text-xs text-white/40 font-medium mb-3">
                  ● {dateStr}
                </p>
                <p className="text-white/60 text-sm mb-1">Selamat pagi, {firstName}.</p>
                <h1 className="font-display text-2xl sm:text-3xl font-light text-white/95 leading-snug mb-4">
                  Hari ini, kita rapikan
                  {cvScore
                    ? <> bagian <span className="italic text-[#B89858]">pengalaman</span> dulu.</>
                    : <> <span className="italic text-[#B89858]">CV-mu</span> bareng.</>
                  }
                </h1>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  {cvScore
                    ? `Ada 4 bullet di section "Pengalaman" yang belum punya angka konkret. Estimasi perbaikan: 15 menit. CV-mu bisa naik dari ${cvScore} ke ${Math.min(cvScore + 8, 100)}.`
                    : 'Upload CV kamu dan Tambo analisis dalam 15 detik — temukan 4 bagian terbesar yang bisa dirapikan.'
                  }
                </p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href="/cv"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B89858] hover:bg-[#a8883e] text-[#1B4332] text-sm font-bold rounded-xl transition-all"
                  >
                    {cvScore ? 'Lanjutkan perbaikan CV →' : 'Upload CV sekarang →'}
                  </Link>
                  <button className="px-5 py-2.5 text-white/60 hover:text-white/90 text-sm font-medium rounded-xl border border-white/10 hover:border-white/20 transition-all">
                    Nanti saja
                  </button>
                </div>
              </div>

              {/* Right: task list + projection */}
              <div className="border-t lg:border-t-0 lg:border-l border-white/10 p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                    Bagian yang dikerjakan
                  </p>
                  <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                    4 bullet
                  </span>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { num: 1, task: 'Halaman utama → angka completion rate', tag: 'Belum ada angka' },
                    { num: 2, task: 'Aplikasi mobile → scope & komponen', tag: 'Generic' },
                    { num: 3, task: 'Prototype testing → outcome', tag: 'Tanpa hasil' },
                    { num: 4, task: 'Skill list → keyword update', tag: 'Outdated tools' },
                  ].map(t => (
                    <div key={t.num} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/50 shrink-0 mt-0.5">
                        {t.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/75 leading-snug">{t.task}</p>
                        <span className="text-[10px] text-white/35">{t.tag}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-white/40">Proyeksi setelah selesai</span>
                  <span className="font-display text-lg italic text-[#B89858] font-light">
                    {cvScore ? Math.min(cvScore + 8, 100) : 81}
                    <span className="text-white/30 text-xs not-italic"> dari {cvScore || 73}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CV Score + Career Journey (side by side) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* CV Score */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 shadow-sm">
              <p className="text-xs font-semibold text-[#5E6B53] uppercase tracking-wider mb-4">CV Score</p>
              {cvScore !== null ? (
                <div className="flex items-center gap-5 mb-5">
                  {/* Ring */}
                  <div className="relative w-24 h-24 shrink-0">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="38" fill="none" stroke="#E5E0D8" strokeWidth="8" />
                      <circle
                        cx="48" cy="48" r="38" fill="none"
                        stroke={cvScore >= 75 ? '#1B4332' : cvScore >= 50 ? '#B89858' : '#8B3E2A'}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${(cvScore / 100) * 239} 239`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-[#1B4332] leading-none">{cvScore}</span>
                      <span className="text-[9px] text-[#5E6B53]">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-display text-lg italic font-light text-[#1A1A1A] leading-snug mb-1">
                      {scoreGapToTop} poin lagi ke{' '}
                      <span className="text-[#B89858]">top 20%.</span>
                    </p>
                    <p className="text-xs text-[#5E6B53] leading-relaxed">
                      Recruiter biasanya skip CV di bawah 80. Yuk benerin bareng.
                    </p>
                  </div>
                </div>
              ) : (
                <Link href="/cv" className="flex items-center justify-center py-8 text-center">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-[#1B4332]/8 flex items-center justify-center text-2xl mx-auto mb-3">📄</div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">Upload CV untuk melihat skor</p>
                  </div>
                </Link>
              )}
              {cvScore !== null && (
                <div className="space-y-2">
                  {[
                    { label: 'Format & struktur', val: Math.min(cvScore + 19, 100) },
                    { label: 'ATS keywords',       val: Math.max(cvScore - 5, 0) },
                    { label: 'Quantified results', val: Math.max(cvScore - 22, 0) },
                    { label: 'Portfolio link',     val: Math.max(cvScore - 25, 0) },
                  ].map(b => (
                    <div key={b.label} className="flex items-center gap-3">
                      <span className="text-[10px] text-[#5E6B53] w-28 shrink-0">{b.label}</span>
                      <div className="flex-1 bg-[#E5E0D8] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-1.5 rounded-full transition-all duration-700"
                          style={{
                            width: `${b.val}%`,
                            background: b.val >= 80 ? '#1B4332' : b.val >= 60 ? '#B89858' : '#8B3E2A',
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-[#5E6B53] w-6 text-right">{b.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Career Journey */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <p className="text-xs font-semibold text-[#5E6B53] uppercase tracking-wider">Career Journey</p>
                <span className="text-[10px] bg-[#B89858]/12 text-[#7A5010] px-2.5 py-1 rounded-full font-semibold">
                  Target: 60 hari
                </span>
              </div>

              <p className="font-display text-xl italic font-light text-[#1A1A1A] mb-5">
                Kamu di stage{' '}
                <span className="text-[#B89858]">{lastCV ? 'Portfolio.' : 'CV.'}</span>
              </p>

              {/* Steps */}
              <div className="flex items-center justify-between mb-5">
                {[
                  { label: 'Profil',    icon: '👤', done: true },
                  { label: 'CV',        icon: '📄', done: !!lastCV, active: !lastCV },
                  { label: 'Portfolio', icon: '✦',  done: false, active: !!lastCV },
                  { label: 'Lamar',     icon: '📋', done: false },
                  { label: 'Interview', icon: '🎤', done: false },
                  { label: 'Offer',     icon: '⭐', done: false },
                ].map((s, i, arr) => (
                  <div key={s.label} className="flex items-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                        s.done
                          ? 'bg-[#1B4332] text-white'
                          : s.active
                          ? 'bg-[#B89858] text-white ring-4 ring-[#B89858]/20'
                          : 'bg-[#F4EFE3] text-[#5E6B53]/50 border border-[#E5E0D8]'
                      }`}>
                        {s.done ? '✓' : s.icon}
                      </div>
                      <p className={`text-[9px] whitespace-nowrap ${
                        s.done ? 'text-[#1B4332] font-semibold' :
                        s.active ? 'text-[#B89858] font-semibold' :
                        'text-[#5E6B53]/40'
                      }`}>{s.label}</p>
                      {s.active && (
                        <span className="text-[8px] text-[#B89858] font-semibold -mt-0.5">SEKARANG</span>
                      )}
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-5 h-0.5 mx-1 mb-4 ${s.done ? 'bg-[#1B4332]' : 'bg-[#E5E0D8]'}`} />
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-[#F4EFE3] rounded-xl px-4 py-3 flex items-start gap-3">
                <span className="text-base">✦</span>
                <div>
                  <p className="text-xs font-semibold text-[#1A1A1A]">
                    {lastCV ? 'Setelah CV beres, kita unlock stage Portfolio.' : 'Upload CV untuk unlock stage berikutnya.'}
                  </p>
                  <p className="text-xs text-[#5E6B53] mt-0.5">1 case study cukup buat mulai.</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── 3-column bottom ─────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pb-4">

            {/* Career Match */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-[#1A1A1A]">Career Match</p>
                <Link href="/dashboard" className="text-[10px] text-[#1B4332] font-medium hover:underline">Segera →</Link>
              </div>
              <div className="space-y-3 opacity-60 pointer-events-none">
                {[
                  { co: 'T', name: 'Tokopedia', role: 'Junior UI/UX', loc: 'Jakarta · Hybrid', match: 92 },
                  { co: 'R', name: 'Ruangguru', role: 'Product Designer', loc: 'Jakarta · Onsite', match: 88 },
                  { co: 'D', name: 'Dana',      role: 'UI Designer', loc: 'Remote', match: 81 },
                ].map(j => (
                  <div key={j.role} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1B4332]/10 flex items-center justify-center text-xs font-bold text-[#1B4332] shrink-0">
                      {j.co}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate">{j.role}</p>
                      <p className="text-[10px] text-[#5E6B53]">{j.name} · {j.loc}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      j.match >= 90 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{j.match}%</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#5E6B53] text-center mt-3 opacity-50">Segera tersedia</p>
            </div>

            {/* Tracker Lamaran */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-[#1A1A1A]">Tracker Lamaran</p>
                <span className="text-[10px] text-[#5E6B53]">8 aktif →</span>
              </div>
              <div className="space-y-3 opacity-60 pointer-events-none">
                {[
                  { co: 'T',  name: 'Tokopedia',  role: 'Junior UI/UX',    status: 'Interview HR', color: 'bg-amber-100 text-amber-700', time: 'Besok 14:00' },
                  { co: 'GF', name: 'GoTo Fin',   role: 'UI Designer',     status: 'CV review',    color: 'bg-blue-100 text-blue-700',   time: '3 hari lalu' },
                  { co: 'R',  name: 'Ruangguru',  role: 'Product Designer', status: 'Take-home',   color: 'bg-purple-100 text-purple-700', time: 'Due Jum\'at' },
                ].map(t => (
                  <div key={t.role} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#1B4332]/10 flex items-center justify-center text-[9px] font-bold text-[#1B4332] shrink-0">
                      {t.co}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#1A1A1A] truncate">{t.role}</p>
                      <p className="text-[10px] text-[#5E6B53]">{t.name} · {t.time}</p>
                    </div>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${t.color}`}>
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-[#5E6B53] text-center mt-3 opacity-50">Segera tersedia</p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold text-[#1A1A1A]">Recent · 7 Hari</p>
                {lastCV && <span className="text-[10px] text-[#B89858] font-semibold">↑ +11 poin</span>}
              </div>
              <div className="space-y-3">
                {lastCV ? (
                  <>
                    <ActivityItem
                      dot="bg-[#1B4332]"
                      title="CV re-analyzed"
                      sub={`Skor naik dari ${Math.max(cvScore - 11, 0)} ke ${cvScore}.`}
                      time="Hari ini"
                    />
                    <ActivityItem dot="bg-[#B89858]" title="Akun dibuat" sub="Profil kamu aktif." time="Baru-baru ini" />
                  </>
                ) : (
                  <>
                    <ActivityItem dot="bg-[#B89858]" title="Akun dibuat" sub="Profil kamu aktif." time="Baru-baru ini" />
                    <div className="flex items-center justify-center py-6 text-center">
                      <div>
                        <p className="text-xs font-semibold text-[#1A1A1A] mb-1">Belum ada aktivitas lain.</p>
                        <Link href="/cv" className="text-xs text-[#1B4332] font-medium hover:underline">
                          Upload CV untuk mulai →
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

function ActivityItem({ dot, title, sub, time }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center gap-1 shrink-0">
        <span className={`w-2 h-2 rounded-full ${dot} mt-1`} />
        <div className="w-px h-4 bg-[#E5E0D8]" />
      </div>
      <div className="flex-1 min-w-0 -mt-0.5">
        <p className="text-xs font-semibold text-[#1A1A1A]">{title}
          <span className="font-normal text-[#5E6B53] ml-1">{time}</span>
        </p>
        <p className="text-[10px] text-[#5E6B53] mt-0.5">{sub}</p>
      </div>
    </div>
  )
}
