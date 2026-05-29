'use client'

export default function FormField({
  id,
  name,
  type = 'text',
  value,
  onChange,
  label,
  placeholder,
  error,
  autoComplete,
  required,
}) {
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-[#5E6B53] uppercase tracking-wide">
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={`
          w-full px-4 py-3 rounded-xl border text-sm
          focus:outline-none focus:ring-2 transition-all duration-150
          ${error
            ? 'border-red-400 bg-red-50 focus:ring-red-200'
            : 'border-[#E5E0D8] bg-white focus:ring-[#1B4332]/20 focus:border-[#1B4332]'
          }
        `}
      />
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
