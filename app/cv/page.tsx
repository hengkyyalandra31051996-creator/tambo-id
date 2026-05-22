'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'

interface Analysis {
  score: number
  summary: string
  strengths: string[]
  improvements: { section: string; issue: string; suggestion: string }[]
  ats_tips: string[]
  verdict: string
}

export default function CVPage() {
  const [step, setStep] = useState<'upload' | 'loading' | 'result'>('upload')
  const [targetRole, setTargetRole] = useState('')
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
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

      const extractRes = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
      })
      const { text } = await extractRes.json()

      if (!text || text.length < 50) {
        throw new Error('PDF tidak bisa dibaca. Pastikan CV dalam format teks, bukan hasil scan.')
      }

      const analyzeRes = await fetch('/api/analyze-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cvText: text, targetRole }),
      })

      const data = await analyzeRes.json()
      if (data.error) throw new Error(data.error)

      setAnalysis(data.analysis)
      setStep('result')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Terjadi kesalahan.'
      setError(message)
      setStep('upload')
    }
  }, [targetRole])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
  })

  const scoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const scoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-400'
    if (score >= 60) return 'bg-yellow-400'
    return 'bg-red-400'
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/dashboard" className="text-zinc-400 hover:text-white text-sm transition-colors">
            ← Dashboard
          </Link>
          <span className="text-zinc-600">/</span>
          <span className="text-white text-sm font-medium">CV Optimizer</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10">

        {step === 'upload' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold">Analisa CV kamu 📄</h2>
              <p className="text-zinc-400 mt-2">
                Upload CV dalam format PDF. AI akan kasih feedback dalam hitungan detik.
              </p>
            </div>

            <div className="mb-4">
              <label className="text-sm text-zinc-400 block mb-1.5">
                Posisi yang kamu lamar <span className="text-zinc-600">(opsional)</span>
              </label>
              <input
                type="text"
                placeholder="Contoh: Product Manager, Software Engineer"
                value={targetRole}
                onChange={e => setTargetRole(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 
                           text-white placeholder-zinc-600 focus:outline-none focus:border-[#F97316]
                           transition-colors text-sm"
              />
            </div>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
                ${isDragActive
                  ? 'border-[#F97316] bg-[#F97316]/5'
                  : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900/50'}`}
            >
              <input {...getInputProps()} />
              <div className="text-4xl mb-4">📎</div>
              {isDragActive ? (
                <p className="text-[#F97316] font-medium">Lepas CV kamu di sini...</p>
              ) : (
                <>
                  <p className="text-white font-medium">Drag & drop CV kamu di sini</p>
                  <p className="text-zinc-500 text-sm mt-1">atau klik untuk pilih file</p>
                  <p className="text-zinc-600 text-xs mt-3">PDF only · Max 5MB</p>
                </>
              )}
            </div>

            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">⚠️ {error}</p>
              </div>
            )}
          </div>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-16 h-16 border-4 border-zinc-800 border-t-[#F97316] rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-white font-medium">Menganalisa {fileName}...</p>
              <p className="text-zinc-500 text-sm mt-1">AI lagi baca CV kamu, sebentar ya ✨</p>
            </div>
          </div>
        )}

        {step === 'result' && analysis && (
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-zinc-400 text-sm">CV Score</p>
                  <p className={`text-5xl font-bold mt-1 ${scoreColor(analysis.score)}`}>
                    {analysis.score}<span className="text-2xl text-zinc-600">/100</span>
                  </p>
                </div>
                <div className="text-5xl">
                  {analysis.score >= 80 ? '🟢' : analysis.score >= 60 ? '🟡' : '🔴'}
                </div>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-2 mb-4">
                <div className={`h-2 rounded-full ${scoreBg(analysis.score)}`} style={{ width: `${analysis.score}%` }} />
              </div>
              <p className="text-zinc-300 text-sm">{analysis.summary}</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold text-green-400 mb-4">✅ Yang sudah bagus</h3>
              <ul className="space-y-2">
                {analysis.strengths.map((s, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-start gap-2">
                    <span className="text-green-400 mt-0.5">•</span> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold text-yellow-400 mb-4">🔧 Yang perlu diperbaiki</h3>
              <div className="space-y-4">
                {analysis.improvements.map((imp, i) => (
                  <div key={i} className="border border-zinc-800 rounded-xl p-4">
                    <p className="text-xs text-zinc-500 uppercase tracking-wide mb-1">{imp.section}</p>
                    <p className="text-red-400 text-sm mb-2">⚠️ {imp.issue}</p>
                    <p className="text-zinc-300 text-sm">💡 {imp.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-400 mb-4">🤖 Tips ATS</h3>
              <ul className="space-y-2">
                {analysis.ats_tips.map((tip, i) => (
                  <li key={i} className="text-zinc-300 text-sm flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F97316]/10 border border-[#F97316]/20 rounded-2xl p-6">
              <p className="text-[#F97316] font-medium">✨ {analysis.verdict}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => { setStep('upload'); setAnalysis(null); setFileName('') }}
                className="flex-1 bg-zinc-900 border border-zinc-700 hover:border-zinc-500
                           text-white font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Analisa CV lain
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-[#F97316] hover:bg-[#ea6c10] text-white 
                           font-medium py-3 rounded-xl transition-colors text-sm text-center"
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