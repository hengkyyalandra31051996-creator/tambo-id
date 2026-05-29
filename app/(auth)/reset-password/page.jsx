'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import PasswordInput from '@/components/auth/PasswordInput'

export default function ResetPasswordPage() {
  const router = useRouter()
  const supabase = createClient()

  const [fields, setFields] = useState({ password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [globalError, setGlobalError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Supabase injects session from URL hash on mount
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // User is in recovery mode — we can now update their password
      }
    })
    return () => listener.subscription.unsubscribe()
  }, [supabase])

  const validate = () => {
    const errs = {}
    if (!fields.password) errs.password = 'Password baru wajib diisi'
    else if (fields.password.length < 8) errs.password = 'Password minimal 8 karakter'
    if (!fields.confirmPassword) errs.confirmPassword = 'Konfirmasi password wajib diisi'
    else if (fields.password !== fields.confirmPassword) errs.confirmPassword = 'Password tidak cocok'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGlobalError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: fields.password })
    setLoading(false)

    if (error) {
      setGlobalError('Gagal reset password. Link mungkin sudah kadaluarsa. Coba minta ulang.')
      return
    }

    setSuccess(true)
    setTimeout(() => router.push('/dashboard'), 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-[#2D4A27] mb-2">Password berhasil diganti!</h2>
          <p className="text-gray-600 text-sm">Mengarahkan ke dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-bold text-[#2D4A27]">tambo</span>
            <span className="text-2xl font-bold text-[#4F7942]">.id</span>
          </Link>
          <p className="mt-2 text-sm text-gray-500">Buat password baru</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <PasswordInput
              id="password"
              name="password"
              label="Password baru"
              placeholder="Minimal 8 karakter"
              value={fields.password}
              onChange={handleChange}
              error={errors.password}
              autoComplete="new-password"
            />
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Ulangi password baru"
              placeholder="Ketik ulang password"
              value={fields.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            {globalError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <p className="text-sm text-red-600">{globalError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-3 rounded-xl
                bg-[#4F7942] hover:bg-[#3d6133] active:bg-[#2D4A27]
                text-white font-semibold text-sm
                transition-all duration-150
                disabled:opacity-60 disabled:cursor-not-allowed shadow-sm
              "
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : (
                'Simpan Password Baru'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
