'use client'

import Link from 'next/link'

const C = {
  primary: '#1B4332',
  primaryHover: '#163829',
  sage: '#5E6B53',
  gold: '#B89858',
  bg: '#F4EFE3',
  paper: '#FAF6EC',
  ink: '#1A1A1A',
  border: '#E5E0D8',
}

/* ── Floating AI Coach card (hero right) ─────────────── */
function AICoachCard() {
  return (
    <div style={{ position: 'relative', padding: '40px 20px' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '5%', right: '5%',
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.gold}18 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      {/* Main card */}
      <div style={{
        background: C.paper, borderRadius: 20, padding: '20px',
        boxShadow: '0 32px 72px rgba(27,67,50,0.18), 0 4px 16px rgba(0,0,0,0.05)',
        border: `1px solid ${C.border}`,
        animation: 'tbFloat 6s ease-in-out infinite',
        maxWidth: 290, margin: '0 auto', position: 'relative',
      }}>
        {/* AI Coach label */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14,
          padding: '5px 10px',
          background: `${C.primary}10`, borderRadius: 8,
          width: 'fit-content',
        }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: C.primary, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
            AI Coach aktif
          </span>
        </div>

        <p style={{ fontSize: 14, fontWeight: 700, color: C.ink, marginBottom: 4 }}>
          CV kamu sudah cukup rapi.
        </p>
        <p style={{ fontSize: 12, color: C.sage, marginBottom: 14, lineHeight: 1.5 }}>
          Ada 4 bagian yang bisa membuat recruiter ragu — kita perbaiki bareng dalam 20 menit.
        </p>

        {/* Score + breakdown */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
          {/* Ring */}
          <div style={{ position: 'relative', width: 56, height: 56, flexShrink: 0 }}>
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="28" cy="28" r="22" fill="none" stroke={C.border} strokeWidth="6" />
              <circle cx="28" cy="28" r="22" fill="none"
                stroke={C.gold} strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${(73 / 100) * 138} 138`} />
            </svg>
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: C.primary, lineHeight: 1 }}>73</span>
              <span style={{ fontSize: 8, color: C.sage }}>/100</span>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            {[
              { label: 'Format & struktur', val: 92 },
              { label: 'ATS keywords',      val: 68 },
              { label: 'Quantified impact', val: 51 },
              { label: 'Portfolio link',    val: 40 },
            ].map(b => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 9, color: C.sage, width: 90, flexShrink: 0 }}>{b.label}</span>
                <div style={{ flex: 1, height: 4, background: C.border, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{
                    width: `${b.val}%`, height: '100%',
                    background: b.val >= 80 ? C.primary : b.val >= 60 ? C.gold : '#8B3E2A',
                    borderRadius: 2,
                  }} />
                </div>
                <span style={{ fontSize: 9, color: C.sage, width: 16, textAlign: 'right' }}>{b.val}</span>
              </div>
            ))}
          </div>
        </div>

        <button style={{
          width: '100%', padding: '8px', background: C.primary, color: C.paper,
          border: 'none', borderRadius: 10, fontSize: 12, fontWeight: 700,
          cursor: 'pointer', fontFamily: 'inherit',
        }}>
          Mulai dari bagian yang paling berdampak
        </button>
      </div>

      {/* Badge: +14 poin */}
      <div style={{
        position: 'absolute', top: 16, right: 0,
        background: C.primary, borderRadius: 12, padding: '6px 12px',
        boxShadow: `0 8px 24px ${C.primary}40`,
        display: 'flex', alignItems: 'center', gap: 6,
        animation: 'tbFloat 5s 1.5s ease-in-out infinite',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.paper }}>↑ +14 poin</span>
        <span style={{ fontSize: 10, color: `${C.paper}70` }}>Setelah revisi</span>
      </div>

    </div>
  )
}

export default function TamboHero() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes tbFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes tbFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .tb-a1 { animation: tbFadeUp 0.55s 0.05s ease both; }
        .tb-a2 { animation: tbFadeUp 0.55s 0.15s ease both; }
        .tb-a3 { animation: tbFadeUp 0.55s 0.25s ease both; }
        .tb-a4 { animation: tbFadeUp 0.55s 0.38s ease both; }
        .tb-a5 { animation: tbFadeUp 0.55s 0.50s ease both; }
        .tb-a6 { animation: tbFadeUp 0.70s 0.30s ease both; }

        .tb-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        .tb-hero-visual { display: none; }

        @media (min-width: 900px) {
          .tb-hero-grid { grid-template-columns: 1fr 1fr; }
          .tb-hero-visual { display: block; }
        }

        .tb-section-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .tb-section-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .tb-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }
        @media (min-width: 640px) {
          .tb-features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (min-width: 900px) {
          .tb-features-grid { grid-template-columns: repeat(3, 1fr); }
        }

        .tb-compare-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 700px) {
          .tb-compare-grid { grid-template-columns: 1fr 1fr; }
        }

        .tb-privacy-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        @media (min-width: 700px) {
          .tb-privacy-grid { grid-template-columns: 1fr 1fr; }
        }

        .tb-nav-link {
          font-size: 13px; font-weight: 500;
          color: rgba(250,246,236,0.65);
          text-decoration: none;
          transition: color 0.15s;
        }
        .tb-nav-link:hover { color: rgba(250,246,236,1); }

        .tb-cta-gold {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 22px;
          background: ${C.gold}; color: ${C.primary};
          border: none; border-radius: 12px;
          font-family: inherit; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.18s;
          text-decoration: none; letter-spacing: 0.01em;
        }
        .tb-cta-gold:hover { background: #a8883e; transform: translateY(-1px); box-shadow: 0 8px 24px ${C.gold}40; }

        .tb-cta-ghost-light {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 12px 20px;
          background: transparent; color: rgba(250,246,236,0.75);
          border: 1.5px solid rgba(250,246,236,0.2); border-radius: 12px;
          font-family: inherit; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
          text-decoration: none;
        }
        .tb-cta-ghost-light:hover { border-color: rgba(250,246,236,0.5); color: rgba(250,246,236,1); }

        .tb-cta-primary {
          display: inline-flex; align-items: center;
          padding: 12px 22px;
          background: ${C.primary}; color: ${C.paper};
          border: none; border-radius: 12px;
          font-family: inherit; font-size: 14px; font-weight: 700;
          cursor: pointer; transition: all 0.18s;
          text-decoration: none;
        }
        .tb-cta-primary:hover { background: ${C.primaryHover}; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(27,67,50,0.25); }

        .tb-cta-outline {
          display: inline-flex; align-items: center;
          padding: 12px 20px;
          background: transparent; color: ${C.primary};
          border: 1.5px solid ${C.border}; border-radius: 12px;
          font-family: inherit; font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all 0.18s;
          text-decoration: none;
        }
        .tb-cta-outline:hover { border-color: ${C.primary}; background: ${C.primary}06; }

        .tb-step-card {
          background: ${C.paper}; border: 1px solid ${C.border};
          border-radius: 18px; padding: 24px;
        }

        .tb-feature-card {
          background: ${C.paper}; border: 1px solid ${C.border};
          border-radius: 18px; padding: 22px;
          display: flex; flex-direction: column; gap: 8px;
        }

        .tb-privacy-item {
          display: flex; align-items: flex-start; gap: 12px;
        }

        .uni-scroll {
          display: flex; gap: 28px; align-items: center;
          overflow-x: auto; padding-bottom: 4px;
          scrollbar-width: none;
        }
        .uni-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{ fontFamily: 'inherit', background: C.bg, color: C.ink, position: 'relative' }}>

        {/* ── DARK HERO SECTION ─────────────────────── */}
        <div style={{ background: C.primary, position: 'relative', overflow: 'hidden' }}>
          {/* Background triangle decoration */}
          <div style={{
            position: 'absolute', right: '-5%', top: '-10%',
            width: '45%', height: '120%',
            background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 400 500" fill="none" style={{ width: '100%', height: '100%', opacity: 0.07 }}>
              <path d="M200 20L390 480H10L200 20Z" fill="white" />
            </svg>
          </div>

          {/* NAV */}
          <nav style={{
            position: 'sticky', top: 0, zIndex: 50,
            height: 60, padding: '0 24px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: `${C.primary}F0`,
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <path d="M10 3L18.5 17H1.5L10 3Z" fill={C.gold} />
              </svg>
              <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: C.paper }}>tambo</span>
            </div>

            <div className="tb-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <a href="#cara-kerja" className="tb-nav-link">Cara kerja</a>
              <a href="#fitur" className="tb-nav-link">Produk</a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Link href="/login" style={{
                padding: '7px 15px', color: `${C.paper}80`,
                border: `1.5px solid rgba(250,246,236,0.2)`, borderRadius: 8,
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.15s',
              }}>Masuk</Link>
              <Link href="/register" className="tb-cta-gold" style={{ padding: '7px 15px', fontSize: 13 }}>
                Cek CV gratis →
              </Link>
            </div>
          </nav>

          {/* HERO CONTENT */}
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px 88px' }}>
            <div className="tb-hero-grid">

              {/* LEFT */}
              <div style={{ maxWidth: 540 }}>
                {/* Kicker */}
                <div className="tb-a1" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  background: `${C.gold}18`, border: `1px solid ${C.gold}35`,
                  borderRadius: 100, padding: '5px 14px', marginBottom: 24,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.gold, display: 'inline-block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: C.gold }}>AI Career Coach · Fresh Grad Indonesia</span>
                </div>

                {/* Headline */}
                <h1 className="tb-a2" style={{ marginBottom: 20 }}>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(30px, 5.5vw, 50px)',
                    fontWeight: 800, lineHeight: 1.15,
                    letterSpacing: '-0.03em', color: C.paper,
                  }}>
                    Sudah apply banyak kerjaan,
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: 'clamp(28px, 5vw, 46px)',
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontWeight: 300, fontStyle: 'italic',
                    lineHeight: 1.25, color: C.gold,
                  }}>
                    tapi belum dipanggil?
                  </span>
                </h1>

                {/* Sub */}
                <p className="tb-a3" style={{
                  fontSize: 'clamp(13px, 2vw, 15.5px)',
                  lineHeight: 1.75, color: `${C.paper}70`, marginBottom: 32,
                }}>
                  Tambo bantu kamu cek CV, menemukan bagian yang kurang kuat, dan memperbaikinya jadi lebih jelas, relevan, dan siap dilirik recruiter.
                </p>

                {/* CTAs */}
                <div className="tb-a4" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
                  <Link href="/cv" className="tb-cta-gold">Cek CV Gratis →</Link>
                  <Link href="/cv" className="tb-cta-ghost-light">Lihat Contoh Analisis</Link>
                </div>

                {/* Early user CTA */}
                <div className="tb-a5" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: C.gold, display: 'inline-block', flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: `${C.paper}70` }}>
                    Jadilah early user Tambo — gratis.
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="tb-hero-visual tb-a6">
                <AICoachCard />
              </div>

            </div>
          </div>
        </div>

        {/* ── TAGLINE STRIP ─────────────────────────── */}
        <div style={{ background: C.bg, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: 13, color: C.sage }}>
              Dirancang untuk fresh grad dari{' '}
              <span style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontStyle: 'italic', fontWeight: 300, color: C.ink,
              }}>kampus mana pun.</span>
            </p>
          </div>
        </div>

        {/* ── CARA KERJA ────────────────────────────── */}
        <section id="cara-kerja" style={{ background: C.bg }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Cara Kerja</p>
              <h2 style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(22px, 3.5vw, 32px)',
                fontWeight: 300, fontStyle: 'italic', color: C.ink, lineHeight: 1.3,
              }}>
                Dari CV mentah ke{' '}
                <span style={{ color: C.primary }}>siap interview</span>
                , dalam tiga langkah.
              </h2>
              <p style={{ fontSize: 14, color: C.sage, marginTop: 10, maxWidth: 480, lineHeight: 1.7 }}>
                Tidak ada jargon, tidak ada theory karier panjang. Hanya saran konkret yang bisa kamu terapkan langsung.
              </p>
            </div>

            <div className="tb-section-grid">
              {[
                {
                  num: '01',
                  icon: '↑',
                  title: 'Upload CV-mu',
                  desc: 'PDF atau DOCX. Tambahkan link LinkedIn kalau ada — biar analisis lebih akurat.',
                },
                {
                  num: '02',
                  icon: '◎',
                  title: 'Tambo menganalisis',
                  desc: 'Skor CV, breakdown 6 dimensi, deteksi bagian yang berdampak. Estimasi 15 detik.',
                },
                {
                  num: '03',
                  icon: '✓',
                  title: 'Perbaiki bareng',
                  desc: 'Klik "Terapkan" pada saran yang masuk akal. Edit dulu kalau perlu. Selesai.',
                },
              ].map(s => (
                <div key={s.num} className="tb-step-card">
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: `${C.primary}10`, border: `1px solid ${C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: C.primary, marginBottom: 16,
                  }}>{s.icon}</div>
                  <p style={{ fontSize: 10, fontWeight: 700, color: C.sage, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{s.num}</p>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{s.title}</p>
                  <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.65 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SEBELUM & SESUDAH ─────────────────────── */}
        <section style={{ background: `${C.paper}`, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Sebelum & Sesudah</p>
              <h2 style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 300, color: C.ink, lineHeight: 1.4,
              }}>
                Bedanya bukan di kata-kata besar.{' '}
                <span style={{ fontStyle: 'italic', color: C.primary }}>Bedanya di angka dan konteks.</span>
              </h2>
              <p style={{ fontSize: 13, color: C.sage, marginTop: 8 }}>
                Recruiter rata-rata melihat CV selama 6 detik. Setiap bullet harus bekerja keras.
              </p>
            </div>

            <div className="tb-compare-grid">
              {/* Before */}
              <div style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: 18, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.sage, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sebelum · Skor 73</span>
                  <span style={{ fontSize: 10, background: '#8B3E2A15', color: '#8B3E2A', padding: '3px 8px', borderRadius: 20, fontWeight: 600 }}>Generic, tidak spesifik</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 4 }}>UI/UX Intern · Startup ABC</p>
                <p style={{ fontSize: 11, color: C.sage, marginBottom: 10 }}>Jul — Des 2024</p>
                {[
                  'Redesign aplikasi mobile dari awal sampai akhir',
                  'Membantu tim dalam membuat tampilan halaman utama',
                  'Berkolaborasi dengan developer untuk implementasi',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: '#8B3E2A', fontSize: 12, flexShrink: 0 }}>✗</span>
                    <span style={{ fontSize: 12, color: C.sage, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>

              {/* After */}
              <div style={{ background: C.bg, border: `1.5px solid ${C.primary}30`, borderRadius: 18, padding: 22 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: C.sage, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sesudah · Skor 87</span>
                  <span style={{ fontSize: 10, background: `${C.primary}12`, color: C.primary, padding: '3px 8px', borderRadius: 20, fontWeight: 600 }}>✓ Specific, quantified</span>
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 4 }}>UI/UX Designer Intern · Startup ABC</p>
                <p style={{ fontSize: 11, color: C.sage, marginBottom: 10 }}>Jul — Des 2024 · 6 BULAN, 24 JAM/MINGGU</p>
                {[
                  'Desain ulang 24 halaman aplikasi mobile (auth, browse, detail) dengan design system 32 komponen di Figma',
                  'Naikkan sign-up completion 23% lewat A/B test 3 varian onboarding (n=8.000)',
                  'Kolaborasi 1:1 dengan 4 engineer Flutter — handoff 12 fitur shipped tepat waktu',
                ].map((t, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                    <span style={{ color: C.primary, fontSize: 12, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 12, color: C.ink, lineHeight: 1.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/cv" className="tb-cta-gold">Cek CV kamu →</Link>
            </div>
          </div>
        </section>

        {/* ── FITUR ─────────────────────────────────── */}
        <section id="fitur" style={{ background: C.bg }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 24px' }}>
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Yang Tambo Bisa Bantu</p>
              <h2 style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 300, fontStyle: 'italic', color: C.ink, lineHeight: 1.3,
              }}>Lebih dari sekadar <em>resume parser.</em></h2>
              <p style={{ fontSize: 13, color: C.sage, marginTop: 8, maxWidth: 480, lineHeight: 1.65 }}>
                Tambo dirancang untuk fresh grad — bukan profesional 10 tahun. Bahasa, contoh, dan saran disesuaikan dengan konteks Indonesia.
              </p>
            </div>

            <div className="tb-features-grid">
              {[
                {
                  badge: 'Live',
                  title: 'CV Optimizer',
                  subtitle: 'Skor objektif, saran konkret.',
                  desc: 'Dianalisis berdasarkan standar rekrutmen terkini. Hasilnya: bagian mana yang membuat recruiter ragu, dan persis bagaimana memperbaikinya.',
                  href: '/cv',
                },
                {
                  badge: 'Segera',
                  title: 'Job Match',
                  subtitle: 'Lowongan yang cocok untukmu.',
                  desc: 'Lowongan fresh grad-friendly, diperbarui rutin dan dicocokkan dengan skill kamu.',
                  href: null,
                },
                {
                  badge: 'Segera',
                  title: 'Interview Coach',
                  subtitle: 'Latihan jawab, tanpa malu.',
                  desc: 'Simulasi pertanyaan HR + teknikal. Dapat feedback langsung soal struktur jawaban.',
                  href: null,
                },
                {
                  badge: 'Segera',
                  title: 'Tracker Lamaran',
                  subtitle: 'Satu tempat, semua lamaran.',
                  desc: 'Track status, follow-up reminder, dan catatan interview — gak hilang di chat WhatsApp.',
                  href: null,
                },
                {
                  badge: 'Segera',
                  title: 'Skill Path',
                  subtitle: 'Pelajari yang dibutuhkan.',
                  desc: 'Saran kursus berbasis gap skill di CV-mu vs lowongan yang kamu incar.',
                  href: null,
                },
              ].map(f => (
                <div key={f.title} className="tb-feature-card" style={{ opacity: f.badge === 'Live' ? 1 : 0.7 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      background: f.badge === 'Live' ? `${C.primary}12` : `${C.gold}15`,
                      color: f.badge === 'Live' ? C.primary : '#7A5010',
                      padding: '3px 8px', borderRadius: 20,
                    }}>{f.badge}</span>
                  </div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{f.title}</p>
                  <p style={{
                    fontFamily: 'var(--font-fraunces), Georgia, serif',
                    fontStyle: 'italic', fontWeight: 300,
                    fontSize: 13, color: C.primary,
                  }}>{f.subtitle}</p>
                  <p style={{ fontSize: 12, color: C.sage, lineHeight: 1.65 }}>{f.desc}</p>
                  {f.href && (
                    <Link href={f.href} style={{
                      fontSize: 12, fontWeight: 700, color: C.primary,
                      textDecoration: 'none', marginTop: 4,
                    }}>Coba sekarang →</Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRIVACY ───────────────────────────────── */}
        <section style={{ background: C.paper, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '64px 24px' }}>
            <div className="tb-privacy-grid">
              <div>
                <p style={{ fontSize: 10, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Privasi · Trust</p>
                <h2 style={{
                  fontFamily: 'var(--font-fraunces), Georgia, serif',
                  fontSize: 'clamp(22px, 3.5vw, 32px)',
                  fontWeight: 300, color: C.ink, lineHeight: 1.35, marginBottom: 16,
                }}>
                  Data CV kamu,{' '}
                  <span style={{ fontStyle: 'italic', color: C.primary }}>milik kamu.</span>
                </h2>
                <p style={{ fontSize: 13, color: C.sage, lineHeight: 1.7, marginBottom: 24 }}>
                  Tambo tidak membagikan CV kamu ke recruiter tanpa izin eksplisit. Kamu bisa menghapus akun + semua data kapan saja, satu klik.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <Link href="/register" className="tb-cta-primary">Mulai gratis</Link>
                  <Link href="/privacy" className="tb-cta-outline">Baca kebijakan privasi</Link>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: '🔒', title: 'Enkripsi end-to-end', desc: 'Semua upload CV dienkripsi saat transit & rest. Server tidak menyimpan PDF dalam plaintext.' },
                  { icon: '🚫', title: 'Tidak dibagikan tanpa izin', desc: 'CV kamu hanya kamu lihat. Tambo tidak menjual data ke job board atau recruiter.' },
                  { icon: '⚙️', title: 'Kontrol penuh', desc: 'Export data anytime. Delete akun + semua data dalam 30 detik. No retention dark pattern.' },
                  { icon: '🤖', title: 'AI yang dilatih bukan dari CV-mu', desc: 'Tambo TIDAK pakai CV pengguna untuk training model. AI dilatih dari dataset publik + JD aktif.' },
                ].map(p => (
                  <div key={p.title} className="tb-privacy-item">
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: `${C.primary}08`, border: `1px solid ${C.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, flexShrink: 0,
                    }}>{p.icon}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 2 }}>{p.title}</p>
                      <p style={{ fontSize: 12, color: C.sage, lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────── */}
        <section style={{ background: C.bg, padding: '0 24px 80px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 64 }}>
            <div style={{
              background: C.primary, borderRadius: 28,
              padding: '56px 48px', textAlign: 'center',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: `radial-gradient(ellipse 60% 80% at 85% 50%, rgba(184,152,88,0.08) 0%, transparent 60%)`,
              }} />
              <p style={{ fontSize: 11, fontWeight: 700, color: C.gold, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>
                Gratis untuk fitur dasar · tanpa kartu kredit
              </p>
              <h2 style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 300, color: `${C.paper}F0`,
                lineHeight: 1.25, marginBottom: 10,
              }}>
                Temukan jalanmu,
              </h2>
              <h2 style={{
                fontFamily: 'var(--font-fraunces), Georgia, serif',
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 300, fontStyle: 'italic', color: C.gold,
                lineHeight: 1.25, marginBottom: 20,
              }}>
                satu langkah dari sini.
              </h2>
              <p style={{ fontSize: 14, color: `${C.paper}60`, marginBottom: 32, lineHeight: 1.7 }}>
                Tambo sedang dalam tahap awal. Daftar dan bantu bentuk produknya.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/cv" className="tb-cta-gold">Cek CV gratis sekarang →</Link>
                <Link href="/register" className="tb-cta-ghost-light">Lihat demo dulu</Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────── */}
        <footer style={{
          borderTop: `1px solid ${C.border}`, padding: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L18.5 17H1.5L10 3Z" fill={C.sage} />
            </svg>
            <span style={{ fontSize: 13, fontWeight: 600, color: C.sage }}>tambo</span>
          </div>
          <p style={{ fontSize: 12, color: `${C.sage}70` }}>© 2025 Tambo.id — AI Career Coach untuk Fresh Grad Indonesia</p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[['Cara kerja', '#cara-kerja'], ['Produk', '#fitur'], ['Masuk', '/login'], ['Daftar', '/register']].map(([label, href]) => (
              <a key={label} href={href} style={{ fontSize: 12, color: C.sage, textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  )
}
