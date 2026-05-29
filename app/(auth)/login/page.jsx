'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PasswordInput from '@/components/auth/PasswordInput'
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton'
import TamboLogo from '@/components/ui/TamboLogo'

function validate(fields) {
  const errors = {}
  if (!fields.email) {
    errors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Format email tidak valid'
  }
  if (!fields.password) {
    errors.password = 'Password wajib diisi'
  } else if (fields.password.length < 6) {
    errors.password = 'Password minimal 6 karakter'
  }
  return errors
}

export default function LoginPage() {
  const router   = useRouter()
  const supabase = createClient()

  const [fields, setFields]           = useState({ email: '', password: '', remember: false })
  const [errors, setErrors]           = useState({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading]         = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const val = type === 'checkbox' ? checked : value
    setFields(prev => ({ ...prev, [name]: val }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    const newErrors = validate(fields)
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: fields.email,
      password: fields.password,
    })
    setLoading(false)

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        setGlobalError('Email atau password salah. Coba lagi ya.')
      } else if (error.message.includes('Email not confirmed')) {
        setGlobalError('Email belum dikonfirmasi. Cek inbox kamu.')
      } else {
        setGlobalError('Terjadi kesalahan. Coba lagi sebentar.')
      }
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (cream, 40%) ─────────────────── */}
      <div className="flex-1 lg:w-2/5 lg:max-w-[40%] bg-[#F4EFE3] flex flex-col px-6 py-10 sm:px-10 lg:px-12 overflow-y-auto">

        {/* "Belum punya akun?" at top right */}
        <div className="flex items-center justify-between mb-10">
          <Link href="/"><TamboLogo variant="light" /></Link>
          <p className="text-sm text-[#5E6B53]">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#1B4332] font-semibold hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto">
          <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-3">
            Masuk
          </p>
          <h1 className="font-display text-3xl font-light text-[#1A1A1A] leading-snug mb-8">
            Halo lagi.
          </h1>

          <GoogleOAuthButton label="Masuk dengan Google" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E5E0D8]" />
            <span className="text-xs text-[#5E6B53]">ATAU</span>
            <div className="flex-1 h-px bg-[#E5E0D8]" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5E6B53]">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input
                  id="email" name="email" type="email"
                  value={fields.email} onChange={handleChange}
                  placeholder="kamu@email.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all duration-150 ${
                    errors.email
                      ? 'border-red-400 bg-red-50 focus:ring-red-200'
                      : 'border-[#E5E0D8] bg-white focus:ring-[#1B4332]/20 focus:border-[#1B4332]'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span>⚠</span> {errors.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-[#1B4332] hover:underline font-medium">
                  Lupa password?
                </Link>
              </div>
              <PasswordInput
                id="password" name="password"
                placeholder="••••••••••" value={fields.password}
                onChange={handleChange} error={errors.password} autoComplete="current-password"
              />
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" name="remember"
                checked={fields.remember} onChange={handleChange}
                className="w-4 h-4 accent-[#1B4332] rounded"
              />
              <span className="text-sm text-[#5E6B53]">Ingat saya di perangkat ini</span>
            </label>

            {globalError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-sm text-red-600">{globalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1B4332] hover:bg-[#163829] active:bg-[#112c23] text-[#FAFAF8] font-semibold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#FAFAF8]/40 border-t-[#FAFAF8] rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                'Masuk →'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right panel (dark, 60%) ─────────────────── */}
      <div className="hidden lg:flex lg:flex-1 bg-[#1B4332] flex-col justify-between p-12 relative overflow-hidden">
        {/* BG triangle */}
        <div style={{
          position: 'absolute', right: '-5%', top: '-5%',
          width: '55%', height: '70%', opacity: 0.05, pointerEvents: 'none',
        }}>
          <svg viewBox="0 0 300 400" fill="none" style={{ width: '100%', height: '100%' }}>
            <path d="M150 10L295 390H5L150 10Z" fill="white" />
          </svg>
        </div>

        <div className="flex items-center justify-between">
          <TamboLogo variant="dark" />
          <span className="text-xs bg-white/10 text-white/60 px-3 py-1.5 rounded-full border border-white/10">
            ✦ Welcome back
          </span>
        </div>

        <div className="space-y-6 max-w-md">
          <div>
            <p className="font-display text-4xl font-light text-[#FAFAF8]/90 leading-tight mb-2">
              Selamat datang lagi,
            </p>
            <p className="font-display text-4xl font-light italic text-[#B89858] leading-tight mb-5">
              fresh grad.
            </p>
            <p className="text-[#FAFAF8]/50 text-sm leading-relaxed">
              Tambo membantu kamu menemukan bagian CV yang perlu diperkuat — dan memperbaikinya bareng, konkret, dan cepat.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: '📄', title: 'CV Optimizer', desc: 'Skor dan saran konkret dalam 15 detik' },
              { icon: '🎯', title: 'Career Match', desc: 'Lowongan yang cocok dengan profilmu' },
              { icon: '🤖', title: 'AI Coach', desc: 'Latihan interview kapan saja' },
            ].map(f => (
              <div key={f.title} className="bg-white/8 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                <span className="text-lg shrink-0">{f.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#FAFAF8]">{f.title}</p>
                  <p className="text-xs text-[#FAFAF8]/45">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[#FAF6EC]/25 text-xs">© 2026 Tambo.id</p>
      </div>
    </div>
  )
}
