'use client'

import { useState } from 'react'

export default function CVAnalysisResult({ analysis }) {
  if (!analysis) return null
  const { score, strengths = [], improvements = [], atsTips = [], summary } = analysis

  const clampedScore = Math.max(0, Math.min(100, Number(score) || 0))
  const strokeColor = clampedScore >= 75 ? '#2D6A4F' : clampedScore >= 50 ? '#B89858' : '#8B3E2A'
  const label = clampedScore >= 75 ? 'Bagus!' : clampedScore >= 50 ? 'Lumayan' : 'Perlu Diperbaiki'
  const r = 32
  const circ = 2 * Math.PI * r
  const offset = circ - (clampedScore / 100) * circ

  return (
    <div className="space-y-5">

      {/* Score card */}
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
                style={{ transition: 'stroke-dashoffset 1s ease-out' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black leading-none" style={{ color: strokeColor }}>{clampedScore}</span>
              <span className="text-[10px] text-white/40">/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-1">CV Score</p>
            <p className="text-2xl font-semibold text-white">{label}</p>
            {clampedScore < 85 && (
              <p className="text-xs text-white/50 mt-0.5">Tinggal {85 - clampedScore} poin ke top 20%</p>
            )}
          </div>
        </div>
        {summary && (
          <p className="text-sm text-white/70 leading-relaxed border-t border-white/10 pt-4">{summary}</p>
        )}
      </div>

      {/* Suggestion cards */}
      {improvements.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[#5E6B53] uppercase tracking-widest mb-3">Saran Perbaikan</p>
          <div className="space-y-3">
            {improvements.map((imp, i) => (
              <SuggestionCard key={i} imp={imp} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Strengths */}
      {strengths.length > 0 && (
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5">
          <p className="text-xs font-semibold text-[#2D6A4F] uppercase tracking-widest mb-3">Yang Sudah Bagus</p>
          <ul className="space-y-2">
            {strengths.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                <span className="text-[#2D6A4F] mt-0.5 shrink-0">✓</span>
                {String(s)}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ATS tips */}
      {atsTips.length > 0 && (
        <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5">
          <p className="text-xs font-semibold text-[#1B4332] uppercase tracking-widest mb-3">Tips ATS</p>
          <ul className="space-y-2">
            {atsTips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                <span className="text-[#B89858] mt-0.5 shrink-0">◎</span>
                {String(tip)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

function SuggestionCard({ imp, index }) {
  const [applied, setApplied] = useState(false)
  const [skipped, setSkipped] = useState(false)

  if (skipped) return null

  const isStructured = typeof imp === 'object' && imp !== null

  return (
    <div className={`bg-white border rounded-2xl p-5 transition-all duration-200 ${applied ? 'border-[#2D6A4F]/40 bg-[#2D6A4F]/3' : 'border-[#E5E0D8]'}`}>
      {/* Section badge */}
      {isStructured && imp.section && (
        <span className="inline-block text-[10px] font-semibold text-[#5E6B53] bg-[#F4EFE3] px-2 py-0.5 rounded-full mb-3 uppercase tracking-wider border border-[#E5E0D8]">
          {imp.section}
        </span>
      )}

      {/* Issue */}
      {isStructured && imp.issue && (
        <div className="mb-3">
          <p className="text-[10px] font-semibold text-[#8B3E2A] uppercase tracking-wider mb-1">Teks saat ini</p>
          <p className="text-sm text-[#5E6B53] leading-relaxed bg-red-50/60 border border-red-100/80 rounded-xl px-3 py-2">
            {imp.issue}
          </p>
        </div>
      )}

      {/* Suggestion */}
      <div className="mb-4">
        {isStructured && imp.suggestion ? (
          <>
            <p className="text-[10px] font-semibold text-[#1B4332] uppercase tracking-wider mb-1">Saran Tambo</p>
            <p className="text-sm text-[#1A1A1A] leading-relaxed bg-[#F4EFE3] border border-[#E5E0D8] rounded-xl px-3 py-2">
              {imp.suggestion}
            </p>
          </>
        ) : (
          <p className="text-sm text-[#1A1A1A] leading-relaxed">{String(imp)}</p>
        )}
      </div>

      {/* Why stronger */}
      {isStructured && (
        <div className="bg-[#B89858]/8 border border-[#B89858]/20 rounded-xl px-3 py-2 mb-4">
          <p className="text-xs text-[#9B6A1F] leading-relaxed">
            <span className="font-semibold">Kenapa ini lebih kuat:</span> Kalimat yang spesifik dan terukur 3× lebih mudah diingat rekruter dan lolos filter ATS.
          </p>
        </div>
      )}

      {/* Actions */}
      {isStructured && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setApplied(true)}
            disabled={applied}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
              applied
                ? 'bg-[#2D6A4F] text-white cursor-default'
                : 'bg-[#1B4332] text-white hover:bg-[#163829]'
            }`}
          >
            {applied ? '✓ Diterapkan' : 'Terapkan'}
          </button>
          <button
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#5E6B53] border border-[#E5E0D8] hover:border-[#1B4332]/30 transition-all duration-150"
          >
            Edit
          </button>
          <button
            onClick={() => setSkipped(true)}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#5E6B53] hover:text-[#8B3E2A] transition-colors duration-150"
          >
            Lewati
          </button>
        </div>
      )}
    </div>
  )
}

export function parseGeminiAnalysis(rawText) {
  try {
    const clean = rawText.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return {
      score: 0,
      summary: rawText,
      strengths: [],
      improvements: [],
      atsTips: [],
    }
  }
}
