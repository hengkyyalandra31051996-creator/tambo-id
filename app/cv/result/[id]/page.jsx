import { redirect, notFound } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import CVAnalysisResult from '@/components/cv/CVAnalysisResult'

export default async function CVResultPage({ params }) {
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

  const { data: row, error } = await supabase
    .from('cv_analyses')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single()

  if (error || !row) notFound()

  const analysis = {
    score: row.score,
    summary: row.summary,
    strengths: row.strengths || [],
    improvements: row.improvements || [],
    atsTips: row.ats_tips || [],
  }

  const score = row.score ?? 0
  const strokeColor = score >= 75 ? '#2D6A4F' : score >= 50 ? '#B89858' : '#8B3E2A'
  const label = score >= 75 ? 'Bagus!' : score >= 50 ? 'Lumayan' : 'Perlu Diperbaiki'
  const r = 44
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ

  const date = new Date(row.created_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#F4EFE3]">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#F4EFE3]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-[#5E6B53] hover:text-[#1B4332] transition-colors">Dashboard</Link>
            <span className="text-[#E5E0D8]">/</span>
            <Link href="/cv" className="text-[#5E6B53] hover:text-[#1B4332] transition-colors">CV Optimizer</Link>
            <span className="text-[#E5E0D8]">/</span>
            <span className="font-semibold text-[#1B4332]">Hasil Analisis</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5E6B53] border border-[#E5E0D8] bg-white px-3 py-1.5 rounded-lg hover:border-[#1B4332]/30 transition-all duration-150">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export PDF
            </button>
            <button className="inline-flex items-center gap-1.5 text-xs font-medium text-[#5E6B53] border border-[#E5E0D8] bg-white px-3 py-1.5 rounded-lg hover:border-[#1B4332]/30 transition-all duration-150">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Bagikan
            </button>
            <Link
              href="/cv"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1B4332] px-3 py-1.5 rounded-lg hover:bg-[#163829] transition-all duration-150"
            >
              Lamar Sekarang →
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-8 items-start">

          {/* Left column — dark hero with score */}
          <div className="lg:col-span-2 lg:sticky lg:top-24 space-y-4">
            <div className="bg-[#1B4332] rounded-3xl p-7 text-white">
              <div className="mb-1">
                <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">Hasil Analisis CV</p>
              </div>
              <p className="text-sm text-white/60 mb-6">
                {row.filename && <span className="font-medium text-white/80">{row.filename} · </span>}
                {date}
              </p>

              {/* Score ring */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative shrink-0">
                  <svg width="104" height="104" viewBox="0 0 104 104" className="rotate-[-90deg]">
                    <circle cx="52" cy="52" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                    <circle
                      cx="52" cy="52" r={r}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth="10"
                      strokeDasharray={circ}
                      strokeDashoffset={offset}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black leading-none" style={{ color: strokeColor }}>{score}</span>
                    <span className="text-xs text-white/40">/100</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-white mb-0.5">{label}</p>
                  {score < 85 && (
                    <p className="text-xs text-white/50">Tinggal {85 - score} poin ke top 20%</p>
                  )}
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="space-y-3">
                {[
                  { label: 'Relevansi Posisi', val: Math.min(100, Math.round(score * 1.15)) },
                  { label: 'ATS Compatibility', val: Math.min(100, Math.round(score * 0.98)) },
                  { label: 'Kualitas Penulisan', val: Math.min(100, Math.round(score * 0.93)) },
                  { label: 'Depth Pengalaman', val: Math.min(100, Math.round(score * 0.97)) },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/60">{item.label}</span>
                      <span className="text-xs font-semibold text-white/80">{item.val}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-1.5 rounded-full bg-[#B89858]" style={{ width: `${item.val}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CV preview placeholder */}
            <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5">
              <p className="text-xs font-semibold text-[#5E6B53] uppercase tracking-widest mb-3">Pratinjau CV</p>
              <div className="space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={`h-2.5 rounded-full bg-[#F4EFE3] ${i === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-full' : 'w-5/6'}`} />
                ))}
              </div>
              <p className="text-xs text-[#5E6B53]/60 text-center mt-4">Preview tersedia setelah CV diupload ulang</p>
            </div>
          </div>

          {/* Right column — suggestion cards */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xs font-semibold text-[#5E6B53] uppercase tracking-widest">Saran & Analisis Lengkap</p>
            </div>

            <CVAnalysisResult analysis={analysis} />

            {/* Bottom CTA */}
            <div className="mt-6 bg-[#1B4332] rounded-2xl p-6 text-center text-white">
              <p className="font-display text-xl font-light italic text-[#FAFAF8] mb-1">
                Mau Tambo perbaiki semua sekaligus?
              </p>
              <p className="text-sm text-white/60 mb-4">
                Upgrade ke Tambo Pro dan dapatkan revisi CV yang sudah langsung bisa kamu kirim.
              </p>
              <button className="px-6 py-2.5 bg-[#B89858] text-[#1B4332] font-bold text-sm rounded-xl hover:bg-[#c89b43] transition-colors">
                Coba Pro — Gratis 7 Hari
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
