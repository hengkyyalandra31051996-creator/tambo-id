import { useState, useEffect } from "react";
import Link from "next/link";

const C = {
  primary: "#124136",
  primaryHover: "#0e3229",
  sage: "#5E6B53",
  gold: "#C89B4C",
  bg: "#F7F3EC",
  paper: "#FAF6EC",
  ink: "#1A1A1A",
  border: "#E8E2D6",
};

function FloatingCVCard() {
  const gaps = [
    { name: "SQL & Data Analysis",    color: "#8B3E2A" },
    { name: "Portfolio Proyek Nyata", color: "#9B6A1F" },
    { name: "LinkedIn Optimization",  color: "#3B82F6" },
  ];

  return (
    <div style={{ position: "relative", padding: "48px 24px" }}>
      {/* Ambient glows */}
      <div style={{
        position: "absolute", top: "10%", right: "8%",
        width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.gold}20 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "8%", left: "4%",
        width: 160, height: 160, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.primary}12 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {/* Decorative ring */}
      <div style={{
        position: "absolute", top: "18%", right: "14%",
        width: 80, height: 80, borderRadius: "50%",
        border: `1.5px dashed ${C.gold}40`,
        pointerEvents: "none",
      }} />

      {/* Main Card */}
      <div style={{
        background: C.paper,
        borderRadius: 20,
        padding: "22px",
        boxShadow: `0 28px 64px rgba(18,65,54,0.13), 0 4px 16px rgba(0,0,0,0.04)`,
        border: `1px solid ${C.border}`,
        animation: "tbFloat 6s ease-in-out infinite",
        position: "relative",
        maxWidth: 300,
        margin: "0 auto",
      }}>
        {/* Profile row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            background: C.primary,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.paper, fontWeight: 800, fontSize: 14, flexShrink: 0,
          }}>R</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, color: C.ink }}>Rizky Pratama</div>
            <div style={{ fontSize: 11, color: C.sage, marginTop: 1 }}>UI/UX Design · Universitas Indonesia</div>
          </div>
        </div>

        {/* CV Score */}
        <div style={{
          background: `${C.primary}09`,
          border: `1px solid ${C.border}`,
          borderRadius: 12, padding: "11px 13px", marginBottom: 12,
        }}>
          <div style={{
            fontSize: 10, color: C.sage, marginBottom: 4,
            textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 700,
          }}>CV Score</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginBottom: 7 }}>
            <span style={{ fontSize: 29, fontWeight: 800, color: C.primary, lineHeight: 1 }}>73</span>
            <span style={{ fontSize: 12, color: C.sage, paddingBottom: 3 }}>/100</span>
            <span style={{
              marginLeft: "auto", alignSelf: "center",
              background: `${C.gold}22`, color: "#7A5010",
              fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20,
            }}>Bisa lebih baik</span>
          </div>
          <div style={{ height: 5, borderRadius: 3, background: C.border, overflow: "hidden" }}>
            <div style={{
              width: "73%", height: "100%", borderRadius: 3,
              background: `linear-gradient(90deg, ${C.primary}, #1d5e4a)`,
            }} />
          </div>
        </div>

        {/* Skill Gaps */}
        <div style={{
          fontSize: 10, fontWeight: 700, color: C.sage, marginBottom: 8,
          textTransform: "uppercase", letterSpacing: "0.07em",
        }}>Skill Gap Ditemukan · 3</div>
        {gaps.map((g, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "6px 0",
            borderBottom: i < gaps.length - 1 ? `1px solid ${C.border}` : "none",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, color: C.ink, flex: 1 }}>{g.name}</span>
            <span style={{
              fontSize: 9, fontWeight: 700, color: g.color,
              background: `${g.color}15`, padding: "2px 7px", borderRadius: 20,
            }}>Gap</span>
          </div>
        ))}
      </div>

      {/* Badge: CV Dioptimasi */}
      <div style={{
        position: "absolute", top: 24, left: 4,
        background: C.paper, borderRadius: 12, padding: "6px 12px",
        boxShadow: `0 8px 24px rgba(18,65,54,0.12)`,
        border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", gap: 6,
        animation: "tbFloat 5s 1.5s ease-in-out infinite",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: 13 }}>✅</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.ink }}>CV Dioptimasi</span>
      </div>

      {/* Badge: Siap Interview */}
      <div style={{
        position: "absolute", bottom: 24, right: 4,
        background: C.primary, borderRadius: 12, padding: "6px 12px",
        boxShadow: `0 8px 24px ${C.primary}40`,
        display: "flex", alignItems: "center", gap: 6,
        animation: "tbFloat 7s 0.5s ease-in-out infinite",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: 13 }}>🎯</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: C.paper }}>Siap Interview</span>
      </div>
    </div>
  );
}

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const TALLY_FORM_ID = "2EDK6b";
// ─────────────────────────────────────────────────────────────────────────────

export default function TamboHero() {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src   = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim()) return;
    if (!window.Tally) { setError("Koneksi gagal — coba refresh halaman."); return; }
    setLoading(true);
    window.Tally.openPopup(TALLY_FORM_ID, {
      layout: "modal",
      hiddenFields: { name: name.trim(), email: email.trim() },
      autoClose: 800,
      onSubmit: () => { setLoading(false); setSubmitted(true); },
      onClose:  () => { setLoading(false); },
    });
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes tbFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-14px); }
        }
        @keyframes tbFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tbSpin { to { transform: rotate(360deg); } }

        .tb-a1 { animation: tbFadeUp 0.55s 0.10s ease both; }
        .tb-a2 { animation: tbFadeUp 0.55s 0.20s ease both; }
        .tb-a3 { animation: tbFadeUp 0.55s 0.32s ease both; }
        .tb-a4 { animation: tbFadeUp 0.55s 0.46s ease both; }
        .tb-a5 { animation: tbFadeUp 0.55s 0.60s ease both; }
        .tb-a6 { animation: tbFadeUp 0.75s 0.35s ease both; }

        .tb-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid ${C.border}; border-radius: 12px;
          font-family: inherit; font-size: 15px;
          background: ${C.paper}; color: ${C.ink};
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
        }
        .tb-input:focus {
          border-color: ${C.primary};
          box-shadow: 0 0 0 3px rgba(18,65,54,0.1);
        }
        .tb-input::placeholder { color: #9CA3AF; }

        .tb-btn {
          width: 100%; padding: 14px;
          background: ${C.primary}; color: ${C.paper};
          border: none; border-radius: 12px;
          font-family: inherit; font-size: 15px; font-weight: 700;
          cursor: pointer; transition: background 0.18s, transform 0.15s, box-shadow 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: 0.01em;
        }
        .tb-btn:hover:not(:disabled) {
          background: ${C.primaryHover}; transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(18,65,54,0.25);
        }
        .tb-btn:active:not(:disabled) { transform: none; box-shadow: none; }
        .tb-btn:disabled { opacity: 0.72; cursor: not-allowed; }

        .tb-navbtn {
          padding: 8px 17px; background: transparent;
          border: 1.5px solid ${C.border}; border-radius: 8px;
          font-family: inherit; font-size: 13px; font-weight: 600;
          color: ${C.primary}; cursor: pointer; transition: all 0.18s;
          text-decoration: none; display: inline-block;
        }
        .tb-navbtn:hover { border-color: ${C.primary}; background: ${C.primary}08; }

        .tb-navbtn-primary {
          padding: 8px 17px; background: ${C.primary};
          border: 1.5px solid ${C.primary}; border-radius: 8px;
          font-family: inherit; font-size: 13px; font-weight: 600;
          color: ${C.paper}; cursor: pointer; transition: all 0.18s;
          text-decoration: none; display: inline-block;
        }
        .tb-navbtn-primary:hover { background: ${C.primaryHover}; border-color: ${C.primaryHover}; }

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
          border: 2px solid rgba(250,246,236,0.35);
          border-top-color: ${C.paper}; border-radius: 50%;
          animation: tbSpin 0.7s linear infinite; flex-shrink: 0;
        }
      `}</style>

      <div style={{
        fontFamily: "inherit",
        background: C.bg, minHeight: "100vh",
        color: C.ink, position: "relative", overflow: "hidden",
      }}>

        {/* Ambient background */}
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `
            radial-gradient(ellipse 70% 55% at 8% 8%,  ${C.gold}0C 0%, transparent 60%),
            radial-gradient(ellipse 55% 55% at 92% 88%, ${C.primary}08 0%, transparent 60%)
          `,
        }} />

        {/* ── NAV ─────────────────────────────────── */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 50,
          height: 60, padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "rgba(247,243,236,0.88)",
          backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
          borderBottom: `1px solid rgba(232,226,214,0.7)`,
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 3L18.5 17H1.5L10 3Z" fill={C.primary} />
            </svg>
            <span style={{
              fontSize: 18, fontWeight: 700,
              letterSpacing: "-0.02em", color: C.primary,
            }}>tambo</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link href="/login"    className="tb-navbtn">Masuk</Link>
            <Link href="/register" className="tb-navbtn-primary">Daftar</Link>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────── */}
        <section style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", padding: "56px 24px 88px" }}>
            <div className="tb-grid">

              {/* LEFT: Copy + Form */}
              <div style={{ maxWidth: 520 }}>

                {/* Kicker chip */}
                <div className="tb-a1" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  background: `${C.gold}18`, border: `1px solid ${C.gold}40`,
                  borderRadius: 100, padding: "5px 14px",
                  fontSize: 12, fontWeight: 600, color: "#7A5010",
                  marginBottom: 22,
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: C.gold, display: "inline-block", flexShrink: 0,
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
                  <span style={{
                    color: C.primary, position: "relative", display: "inline",
                    fontFamily: "var(--font-fraunces), Georgia, serif",
                    fontStyle: "italic", fontWeight: 300,
                  }}>
                    Kita cari tahu kenapa.
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
                        stroke={C.gold} strokeWidth="3" strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Sub-headline */}
                <p className="tb-a3" style={{
                  fontSize: "clamp(14px, 2.2vw, 16.5px)",
                  lineHeight: 1.72, color: C.sage, marginBottom: 32,
                }}>
                  Bukan karena kamu nggak kompeten — mungkin CV-mu belum cerita yang bener tentang kamu.{" "}
                  <strong style={{ color: C.ink, fontWeight: 600 }}>
                    Tambo bantu kamu benerin itu
                  </strong>
                  , dari CV sampai siap interview.
                </p>

                {/* Form / Success */}
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
                      {loading
                        ? <><div className="tb-spinner" />Membuka form...</>
                        : "Mulai Gratis →"}
                    </button>
                    {error && (
                      <div style={{
                        fontSize: 13, color: "#8B3E2A", textAlign: "center",
                        padding: "8px 12px",
                        background: "rgba(139,62,42,0.07)",
                        borderRadius: 8, border: "1px solid rgba(139,62,42,0.2)",
                      }}>
                        {error}
                      </div>
                    )}
                  </form>
                ) : (
                  <div className="tb-a4" style={{
                    background: `${C.primary}0C`,
                    border: `1.5px solid ${C.primary}25`,
                    borderRadius: 16, padding: "22px 24px", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: C.primary, marginBottom: 5 }}>
                      Yes! Kamu udah masuk waitlist!
                    </div>
                    <div style={{ fontSize: 13.5, color: C.sage, lineHeight: 1.65 }}>
                      Kami akan kabarin kamu duluan waktu Tambo launch.<br />
                      Pantau email kamu ya! 📩
                    </div>
                  </div>
                )}

                {/* Social proof */}
                <div className="tb-a5" style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {[
                      { bg: C.primary,  l: "R" },
                      { bg: "#4A7C59",  l: "A" },
                      { bg: C.gold,     l: "D" },
                      { bg: "#7C6A3E",  l: "F" },
                      { bg: "#2D5A3D",  l: "S" },
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
                  <span style={{ fontSize: 13, color: C.sage }}>
                    <strong style={{ color: C.ink, fontWeight: 700 }}>Daftar pertama</strong>
                    {", dapat akses early"}
                  </span>
                </div>

                {/* Free note */}
                <div className="tb-a5" style={{
                  marginTop: 10,
                  display: "flex", alignItems: "center", flexWrap: "wrap",
                  gap: "6px 16px", fontSize: 12, color: C.sage,
                }}>
                  {["Gratis untuk fitur dasar", "Tanpa kartu kredit"].map((t, i) => (
                    <span key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5.5" stroke="#4F7860" />
                        <path d="M3.5 6L5.5 8L8.5 4" stroke="#4F7860" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
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
