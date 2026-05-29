export default function TamboLogo({ variant = 'light', size = 'md' }) {
  const textColor  = variant === 'dark' ? '#FAF6EC' : '#1B4332'
  const accentColor = variant === 'dark' ? '#B89858' : '#1B4332'

  const sizeMap = {
    sm: { w: 16, cls: 'text-lg' },
    md: { w: 20, cls: 'text-xl' },
    lg: { w: 26, cls: 'text-2xl' },
  }
  const s = sizeMap[size] ?? sizeMap.md

  return (
    <span className="inline-flex items-center gap-1.5 select-none">
      <svg width={s.w} height={s.w} viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3L18.5 17H1.5L10 3Z" fill={accentColor} />
      </svg>
      <span className={`${s.cls} font-bold tracking-tight`} style={{ color: textColor }}>
        tambo
      </span>
    </span>
  )
}
