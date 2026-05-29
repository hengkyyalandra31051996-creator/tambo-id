import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F4EFE3]">

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#F4EFE3]/95 backdrop-blur-sm border-b border-[#E5E0D8]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#5E6B53] hover:text-[#1B4332] transition-colors duration-150"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
          <span className="text-[#E5E0D8]">/</span>
          <span className="text-sm font-semibold text-[#1B4332]">Kebijakan Privasi</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-3">Privasi</p>
          <h1 className="font-display text-3xl font-light italic text-[#1A1A1A] leading-snug mb-2">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-[#5E6B53]">Terakhir diperbarui: Mei 2026</p>
        </div>

        <div className="space-y-8">

          <Section title="1. Data yang kami kumpulkan">
            <p>Saat kamu menggunakan Tambo, kami mengumpulkan data berikut:</p>
            <ul className="space-y-2 mt-3">
              <Li>Nama dan alamat email yang kamu daftarkan</Li>
              <Li>Isi CV yang kamu upload untuk dianalisis</Li>
              <Li>Data penggunaan dasar (halaman yang dikunjungi, fitur yang dipakai) untuk meningkatkan produk</Li>
            </ul>
            <p className="mt-3">
              Kami tidak mengumpulkan data yang tidak perlu dan tidak meminta informasi finansial tanpa konteks yang jelas.
            </p>
          </Section>

          <Section title="2. Bagaimana kami menggunakan data">
            <ul className="space-y-2">
              <Li>Untuk menganalisis CV kamu dan memberikan saran perbaikan yang relevan</Li>
              <Li>Data kamu <strong className="text-[#1A1A1A]">tidak dijual ke pihak ketiga</strong> dalam bentuk apapun</Li>
              <Li>Data kamu <strong className="text-[#1A1A1A]">tidak dipakai untuk melatih model AI</strong> tanpa izin eksplisit darimu</Li>
              <Li>Kami tidak membagikan CV-mu ke rekruter atau job board tanpa persetujuanmu</Li>
            </ul>
          </Section>

          <Section title="3. Keamanan data">
            <ul className="space-y-2">
              <Li>Semua data dienkripsi end-to-end saat transit (HTTPS/TLS) dan saat disimpan</Li>
              <Li>Server tidak menyimpan file PDF CV dalam plaintext setelah analisis selesai</Li>
              <Li>Kamu bisa menghapus akun beserta semua data yang terkait kapan saja — satu langkah, tanpa prosedur panjang</Li>
              <Li>Kami menggunakan Supabase sebagai infrastruktur database, dengan standar keamanan enterprise</Li>
            </ul>
          </Section>

          <Section title="4. Kontak">
            <p>
              Ada pertanyaan soal privasi atau permintaan penghapusan data? Email kami di{' '}
              <a
                href="mailto:hello@tambo.id"
                className="text-[#1B4332] font-semibold hover:underline"
              >
                hello@tambo.id
              </a>
              . Kami merespons dalam 1–3 hari kerja.
            </p>
          </Section>

        </div>

        <div className="mt-12 pt-8 border-t border-[#E5E0D8] flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] hover:bg-[#163829] text-white font-semibold text-sm rounded-xl transition-all duration-150"
          >
            Kembali ke halaman utama
          </Link>
          <Link href="/terms" className="text-sm text-[#5E6B53] hover:text-[#1B4332] hover:underline transition-colors">
            Lihat Syarat & Ketentuan →
          </Link>
        </div>

      </main>

      <footer className="border-t border-[#E5E0D8] px-6 py-5 text-center">
        <p className="text-xs text-[#5E6B53]/50">© 2025 Tambo.id</p>
      </footer>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div className="bg-white border border-[#E5E0D8] rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-[#1B4332] mb-4">{title}</h2>
      <div className="text-sm text-[#5E6B53] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  )
}

function Li({ children }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="text-[#B89858] mt-0.5 shrink-0">•</span>
      <span>{children}</span>
    </li>
  )
}
