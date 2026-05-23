'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import FormField from '@/components/auth/FormField'
import PasswordInput from '@/components/auth/PasswordInput'
import GoogleOAuthButton from '@/components/auth/GoogleOAuthButton'
import TamboLogo from '@/components/ui/TamboLogo'

function validate(fields) {
  const errors = {}
  if (!fields.name) {
    errors.name = 'Nama wajib diisi'
  } else if (fields.name.trim().length < 2) {
    errors.name = 'Nama minimal 2 karakter'
  }
  if (!fields.email) {
    errors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Format email tidak valid'
  }
  if (!fields.password) {
    errors.password = 'Password wajib diisi'
  } else if (fields.password.length < 8) {
    errors.password = 'Password minimal 8 karakter'
  }
  if (!fields.confirmPassword) {
    errors.confirmPassword = 'Konfirmasi password wajib diisi'
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Password tidak cocok'
  }
  return errors
}

export default function RegisterPage() {
  const supabase = createClient()

  const [fields, setFields] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

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
    const { error } = await supabase.auth.signUp({
      email: fields.email,
      password: fields.password,
      options: {
        data: { full_name: fields.name.trim() },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)

    if (error) {
      setGlobalError(
        error.message.includes('already registered')
          ? 'Email ini sudah terdaftar. Coba masuk atau reset password.'
          : 'Pendaftaran gagal. Coba lagi sebentar.'
      )
      return
    }
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-xl font-bold text-[#124136] mb-2">Cek email kamu!</h2>
          <p className="text-[#5E6B53] text-sm leading-relaxed">
            Kami kirim link verifikasi ke{' '}
            <strong className="text-[#124136]">{fields.email}</strong>.{' '}
            Klik link-nya untuk aktifkan akun, lalu bisa langsung masuk.
          </p>
          <Link href="/login" className="mt-6 inline-block text-sm text-[#124136] font-semibold hover:underline">
            Kembali ke halaman masuk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (dark, hidden on mobile) ───────── */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#124136] flex-col justify-between p-10">
        <Link href="/">
          <TamboLogo variant="dark" />
        </Link>

        <div>
          <p className="font-display text-[1.65rem] font-light italic text-[#FAF6EC]/90 leading-snug mb-8">
            &ldquo;Tambo bantu aku nulis CV yang ATS-friendly dan langsung dipanggil interview.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                { l: 'R', bg: '#C89B4C26', clr: '#C89B4C' },
                { l: 'A', bg: '#7FB06926', clr: '#7FB069' },
                { l: 'D', bg: '#89B4D126', clr: '#89B4D1' },
              ].map(({ l, bg, clr }) => (
                <div
                  key={l}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: bg, color: clr, borderColor: '#124136' }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-[#FAF6EC]/50 text-sm">+1.200 fresh grad sudah pakai Tambo</p>
          </div>
        </div>

        <p className="text-[#FAF6EC]/25 text-xs">© 2025 Tambo.id</p>
      </div>

      {/* ── Right panel (cream, form) ──────────────────── */}
      <div className="flex-1 bg-[#F7F3EC] flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/"><TamboLogo variant="light" /></Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <p className="text-xs font-semibold text-[#C89B4C] uppercase tracking-widest mb-3">
            Mulai gratis
          </p>
          <h1 className="font-display text-3xl font-light italic text-[#124136] mb-8">
            Bikin akun kamu
          </h1>

          <GoogleOAuthButton label="Daftar dengan Google" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E8E2D6]" />
            <span className="text-xs text-[#5E6B53]">atau dengan email</span>
            <div className="flex-1 h-px bg-[#E8E2D6]" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormField
              id="name" name="name" type="text" label="Nama lengkap"
              placeholder="Nama kamu" value={fields.name} onChange={handleChange}
              error={errors.name} autoComplete="name" required
            />
            <FormField
              id="email" name="email" type="email" label="Email"
              placeholder="kamu@email.com" value={fields.email} onChange={handleChange}
              error={errors.email} autoComplete="email" required
            />
            <PasswordInput
              id="password" name="password" label="Password"
              placeholder="Minimal 8 karakter" value={fields.password}
              onChange={handleChange} error={errors.password} autoComplete="new-password"
            />
            <PasswordInput
              id="confirmPassword" name="confirmPassword" label="Ulangi password"
              placeholder="Ketik ulang password" value={fields.confirmPassword}
              onChange={handleChange} error={errors.confirmPassword} autoComplete="new-password"
            />

            {globalError && (
              <div className="bg-[#8B3E2A]/8 border border-[#8B3E2A]/20 rounded-xl px-4 py-3">
                <p className="text-sm text-[#8B3E2A]">{globalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#124136] hover:bg-[#0e3229] active:bg-[#0a2920] text-[#FAF6EC] font-semibold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#FAF6EC]/40 border-t-[#FAF6EC] rounded-full animate-spin" />
                  Mendaftar...
                </span>
              ) : (
                'Bikin akun · gratis →'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#5E6B53] mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#124136] font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
