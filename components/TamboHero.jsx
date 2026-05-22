import { useState, useEffect } from "react";

const C = {
  primary: "#1B4332",
  mid: "#2D6A4F",
  accent: "#D4A853",
  bg: "#FAFAF8",
  text: "#1A1A1A",
  sec: "#6B7280",
  border: "#E5E0D8",
};

function FloatingCVCard() {
  const gaps = [
    { name: "SQL & Data Analysis", color: "#EF4444" },
    { name: "Portfolio Proyek Nyata", color: "#F59E0B" },
    { name: "LinkedIn Optimization", color: "#3B82F6" },
  ];

  return (
    <div style={{ position: "relative", padding: "48px 24px" }}>
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "10%", right: "8%",
        width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.accent}20 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "8%", left: "4%",
        width: 160, height: 160, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}14 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Decorative ring */}
      <div style={{
        position: "absolute", top: "18%", right: "14%",
        width: 80, height: 80, borderRadius: "50%",
        border: `1.5px dashed ${C.accent}40`,
        pointerEvents: "none",
      }} />

      {/* Main Card */}
      <div style={{
        background: "white",
        borderRadius: 24,
        padding: "24px",
        boxShadow: "0 28px 70px rgba(27,67,50,0.11), 0 4px 16px rgba(0,0,0,0.05)",
        animation: "tbFloat 6s ease-in-out infinite",
        position: "relative",
        maxWidth: 305,
        margin: "0 auto",
      }}>
        {/* Profile row */}
        <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 800, fontSize: 15, flexShrink: 0,
          }}>R</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: C.text }}>Rizky Pratama</div>
            <div style={{ fontSize: 11.5, color: C.sec, marginTop: 1 }}>UI/UX Design · Universitas Indonesia</div>
          </div>
        </div>

        {/* CV Score */}
        <div style={{
          background: `linear-gradient(135deg, ${C.primary}08, ${C.accent}14)`,
          borderRadius: 14, padding: "12px 14px", marginBottom: 14,
        }}>
          <div style={{ fontSize: 10.5, color: C.sec, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
            CV Score
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginBottom: 8 }}>
            <span style={{ fontSize: 30, fontWeight: 800, color: C.primary, lineHeight: 1 }}>73</span>
            <span style={{ fontSize: 13, color: C.sec, paddingBottom: 3 }}>/100</span>
            <span style={{
              marginLeft: "auto", alignSelf: "center",
              background: `${C.accent}28`, color: "#7A5010",
              fontSize: 10.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
            }}>Bisa lebih baik</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: "#EAE5DB", overflow: "hidden" }}>
            <div style={{ width: "73%", height: "100%", background: `linear-gradient(90deg, ${C.primary}, ${C.mid})`, borderRadius: 3 }} />
          </div>
        </div>

        {/* Skill Gaps */}
        <div style={{ fontSize: 10.5, fontWeight: 700, color: C.sec, marginBottom: 9, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Skill Gap Ditemukan · 3
        </div>
        {gaps.map((g, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "7px 0",
            borderBottom: i < gaps.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: C.text, flex: 1 }}>{g.name}</span>
            <span style={{
              fontSize: 9.5, fontWeight: 700, color: g.color,
              background: `${g.color}18`, padding: "2px 8px", borderRadius: 20,
            }}>Gap</span>
          </div>
        ))}
      </div>

      {/* Badge: CV Dioptimasi */}
      <div style={{
        position: "absolute", top: 24, left: 4,
        background: "white", borderRadius: 14, padding: "7px 13px",
        boxShadow: "0 8px 28px rgba(0,0,0,0.1)",
        display: "flex", alignItems: "center", gap: 7,
        animation: "tbFloat 5s 1.5s ease-in-out infinite",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: 14 }}>✅</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: C.text }}>CV Dioptimasi</span>
      </div>

      {/* Badge: Siap Interview */}
      <div style={{
        position: "absolute", bottom: 24, right: 4,
        background: C.primary, borderRadius: 14, padding: "7px 13px",
        boxShadow: `0 8px 28px ${C.primary}45`,
        display: "flex", alignItems: "center", gap: 7,
        animation: "tbFloat 7s 0.5s ease-in-out infinite",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: 14 }}>🎯</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "white" }}>Siap Interview</span>
      </div>
    </div>
  );
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────
// 1. Buat form di https://tally.so — tambahkan hidden fields: "name" dan "email"
// 2. Salin form ID dari URL Tally (contoh: tally.so/r/w7KXYZ → ID = "w7KXYZ")
// 3. Ganti nilai di bawah:
const TALLY_FORM_ID = "2EDK6b"; // ← GANTI INI
// ─────────────────────────────────────────────────────────────────────────────

export default function TamboHero() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);

    // Load Tally embed script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) return;

    // Pastikan Tally script sudah load
    if (!window.Tally) {
      setError("Koneksi gagal — coba refresh halaman.");
      return;
    }

    setLoading(true);

    // Buka Tally popup dengan hidden fields — data langsung tersimpan di dashboard Tally
    window.Tally.openPopup(TALLY_FORM_ID, {
      layout: "modal",
      hiddenFields: { name: name.trim(), email: email.trim() },
      autoClose: 800,
      onSubmit: () => {
        setLoading(false);
        setSubmitted(true);
      },
      onClose: () => {
        // User tutup popup tanpa submit → reset loading
        setLoading(false);
      },
    });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes tbFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        @keyframes tbFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes tbSpin { to { transform: rotate(360deg); } }

        .tb-a1 { animation: tbFadeUp 0.55s 0.1s ease both; }
        .tb-a2 { animation: tbFadeUp 0.55s 0.2s ease both; }
        .tb-a3 { animation: tbFadeUp 0.55s 0.32s ease both; }
        .tb-a4 { animation: tbFadeUp 0.55s 0.46s ease both; }
        .tb-a5 { animation: tbFadeUp 0.55s 0.60s ease both; }
        .tb-a6 { animation: tbFadeUp 0.75s 0.35s ease both; }

        .tb-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #E5E0D8; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px;
          background: white; color: #1A1A1A;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
        }
        .tb-input:focus { border-color: #1B4332; box-shadow: 0 0 0 3px rgba(27,67,50,0.1); }
        .tb-input::placeholder { color: #9CA3AF; }

        .tb-btn {
          width: 100%; padding: 14px;
          background: #1B4332; color: white; border: none; border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: 0.01em;
        }
        .tb-btn:hover:not(:disabled) {
          background: #163829; transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(27,67,50,0.28);
        }
        .tb-btn:active:not(:disabled) { transform: none; box-shadow: none; }
        .tb-btn:disabled { opacity: 0.72; cursor: not-allowed; }

        .tb-navbtn {
          padding: 9px 18px; background: transparent;
          border: 1.5px solid #1B4332; border-radius: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 13px; font-weight: 600; color: #1B4332;
          cursor: pointer; transition: all 0.18s;
        }
        .tb-navbtn:hover { background: #1B4332; color: white; }

        .tb-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          align-items: center;
        }
        .tb-visual { display: none; }

        @media (min-width: 900px) {
          .tb-grid { grid-template-columns: 1fr 1fr; }
          .tb-visual { display: block; }
        }

        .tb-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white; border-radius: 50%;
          animation: tbSpin 0.7s linear infinite; flex-shrink: 0;
        }
      `}</style>

      <div style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: C.bg, minHeight: "100vh",
        color: C.text, position: "relative", overflow: "hidden",
      }}>

        {/* Ambient gradient background */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 55% at 8% 8%, ${C.accent}0E 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 92% 88%, ${C.primary}09 0%, transparent 60%)
          `,
        }} />

        {/* ── NAV ─────────────────────────────── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          height: 60, padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(250,250,248,0.88)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(229,224,216,0.65)",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: `linear-gradient(135deg, ${C.primary}, ${C.mid})`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="8,1.5 13.5,6 8,10.5 2.5,6" fill={C.accent} />
                <polygon points="8,6.5 13.5,11 8,14.5 2.5,11" fill="rgba(255,255,255,0.42)" />
              </svg>
            </div>
            <span style={{
              fontSize: 18, fontWeight: 800,
              letterSpacing: "-0.025em", color: C.primary,
            }}>tambo</span>
          </div>

          <button className="tb-navbtn">Daftar Waitlist</button>
        </nav>

        {/* ── HERO ────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 88px" }}>
            <div className="tb-grid">

              {/* LEFT: Copy + Form */}
              <div style={{ maxWidth: 520 }}>

                {/* Tag chip */}
                <div className="tb-a1" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: `${C.accent}1A`, border: `1px solid ${C.accent}44`,
                  borderRadius: 100, padding: "5px 14px",
                  fontSize: 12, fontWeight: 600, color: "#7A5010",
                  marginBottom: 22,
                }}>
                  <span style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: C.accent, display: "inline-block", flexShrink: 0,
                  }} />
                  AI Career Coach untuk Fresh Grad Indonesia
                </div>

                {/* Headline */}
                <h1 className="tb-a2" style={{
                  fontSize: "clamp(28px, 5.5vw, 50px)",
                  fontWeight: 800, lineHeight: 1.18,
                  letterSpacing: "-0.03em", marginBottom: 20,
                }}>
                  Nggak dipanggil lagi.{" "}
                  <span style={{ color: C.primary, position: "relative", display: "inline" }}>
                    Kita cari tahu kenapa.
                    {/* Decorative underline */}
                    <svg
                      viewBox="0 0 240 10" fill="none"
                      style={{
                        position: "absolute", bottom: -4, left: 0,
                        width: "100%", overflow: "visible",
                      }}
                      preserveAspectRatio="none" height="8"
                    >
                      <path
                        d="M2 7C48 1 96 9 144 5C184 1 220 8 238 5"
                        stroke={C.accent} strokeWidth="3" strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Sub-headline */}
                <p className="tb-a3" style={{
                  fontSize: "clamp(14px, 2.2vw, 16.5px)",
                  lineHeight: 1.72, color: C.sec, marginBottom: 32,
                }}>
                  Bukan karena kamu nggak kompeten — mungkin CV-mu belum cerita yang bener tentang kamu.{" "}
                  <strong style={{ color: C.text, fontWeight: 600 }}>
                    Tambo bantu kamu benerin itu
                  </strong>
                  , dari CV sampai siap interview.
                </p>

                {/* Form / Success state */}
                {!submitted ? (
                  <form
                    className="tb-a4"
                    onSubmit={handleSubmit}
                    style={{ display: "flex", flexDirection: "column", gap: 10 }}
                  >
                    <input
                      className="tb-input"
                      type="text"
                      placeholder="Nama kamu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      autoComplete="name"
                    />
                    <input
                      className="tb-input"
                      type="email"
                      placeholder="Email aktif kamu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                    />
                    <button className="tb-btn" type="submit" disabled={loading}>
                      {loading ? (
                        <><div className="tb-spinner" />Membuka form...</>
                      ) : (
                        "Mulai Gratis →"
                      )}
                    </button>
                    {error && (
                      <div style={{
                        fontSize: 13, color: "#DC2626", textAlign: "center",
                        padding: "8px 12px", background: "#FEF2F2",
                        borderRadius: 8, border: "1px solid #FECACA",
                      }}>
                        {error}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="tb-a4" style={{
                    background: `${C.primary}0E`,
                    border: `1.5px solid ${C.primary}28`,
                    borderRadius: 16, padding: "22px 24px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.primary, marginBottom: 5 }}>
                      Yes! Kamu udah masuk waitlist!
                    </div>
                    <div style={{ fontSize: 13.5, color: C.sec, lineHeight: 1.65 }}>
                      Kami akan kabarin kamu duluan waktu Tambo launch.<br />
                      Pantau email kamu ya! 📩
                    </div>
                  </div>
                )}

                {/* Social proof */}
                <div className="tb-a5" style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Avatar stack */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[
                      { bg: C.primary, l: "R" },
                      { bg: "#4A7C59", l: "A" },
                      { bg: C.accent, l: "D" },
                      { bg: "#7C6A3E", l: "F" },
                      { bg: "#2D5A3D", l: "S" },
                    ].map((a, i) => (
                      <div key={i} style={{
                        width: 28, height: 28, borderRadius: "50%",
                        background: a.bg,
                        border: `2.5px solid ${C.bg}`,
                        marginLeft: i > 0 ? -10 : 0,
                        position: "relative", zIndex: 5 - i,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 800, color: "white",
                      }}>{a.l}</div>
                    ))}
                  </div>
                  <span style={{ fontSize: 13, color: C.sec }}>
                    <strong style={{ color: C.text, fontWeight: 700 }}>Daftar pertama</strong>
                    {", dapat akses early"}
                  </span>
                </div>

                {/* Free note */}
                <div className="tb-a5" style={{
                  marginTop: 10,
                  display: "flex", alignItems: "center", flexWrap: "wrap",
                  gap: "6px 16px", fontSize: 12, color: C.sec,
                }}>
                  {["Gratis untuk fitur dasar", "Tanpa kartu kredit"].map((t, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="#22C55E" />
                        <path
                          d="M3.5 6L5.5 8L8.5 4"
                          stroke="#22C55E" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Floating CV Card (desktop only) */}
              <div className="tb-visual tb-a6">
                <FloatingCVCard />
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
