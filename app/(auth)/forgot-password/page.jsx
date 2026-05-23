'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import FormField from '@/components/auth/FormField'
import TamboLogo from '@/components/ui/TamboLogo'

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setEmailError('')

    if (!email) {
      setEmailError('Email wajib diisi')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Format email tidak valid')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    setLoading(false)

    // Always show success (don't leak whether email exists)
    if (!error) setSent(true)
    else setSent(true) // same UX intentionally
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">📩</div>
          <h2 className="text-xl font-bold text-[#124136] mb-2">Link terkirim!</h2>
          <p className="text-[#5E6B53] text-sm leading-relaxed">
            Kalau email <strong className="text-[#124136]">{email}</strong> terdaftar, kamu akan terima
            link untuk reset password. Cek juga folder spam ya.
          </p>
          <Link href="/login" className="mt-6 inline-block text-sm text-[#124136] font-semibold hover:underline">
            Kembali ke halaman masuk
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fade-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center">
            <TamboLogo variant="light" />
          </Link>
          <p className="mt-2 text-sm text-[#5E6B53]">Reset password kamu</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E8E2D6] p-8 space-y-5 animate-scale-in anim-delay-1">
          <div className="text-center">
            <div className="text-3xl mb-3">🔑</div>
            <h2 className="text-lg font-semibold text-[#1A1A1A]">Lupa password?</h2>
            <p className="text-sm text-[#5E6B53] mt-1">
              Masukkan email kamu dan kami kirimkan link reset.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <FormField
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="kamu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (emailError) setEmailError('')
              }}
              error={emailError}
              autoComplete="email"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#124136] hover:bg-[#0e3229] active:bg-[#0a2920] text-[#FAF6EC] font-semibold text-sm transition-all duration-150 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#FAF6EC]/40 border-t-[#FAF6EC] rounded-full animate-spin" />
                  Mengirim...
                </span>
              ) : (
                'Kirim Link Reset'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-[#5E6B53] mt-6">
          Ingat passwordnya?{' '}
          <Link href="/login" className="text-[#124136] font-semibold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
