'use client'

import { useState, useEffect } from 'react'

const STEPS = [
  { message: 'Tambo lagi baca CV kamu...', duration: 2500 },
  { message: 'Menganalisa skill dan pengalaman...', duration: 2500 },
  { message: 'Membandingkan dengan standar industri...', duration: 2000 },
  { message: 'Hampir selesai...', duration: null },
]

export default function CVLoadingState() {
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    let timeout
    if (stepIndex < STEPS.length - 1 && STEPS[stepIndex].duration) {
      timeout = setTimeout(() => setStepIndex((i) => i + 1), STEPS[stepIndex].duration)
    }
    return () => clearTimeout(timeout)
  }, [stepIndex])

  const current = STEPS[stepIndex]

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Animated leaf spinner */}
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-[#124136]/20" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#124136] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          📄
        </div>
      </div>

      {/* Step message */}
      <p
        key={stepIndex}
        className="text-base font-medium text-gray-700 animate-fade-in"
        style={{ animation: 'fadeIn 0.4s ease' }}
      >
        {current.message}
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-4">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`
              w-2 h-2 rounded-full transition-all duration-500
              ${i <= stepIndex ? 'bg-[#124136]' : 'bg-gray-200'}
              ${i === stepIndex ? 'scale-125' : ''}
            `}
          />
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-4">
        Biasanya selesai dalam 10-15 detik
      </p>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
