'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'
import CVLoadingState from '@/components/cv/CVLoadingState'

type Improvement = string | { section: string; issue: string; suggestion: string }

interface Analysis {
  score: number
  summary: string
  strengths: string[]
  improvements: Improvement[]
  ats_tips: string[]
  verdict?: string
}

const scoreColor = (s: number) =>
  s >= 75 ? 'text-green-600' : s >= 50 ? 'text-amber-600' : 'text-red-500'

const scoreBg = (s: number) =>
  s >= 75 ? 'bg-green-500' : s >= 50 ? 'bg-amber-400' : 'bg-red-400'

const scoreLabel = (s: number) =>
  s >= 75 ? 'Bagus!' : s >= 50 ? 'Lumayan' : 'Perlu Diperbaiki'

const scoreLabelClass = (s: number) =>
  s >= 75
    ? 'bg-green-100 text-green-700'
    : s >= 50
    ? 'bg-amber-100 text-amber-700'
    : 'bg-red-100 text-red-700'

export default function CVPage() {
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload')
  const [targetRole, setTargetRole] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [resultId, setResultId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [fileName, setFileName] = useState('')

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setFileName(file.name)
    setStep('loading')
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const extractRes = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const { text } = await extractRes.json()

      if (!text || text.length < 50) {
        throw new Error('PDF tidak bisa dibaca. Pastikan CV dalam format teks, bukan hasil scan.')
      }

      const analyzeRes = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: text, targetRole, filename: file.name }),
      })

      const data = await analyzeRes.json()
      if (data.error) throw new Error(data.error)

      setAnalysis(data.analysis)
      setResultId(data.id ?? null)
      setStep('result')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan.')
      setStep('upload')
    }
  }, [targetRole])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const reset = () => {
    setStep('upload')
    setAnalysis(null)
    setFileName('')
    setResultId(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-[#F7F3EC]">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#124136] transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-[#124136]">CV Optimizer</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Upload ── */}
        {step === 'upload' && (
          <div className="space-y-5 animate-fade-up">
            <div>
              <h1 className="font-display text-2xl font-light italic text-[#124136]">
                Analisa CV kamu
              </h1>
              <p className="text-gray-500 mt-1 text-sm leading-relaxed">
                Upload CV dalam format PDF. AI akan kasih feedback dalam hitungan detik.
              </p>
            </div>

            {/* Target role */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-fade-up anim-delay-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Posisi yang kamu lamar
                <span className="ml-1.5 text-xs font-normal text-gray-400">(opsional)</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Product Manager, Software Engineer"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="
                  w-full border border-gray-200 rounded-xl px-4 py-2.5
                  text-sm text-gray-800 placeholder-gray-400
                  focus:outline-none focus:border-[#124136] focus:ring-2 focus:ring-[#124136]/10
                  transition-all duration-150
                "
              />
            </div>

            {/* Dropzone */}
            <div
              {...getRootProps()}
              className={`
                bg-white rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer
                transition-all duration-200 animate-fade-up anim-delay-2
                ${isDragActive
                  ? 'border-[#124136] bg-[#124136]/5 scale-[1.01]'
                  : 'border-gray-200 hover:border-[#124136]/60 hover:shadow-sm'}
              `}
            >
              <input {...getInputProps()} />
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#124136]/8 flex items-center justify-center text-2xl">
                📎
              </div>
              {isDragActive ? (
                <p className="text-[#124136] font-semibold">Lepas CV kamu di sini...</p>
              ) : (
                <>
                  <p className="font-semibold text-gray-800">Drag & drop CV kamu di sini</p>
                  <p className="text-gray-400 text-sm mt-1">atau klik untuk pilih file</p>
                  <div className="inline-flex items-center gap-1.5 mt-4 text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                    <span>PDF only</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>Max 5MB</span>
                  </div>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="flex gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-4 animate-fade-in">
                <span className="text-red-500 shrink-0">⚠️</span>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* ── Loading ── */}
        {step === 'loading' && (
          <div className="animate-fade-in">
            <CVLoadingState />
          </div>
        )}

        {/* ── Result ── */}
        {step === 'result' && analysis && (
          <div className="space-y-5 animate-fade-up pb-10">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-[#124136] tracking-tight">Hasil Analisa CV</h1>
                <p className="text-sm text-gray-400 mt-0.5">{fileName}</p>
              </div>
              {resultId && (
                <Link
                  href={`/cv/result/${resultId}`}
                  className="shrink-0 text-xs text-[#124136] font-medium hover:underline transition-colors"
                >
                  Lihat tersimpan →
                </Link>
              )}
            </div>

            {/* Score card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">CV Score</p>
                  <div className="flex items-end gap-1.5">
                    <span className={`text-6xl font-black leading-none ${scoreColor(analysis.score)}`}>
                      {analysis.score}
                    </span>
                    <span className="text-xl text-gray-400 font-medium mb-1">/100</span>
                  </div>
                  <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-xs font-semibold ${scoreLabelClass(analysis.score)}`}>
                    {scoreLabel(analysis.score)}
                  </span>
                </div>
                <div className="text-4xl pt-1">
                  {analysis.score >= 75 ? '🟢' : analysis.score >= 50 ? '🟡' : '🔴'}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className={`h-2.5 rounded-full ${scoreBg(analysis.score)} transition-all duration-1000 ease-out`}
                  style={{ width: `${analysis.score}%` }}
                />
              </div>
              {analysis.summary && (
                <p className="mt-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {analysis.summary}
                </p>
              )}
            </div>

            {/* Strengths */}
            <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <span>✅</span> Yang sudah bagus
              </h3>
              <ul className="space-y-2.5">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start gap-2.5">
                    <span className="text-green-500 mt-0.5 shrink-0">•</span>
                    {String(s)}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
              <h3 className="font-semibold text-amber-800 mb-4 flex items-center gap-2">
                <span>🔧</span> Yang perlu diperbaiki
              </h3>
              <div className="space-y-3">
                {analysis.improvements.map((imp, i) =>
                  typeof imp === 'string' ? (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                      <p className="text-gray-700 text-sm">{imp}</p>
                    </div>
                  ) : (
                    <div key={i} className="bg-white/70 rounded-xl p-4 border border-amber-100">
                      <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1.5">
                        {imp.section}
                      </p>
                      <p className="text-red-600 text-sm mb-1.5 flex items-start gap-1.5">
                        <span className="shrink-0">⚠</span> {imp.issue}
                      </p>
                      <p className="text-gray-700 text-sm flex items-start gap-1.5">
                        <span className="shrink-0">💡</span> {imp.suggestion}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ATS tips */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                <span>🤖</span> Tips ATS
              </h3>
              <ul className="space-y-2.5">
                {analysis.ats_tips.map((tip, i) => (
                  <li key={i} className="text-gray-700 text-sm flex items-start gap-2.5">
                    <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Verdict */}
            {analysis.verdict && (
              <div className="bg-[#124136]/6 border border-[#124136]/15 rounded-2xl p-5">
                <p className="text-[#124136] font-semibold text-sm flex items-start gap-2">
                  <span className="shrink-0">✨</span> {analysis.verdict}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={reset}
                className="
                  flex-1 bg-white border border-gray-200 text-gray-700 font-medium
                  py-3 rounded-xl text-sm
                  hover:border-gray-300 hover:bg-gray-50
                  active:scale-[0.98]
                  transition-all duration-150
                "
              >
                Analisa CV lain
              </button>
              <Link
                href="/dashboard"
                className="
                  flex-1 bg-[#124136] text-white font-semibold
                  py-3 rounded-xl text-sm text-center
                  hover:bg-[#163829]
                  active:scale-[0.98]
                  transition-all duration-150
                  shadow-sm
                "
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
