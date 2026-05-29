'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function PasswordInput({
  id,
  name,
  value,
  onChange,
  placeholder = 'Password',
  error,
  label,
  autoComplete = 'current-password',
}) {
  const [show, setShow] = useState(false)

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`
            w-full px-4 py-3 pr-11 rounded-xl border text-sm
            focus:outline-none focus:ring-2 transition-all duration-150
            ${error
              ? 'border-red-400 bg-red-50 focus:ring-red-200'
              : 'border-[#E5E0D8] bg-white focus:ring-[#1B4332]/20 focus:border-[#1B4332]'
            }
          `}
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
