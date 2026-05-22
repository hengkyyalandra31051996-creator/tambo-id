import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { createClient } from '@/lib/supabase/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
 const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { cvText, targetRole } = await req.json()

  if (!cvText || cvText.length < 50) {
    return NextResponse.json({ error: 'CV terlalu pendek atau tidak valid' }, { status: 400 })
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `Kamu adalah AI career coach profesional untuk pasar kerja Indonesia.
Analisa CV berikut untuk posisi: ${targetRole || 'umum (tidak spesifik)'}

CV:
---
${cvText.slice(0, 4000)}
---

Berikan analisa dalam format JSON berikut (HANYA JSON, tidak ada teks lain):
{
  "score": <angka 0-100>,
  "summary": "<ringkasan singkat 2-3 kalimat tentang CV ini>",
  "strengths": ["<kelebihan 1>", "<kelebihan 2>", "<kelebihan 3>"],
  "improvements": [
    {
      "section": "<nama bagian CV>",
      "issue": "<masalah yang ditemukan>",
      "suggestion": "<saran perbaikan spesifik>"
    }
  ],
  "ats_tips": ["<tips ATS 1>", "<tips ATS 2>", "<tips ATS 3>"],
  "verdict": "<satu kalimat penutup motivasi>"
}`

  try {
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    const clean = text.replace(/```json|```/g, '').trim()
    const analysis = JSON.parse(clean)
    return NextResponse.json({ analysis })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Gagal menganalisa CV. Coba lagi.' }, { status: 500 })
  }
}