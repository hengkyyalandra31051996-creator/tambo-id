'use client'

import { useState } from 'react'
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
  } else if (fields.password.length < 8) {
    errors.password = 'Password minimal 8 karakter'
  }
  if (!fields.agreed) {
    errors.agreed = 'Kamu perlu menyetujui syarat & ketentuan'
  }
  return errors
}

export default function RegisterPage() {
  const supabase = createClient()

  const [fields, setFields] = useState({ email: '', password: '', agreed: false })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newVal = type === 'checkbox' ? checked : value
    setFields(prev => ({ ...prev, [name]: newVal }))
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
      <div className="min-h-screen bg-[#F4EFE3] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">📬</div>
          <h2 className="text-xl font-bold text-[#1B4332] mb-2">Cek email kamu!</h2>
          <p className="text-[#5E6B53] text-sm leading-relaxed">
            Kami kirim link verifikasi ke{' '}
            <strong className="text-[#1B4332]">{fields.email}</strong>.{' '}
            Klik link-nya untuk aktifkan akun, lalu bisa langsung masuk.
          </p>
          <Link href="/login" className="mt-6 inline-block text-sm text-[#1B4332] font-semibold hover:underline">
            Kembali ke halaman masuk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel (dark, 40%) ─────────────────────── */}
      <div className="hidden lg:flex lg:w-2/5 bg-[#1B4332] flex-col justify-between p-10">
        <Link href="/">
          <TamboLogo variant="dark" />
        </Link>

        <div className="space-y-8">
          <div>
            <p className="font-display text-[2rem] font-light italic text-[#FAFAF8]/90 leading-tight">
              Temukan jalanmu,
            </p>
            <p className="font-display text-[2rem] font-light italic text-[#B89858] leading-tight">
              satu langkah
            </p>
            <p className="font-display text-[2rem] font-light italic text-[#FAFAF8]/90 leading-tight">
              dari sini.
            </p>
          </div>

          {/* Testimonial card */}
          <div className="bg-white/8 border border-white/10 rounded-2xl p-5">
            <p className="text-[#FAFAF8]/80 text-sm leading-relaxed italic">
              &ldquo;Tambo bantu aku nulis CV yang ATS-friendly dan langsung dipanggil interview dalam 2 minggu.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 rounded-full bg-[#B89858]/25 border border-[#B89858]/40 flex items-center justify-center text-sm font-bold text-[#B89858]">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-[#FAFAF8]">Rizky H.</p>
                <p className="text-xs text-[#FAFAF8]/45">Fresh grad · Software Engineer</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 text-[#B89858]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                { l: 'R', bg: '#B8985826', clr: '#B89858' },
                { l: 'A', bg: '#7FB06926', clr: '#7FB069' },
                { l: 'D', bg: '#89B4D126', clr: '#89B4D1' },
              ].map(({ l, bg, clr }) => (
                <div
                  key={l}
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: bg, color: clr, borderColor: '#1B4332' }}
                >
                  {l}
                </div>
              ))}
            </div>
            <p className="text-[#FAFAF8]/50 text-sm">+1.200 fresh grad sudah pakai Tambo</p>
          </div>
        </div>

        <p className="text-[#FAFAF8]/25 text-xs">© 2025 Tambo.id</p>
      </div>

      {/* ── Right panel (cream, 60%) ───────────────────── */}
      <div className="flex-1 bg-[#F4EFE3] flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16 overflow-y-auto">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Link href="/"><TamboLogo variant="light" /></Link>
        </div>

        <div className="w-full max-w-md mx-auto">
          <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-3">
            Buat akun — gratis, tanpa kartu kredit.
          </p>
          <h1 className="font-display text-3xl font-light italic text-[#1B4332] leading-snug mb-2">
            Satu langkah sebelum
          </h1>
          <h1 className="font-display text-3xl font-light italic text-[#1B4332] leading-snug mb-8">
            CV-mu siap dilirik recruiter.
          </h1>

          <GoogleOAuthButton label="Daftar dengan Google" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E5E0D8]" />
            <span className="text-xs text-[#5E6B53]">atau dengan email</span>
            <div className="flex-1 h-px bg-[#E5E0D8]" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Email */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="kamu@email.com"
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all duration-150 ${
                  errors.email
                    ? 'border-red-400 bg-red-50 focus:ring-red-200'
                    : 'border-[#E5E0D8] bg-white focus:ring-[#1B4332]/20 focus:border-[#1B4332]'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span>⚠</span> {errors.email}</p>
              )}
            </div>

            <PasswordInput
              id="password" name="password" label="Password"
              placeholder="Minimal 8 karakter" value={fields.password}
              onChange={handleChange} error={errors.password} autoComplete="new-password"
            />

            {/* T&C Checkbox */}
            <div className="space-y-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={fields.agreed}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-[#1B4332] rounded"
                />
                <span className="text-sm text-[#5E6B53] leading-snug">
                  Saya setuju dengan{' '}
                  <Link href="/terms" className="text-[#1B4332] font-medium hover:underline">
                    Syarat & Ketentuan
                  </Link>{' '}
                  dan{' '}
                  <Link href="/privacy" className="text-[#1B4332] font-medium hover:underline">
                    Kebijakan Privasi
                  </Link>{' '}
                  Tambo.id
                </span>
              </label>
              {errors.agreed && (
                <p className="text-xs text-red-500 flex items-center gap-1 mt-1"><span>⚠</span> {errors.agreed}</p>
              )}
            </div>

            {globalError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-sm text-red-600">{globalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1B4332] hover:bg-[#163829] active:bg-[#112c23] text-[#FAFAF8] font-semibold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm mt-1"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#FAFAF8]/40 border-t-[#FAFAF8] rounded-full animate-spin" />
                  Mendaftar...
                </span>
              ) : (
                'Bikin akun · gratis →'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-[#5E6B53] mt-6">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-[#1B4332] font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>

          <p className="text-center text-xs text-[#5E6B53]/70 mt-4">
            🔒 Data kamu aman. Kami tidak jual info ke siapapun.
          </p>
        </div>
      </div>
    </div>
  )
}
