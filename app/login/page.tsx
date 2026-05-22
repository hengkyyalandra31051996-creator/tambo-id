'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ email: '', password: '' })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError('Email atau password salah.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">tambo<span className="text-[#F97316]">.</span></h1>
          <p className="text-zinc-400 mt-2 text-sm">Selamat datang kembali</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Masuk ke akun kamu</h2>

          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="Password kamu"
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
              {loading ? 'Masuk...' : 'Masuk'}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm mt-6">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#F97316] hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}