import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || 'kamu'

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">tambo<span className="text-[#F97316]">.</span></h1>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <p className="text-zinc-400 text-sm mb-1">Halo, selamat datang 👋</p>
          <h2 className="text-3xl font-bold">Hai, {firstName}!</h2>
          <p className="text-zinc-400 mt-2">Siap optimalkan karir kamu hari ini?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/cv" className="group">
            <div className="bg-zinc-900 border border-zinc-800 hover:border-[#F97316]/50 
                            rounded-2xl p-6 transition-all duration-200 cursor-pointer">
              <div className="w-12 h-12 bg-[#F97316]/10 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-lg font-semibold text-white group-hover:text-[#F97316] transition-colors">
                CV Optimizer
              </h3>
              <p className="text-zinc-400 text-sm mt-1">
                Upload CV kamu dan dapat saran langsung dari AI untuk tingkatkan peluang lolos ATS.
              </p>
              <div className="mt-4">
                <span className="text-[#F97316] text-sm font-medium">Coba sekarang →</span>
              </div>
            </div>
          </Link>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-400">Skill Gap Analyzer</h3>
            <p className="text-zinc-500 text-sm mt-1">
              Tahu skill apa yang kurang untuk posisi yang kamu incar.
            </p>
            <div className="mt-4">
              <span className="text-xs bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full">Coming soon</span>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 opacity-50 cursor-not-allowed">
            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎤</span>
            </div>
            <h3 className="text-lg font-semibold text-zinc-400">Mock Interview</h3>
            <p className="text-zinc-500 text-sm mt-1"></p>