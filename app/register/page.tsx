'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    full_name: '', email: '', password: ''
  })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.full_name },
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">tambo<span className="text-[#F97316]">.</span></h1>
          <p className="text-zinc-400 mt-2 text-sm">Mulai perjalanan karirmu</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Buat akun gratis</h2>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400 block mb-1.5">Nama lengkap</label>
              <input
                type="text"
                required
                placeholder="Nama kamu"
                value={form.full_name}
                onChange={e => setForm({...form, full_name: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                           text-white placeholder-zinc-500 focus:outline-none focus:border-[#F97316]
                           transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1.5">Email</label>
              <input
                type="email"
                required
                placeholder="email@kamu.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                           text-white placeholder-zinc-500 focus:outline-none focus:border-[#F97316]
                           transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-zinc-400 block mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="Minimal 8 karakter"
                minLength={8}
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 
                           text-white placeholder-zinc-500 focus:outline-none focus:border-[#F97316]
                           transition-colors text-sm"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97316] hover:bg-[#ea6c10] disabled:opacity-50
                         text-white font-semibold py-3 rounded-xl transition-colors
                         disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#F97316] hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}