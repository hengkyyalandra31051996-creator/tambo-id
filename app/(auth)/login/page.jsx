'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import FormField from '@/components/auth/FormField'
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

  const [fields, setFields]           = useState({ email: '', password: '' })
  const [errors, setErrors]           = useState({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading]         = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
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
      {/* ── Left panel (cream, form) ───────────────────── */}
      <div className="flex-1 lg:max-w-[60%] bg-[#F7F3EC] flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/"><TamboLogo variant="light" /></Link>
        </div>

        <div className="w-full max-w-md">
          <p className="text-xs font-semibold text-[#C89B4C] uppercase tracking-widest mb-3">
            Selamat datang kembali
          </p>
          <h1 className="font-display text-3xl font-light italic text-[#124136] mb-8">
            Masuk ke akun kamu
          </h1>

          <GoogleOAuthButton label="Masuk dengan Google" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E8E2D6]" />
            <span className="text-xs text-[#5E6B53]">atau dengan email</span>
            <div className="flex-1 h-px bg-[#E8E2D6]" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormField
              id="email" name="email" type="email" label="Email"
              placeholder="kamu@email.com" value={fields.email} onChange={handleChange}
              error={errors.email} autoComplete="email" required
            />

            <div className="space-y-1">
              <PasswordInput
                id="password" name="password" label="Password"
                placeholder="Password kamu" value={fields.password}
                onChange={handleChange} error={errors.password} autoComplete="current-password"
              />
              <div className="text-right">
                <Link href="/forgot-password" className="text-xs text-[#124136] hover:underline font-medium">
                  Lupa password?
                </Link>
              </div>
            </div>

            {globalError && (
              <div className="bg-[#8B3E2A]/8 border border-[#8B3E2A]/20 rounded-xl px-4 py-3">
                <p className="text-sm text-[#8B3E2A]">{globalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#124136] hover:bg-[#0e3229] active:bg-[#0a2920] text-[#FAF6EC] font-semibold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#FAF6EC]/40 border-t-[#FAF6EC] rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                'Masuk →'
              )}
            </button>
          </form>

          <p className="text-sm text-[#5E6B53] mt-6 text-center">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#124136] font-semibold hover:underline">
              Daftar gratis
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right panel (dark, social proof) ──────────── */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#124136] flex-col justify-between p-10">
        <div className="flex justify-end">
          <TamboLogo variant="dark" />
        </div>

        <div className="space-y-8">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '1.200+', label: 'Fresh grad terbantu' },
              { value: '4.8/5', label: 'Rating kepuasan' },
            ].map(stat => (
              <div key={stat.label} className="bg-white/8 rounded-2xl p-4">
                <p className="text-2xl font-bold text-[#C89B4C]">{stat.value}</p>
                <p className="text-xs text-[#FAF6EC]/50 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div>
            <p className="font-display text-[1.5rem] font-light italic text-[#FAF6EC]/90 leading-snug mb-5">
              &ldquo;CV saya langsung dapat respons setelah pakai feedback dari Tambo. Recommended banget!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C89B4C]/25 border border-[#C89B4C]/40 flex items-center justify-center text-sm font-bold text-[#C89B4C]">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FAF6EC]">Rizky H.</p>
                <p className="text-xs text-[#FAF6EC]/45">Fresh grad, Software Engineer</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#FAF6EC]/25 text-xs">© 2025 Tambo.id</p>
      </div>
    </div>
  )
}
