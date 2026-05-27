# CLAUDE.md — Tambo.id Dev Agent Instructions

Kamu adalah Senior Developer untuk Tambo.id.
Baca file ini sebelum mengerjakan task apapun.

---

## Project Overview

Tambo.id adalah AI career coach platform untuk fresh graduate Indonesia.
Stack: Next.js 14 (App Router), Tailwind CSS, Supabase (auth + DB),
       Google Gemini API (CV analysis), unpdf (PDF parser).

Live URL : https://tambo-id.vercel.app
Repo     : hengkyyalandra31051996-creator/tambo-id

---

## Design System

Color tokens:
  Primary  : #124136   (deep green — CTA, sidebar, dark surface)
  Sage     : #5E6B53   (muted sage — secondary, support)
  Gold     : #C89B4C   (warm gold — accent, score — gunakan jarang)
  BG       : #F7F3EC   (cream canvas — background seluruh app)
  Paper    : #FAF6EC   (card surface — elevated content)
  Ink      : #1A1A1A   (near black — headline, body text)
  Success  : #4F7860
  Warning  : #9B6A1F
  Danger   : #8B3E2A

Typography:
  Workhorse : Geist (semua teks UI dan body)
  Editorial : Fraunces weight 300 italic (headline display saja)

Brand voice: Bahasa Indonesia, casual tapi profesional, warm, supportive.
Tone seperti kakak senior — bukan corporate.

---

## File yang TIDAK BOLEH Diubah

- app/page.jsx dan components/TamboHero.jsx (landing page)
- Konfigurasi Supabase dan semua auth logic yang sudah berjalan
- Integrasi Gemini API yang sudah berjalan
- Struktur tabel database Supabase
- File .env dan .env.local

---

## Cara Kerja Dev Agent

1. Baca CLAUDE.md ini sebelum menulis satu baris kode
2. Baca isi issue lengkap termasuk semua subtask dan acceptance criteria
3. Implementasikan semua subtask
4. Jangan ubah file di luar scope task
5. Jika ada improvement di luar scope, tulis di PR comment — jangan langsung implement
6. Pastikan semua halaman responsive di mobile (390px)
7. Tidak boleh ada console error setelah implementasi
8. Setelah selesai, tulis PR comment berisi:
   - File yang diubah beserta deskripsi perubahan
   - Checklist acceptance criteria (centang semua yang selesai)
   - Langkah cara test
   - Known issues jika ada

---

## Definition of Done

Task dinyatakan selesai hanya jika semua terpenuhi:
- [ ] Semua subtask di issue selesai diimplementasi
- [ ] Tidak ada console error
- [ ] Responsive di mobile 390px
- [ ] Existing flow tidak broken (auth, CV upload, dashboard)
- [ ] Semua acceptance criteria di issue tercentang
- [ ] PR comment ditulis lengkap

---

## Environment Variables

Jangan pernah hardcode credential. Gunakan hanya nama variable berikut:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  GEMINI_API_KEY

Nilai aktual disimpan di Vercel environment variables dan .env.local lokal.
