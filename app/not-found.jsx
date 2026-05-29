import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4EFE3] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M10 3L18.5 17H1.5L10 3Z" fill="#B89858" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-[#1B4332]">tambo</span>
        </div>

        {/* 404 number */}
        <p className="font-display text-[80px] font-light italic text-[#E5E0D8] leading-none mb-2 select-none">
          404
        </p>

        <h1 className="text-xl font-semibold text-[#1A1A1A] mb-2">
          Halaman tidak ditemukan
        </h1>
        <p className="text-sm text-[#5E6B53] leading-relaxed mb-8">
          Halaman yang kamu cari tidak ada atau sudah dipindahkan.
          Kembali ke dashboard dan lanjutkan dari sana.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1B4332] hover:bg-[#163829] text-white font-semibold text-sm rounded-xl transition-all duration-150 shadow-sm"
          >
            Kembali ke Dashboard
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#E5E0D8] hover:border-[#1B4332]/30 text-[#1A1A1A] font-medium text-sm rounded-xl transition-all duration-150"
          >
            Ke halaman utama
          </Link>
        </div>

      </div>

      <p className="absolute bottom-6 text-xs text-[#5E6B53]/50">© 2025 Tambo.id</p>
    </div>
  )
}
