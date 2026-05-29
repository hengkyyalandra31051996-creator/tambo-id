import Link from 'next/link'

export default function TermsPage() {
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
          <span className="text-sm font-semibold text-[#1B4332]">Syarat & Ketentuan</span>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#B89858] uppercase tracking-widest mb-3">Legal</p>
          <h1 className="font-display text-3xl font-light italic text-[#1A1A1A] leading-snug mb-2">
            Syarat & Ketentuan
          </h1>
          <p className="text-sm text-[#5E6B53]">Terakhir diperbarui: Mei 2026</p>
        </div>

        <div className="space-y-8">

          <Section title="1. Penggunaan layanan">
            <ul className="space-y-2">
              <Li>Tambo diperuntukkan untuk individu yang sedang mencari pekerjaan atau ingin mengembangkan karir</Li>
              <Li>Dilarang menggunakan Tambo untuk tujuan komersial — termasuk menjual kembali analisis CV atau menggunakan layanan atas nama orang lain — tanpa izin tertulis dari Tambo</Li>
              <Li>Penggunaan layanan secara otomatis (bot, scraping) tidak diizinkan</Li>
            </ul>
          </Section>

          <Section title="2. Akun pengguna">
            <ul className="space-y-2">
              <Li>Kamu bertanggung jawab penuh atas keamanan akun dan kerahasiaan password kamu</Li>
              <Li>Satu akun per pengguna — pembuatan beberapa akun untuk menghindari batasan layanan tidak diperbolehkan</Li>
              <Li>Tambo berhak menonaktifkan akun yang melanggar ketentuan ini tanpa pemberitahuan sebelumnya</Li>
            </ul>
          </Section>

          <Section title="3. Konten yang kamu upload">
            <ul className="space-y-2">
              <Li>CV dan semua data yang kamu upload ke Tambo <strong className="text-[#1A1A1A]">tetap sepenuhnya milik kamu</strong></Li>
              <Li>Tambo tidak mengklaim kepemilikan atas konten yang kamu buat atau upload</Li>
              <Li>Dengan mengupload CV, kamu memberikan izin kepada Tambo untuk memproses konten tersebut semata-mata untuk memberikan layanan analisis kepadamu</Li>
            </ul>
          </Section>

          <Section title="4. Perubahan layanan">
            <ul className="space-y-2">
              <Li>Tambo berhak mengubah fitur, harga, atau struktur layanan dengan pemberitahuan terlebih dahulu melalui email atau notifikasi dalam aplikasi</Li>
              <Li>Untuk perubahan yang berdampak signifikan pada pengguna berbayar, pemberitahuan diberikan minimal 14 hari sebelumnya</Li>
              <Li>Melanjutkan penggunaan layanan setelah perubahan berlaku dianggap sebagai persetujuan atas perubahan tersebut</Li>
            </ul>
          </Section>

          <Section title="5. Kontak">
            <p>
              Ada pertanyaan soal syarat & ketentuan ini? Email kami di{' '}
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
          <Link href="/privacy" className="text-sm text-[#5E6B53] hover:text-[#1B4332] hover:underline transition-colors">
            Lihat Kebijakan Privasi →
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
