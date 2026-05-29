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
      if (!text || text.length < 50) throw new Error('PDF tidak bisa dibaca. Pastikan CV dalam format teks, bukan hasil scan.')
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
    <div className="min-h-screen bg-[#F4EFE3]">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#F4EFE3]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-sm text-[#5E6B53] hover:text-[#1B4332] transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Dashboard
          </Link>
          <span className="text-[#E5E0D8]">/</span>
          <span className="text-sm font-semibold text-[#1B4332]">CV Optimizer</span>
        </div>
      </nav>

      {/* ── Upload ── */}
      {step === 'upload' && (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left column */}
            <div>
              <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-3">
                CEK CV GRATIS
              </p>
              <h1 className="font-display text-3xl font-light italic text-[#1A1A1A] leading-snug mb-2">
                Unggah CV-mu,
              </h1>
              <h2 className="font-display text-3xl font-light italic text-[#1B4332] leading-snug mb-4">
                kita mulai bareng.
              </h2>
              <p className="text-sm text-[#5E6B53] leading-relaxed mb-8">
                Upload CV dalam format PDF. AI Tambo akan analisa dan kasih saran spesifik dalam hitungan detik — gratis, tanpa daftar.
              </p>

              {/* Target role */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide mb-1.5">
                  Posisi yang kamu lamar
                  <span className="ml-1.5 text-[10px] font-normal text-[#5E6B53]/60 normal-case">(opsional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Product Manager, Software Engineer"
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full border border-[#E5E0D8] bg-white rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#5E6B53]/50 focus:outline-none focus:border-[#1B4332] focus:ring-2 focus:ring-[#1B4332]/15 transition-all duration-150"
                />
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 mb-5 ${
                  isDragActive
                    ? 'border-[#1B4332] bg-[#1B4332]/5'
                    : 'border-[#E5E0D8] bg-white hover:border-[#1B4332]/50 hover:bg-[#1B4332]/3'
                }`}
              >
                <input {...getInputProps()} />
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#1B4332]/8 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#1B4332]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                {isDragActive ? (
                  <p className="text-[#1B4332] font-semibold text-sm">Lepas CV kamu di sini...</p>
                ) : (
                  <>
                    <p className="font-semibold text-[#1A1A1A] text-sm">Drag & drop CV kamu di sini</p>
                    <p className="text-[#5E6B53] text-xs mt-1">atau klik untuk pilih file</p>
                    <div className="inline-flex items-center gap-1.5 mt-4 text-xs text-[#5E6B53] bg-[#F4EFE3] px-3 py-1.5 rounded-full border border-[#E5E0D8]">
                      <span>PDF only</span>
                      <span className="w-1 h-1 rounded-full bg-[#5E6B53]/40" />
                      <span>Maks 5MB</span>
                    </div>
                  </>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
                  <span className="text-red-500 shrink-0 text-sm">⚠</span>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Privacy note */}
              <div className="flex items-center gap-2 text-xs text-[#5E6B53]">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Data CV kamu tidak disimpan tanpa persetujuanmu. <Link href="/privacy" className="underline hover:text-[#1B4332]">Kebijakan privasi</Link></span>
              </div>
            </div>

            {/* Right column — preview card */}
            <div className="lg:sticky lg:top-24">
              <div className="bg-[#1B4332] rounded-3xl p-7 text-white">
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xs bg-white/10 text-white/60 px-3 py-1.5 rounded-full border border-white/10">
                    ✦ Contoh hasil analisis
                  </span>
                </div>

                {/* Score ring + number */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative w-20 h-20 shrink-0">
                    <svg width="80" height="80" viewBox="0 0 80 80" className="rotate-[-90deg]">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                      <circle
                        cx="40" cy="40" r="32"
                        fill="none"
                        stroke="#B89858"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 32}`}
                        strokeDashoffset={`${2 * Math.PI * 32 * (1 - 73 / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-black text-[#B89858] leading-none">73</span>
                      <span className="text-[10px] text-white/40">/100</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">CV Score</p>
                    <p className="text-xs text-white/50 mt-0.5">Lumayan — tinggal 12 poin ke top 20%</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-[10px] bg-[#B89858]/15 text-[#B89858] px-2.5 py-1 rounded-full border border-[#B89858]/25">
                      <span className="w-1.5 h-1.5 bg-[#B89858] rounded-full" />
                      ~15 detik proses
                    </div>
                  </div>
                </div>

                {/* Breakdown bars */}
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Relevansi Posisi', val: 85 },
                    { label: 'ATS Compatibility', val: 72 },
                    { label: 'Kualitas Penulisan', val: 68 },
                    { label: 'Depth Pengalaman', val: 71 },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">{item.label}</span>
                        <span className="text-xs font-semibold text-white/80">{item.val}%</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-1.5 rounded-full bg-[#B89858]"
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* What you get */}
                <div className="border-t border-white/10 pt-5 space-y-2.5">
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Kamu juga dapat</p>
                  {[
                    'Saran perbaikan per bagian CV',
                    'Tips kata kunci ATS spesifik posisi',
                    'Contoh kalimat yang lebih kuat',
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-[#B89858]/20 border border-[#B89858]/40 flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5 text-[#B89858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-xs text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-xs text-[#5E6B53] mt-4">
                Sudah dipakai <strong className="text-[#1A1A1A]">2.840+</strong> fresh grad minggu ini
              </p>
            </div>
          </div>
        </main>
      )}

      {/* ── Loading ── */}
      {step === 'loading' && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <CVLoadingState />
        </main>
      )}

      {/* ── Result ── */}
      {step === 'result' && analysis && (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-16">
          <div className="space-y-5">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-1">Hasil Analisis</p>
                <h1 className="font-display text-2xl font-light italic text-[#1A1A1A]">
                  CV kamu sudah dianalisa.
                </h1>
                <p className="text-sm text-[#5E6B53] mt-0.5">{fileName}</p>
              </div>
              {resultId && (
                <Link
                  href={`/cv/result/${resultId}`}
                  className="shrink-0 text-xs text-[#1B4332] font-medium hover:underline transition-colors"
                >
                  Lihat tersimpan →
                </Link>
              )}
            </div>

            {/* Score card */}
            <ResultScoreCard score={analysis.score} summary={analysis.summary} />

            {/* Strengths */}
            {analysis.strengths.length > 0 && (
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-[#2D6A4F] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#2D6A4F]/10 flex items-center justify-center text-xs">✓</span>
                  Yang sudah bagus
                </h3>
                <ul className="space-y-2.5">
                  {analysis.strengths.map((s, i) => (
                    <li key={i} className="text-sm text-[#1A1A1A] flex items-start gap-2.5">
                      <span className="text-[#2D6A4F] mt-0.5 shrink-0">•</span>
                      {String(s)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {analysis.improvements.length > 0 && (
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-[#9B6A1F] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#9B6A1F]/10 flex items-center justify-center text-xs">!</span>
                  Yang perlu diperbaiki
                </h3>
                <div className="space-y-3">
                  {analysis.improvements.map((imp, i) =>
                    typeof imp === 'string' ? (
                      <div key={i} className="flex items-start gap-2.5">
                        <span className="text-[#9B6A1F] mt-0.5 shrink-0">•</span>
                        <p className="text-sm text-[#1A1A1A]">{imp}</p>
                      </div>
                    ) : (
                      <div key={i} className="bg-[#F4EFE3] rounded-xl p-4 border border-[#E5E0D8]">
                        <p className="text-[10px] text-[#5E6B53] uppercase tracking-wider font-semibold mb-1.5">{imp.section}</p>
                        <p className="text-sm text-[#8B3E2A] mb-1.5">⚠ {imp.issue}</p>
                        <p className="text-sm text-[#1A1A1A]">→ {imp.suggestion}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* ATS tips */}
            {analysis.ats_tips.length > 0 && (
              <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-[#1B4332] mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#1B4332]/10 flex items-center justify-center text-xs text-[#1B4332]">◎</span>
                  Tips ATS
                </h3>
                <ul className="space-y-2.5">
                  {analysis.ats_tips.map((tip, i) => (
                    <li key={i} className="text-sm text-[#1A1A1A] flex items-start gap-2.5">
                      <span className="text-[#1B4332] mt-0.5 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verdict */}
            {analysis.verdict && (
              <div className="bg-[#1B4332]/6 border border-[#1B4332]/15 rounded-2xl p-5">
                <p className="text-sm text-[#1B4332] font-semibold">{analysis.verdict}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={reset}
                className="flex-1 bg-white border border-[#E5E0D8] text-[#1A1A1A] font-medium py-3 rounded-xl text-sm hover:border-[#1B4332]/30 transition-all duration-150"
              >
                Analisa CV lain
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-[#1B4332] text-white font-semibold py-3 rounded-xl text-sm text-center hover:bg-[#163829] transition-all duration-150 shadow-sm"
              >
                Kembali ke Dashboard
              </Link>
            </div>
          </div>
        </main>
      )}
    </div>
  )
}

function ResultScoreCard({ score, summary }: { score: number; summary?: string }) {
  const r = 32
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  const strokeColor = score >= 75 ? '#2D6A4F' : score >= 50 ? '#9B6A1F' : '#8B3E2A'
  const label = score >= 75 ? 'Bagus!' : score >= 50 ? 'Lumayan' : 'Perlu Diperbaiki'

  return (
    <div className="bg-[#1B4332] rounded-2xl p-6 text-white">
      <div className="flex items-center gap-5 mb-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg width="80" height="80" viewBox="0 0 80 80" className="rotate-[-90deg]">
            <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
            <circle
              cx="40" cy="40" r={r}
              fill="none"
              stroke={strokeColor}
              strokeWidth="8"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black leading-none" style={{ color: strokeColor }}>{score}</span>
            <span className="text-[10px] text-white/40">/100</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-1">CV Score</p>
          <p className="text-2xl font-semibold text-white">{label}</p>
          {score < 85 && (
            <p className="text-xs text-white/50 mt-0.5">Tinggal {85 - score} poin ke top 20%</p>
          )}
        </div>
      </div>
      {summary && (
        <p className="text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">{summary}</p>
      )}
    </div>
  )
}
