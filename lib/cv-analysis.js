/**
 * buildCVAnalysisPrompt
 * 
 * Returns the system + user prompt for Gemini CV analysis.
 * Drop-in replacement for your existing prompt — swap in your /api/analyze-cv route.
 * 
 * The model is instructed to return ONLY JSON, no markdown fences.
 */

export function buildCVAnalysisPrompt(cvText) {
  const systemPrompt = `Kamu adalah AI career coach untuk fresh graduate Indonesia. 
Kamu ahli menganalisa CV dan memberi feedback yang actionable.
Kamu HANYA membalas dengan JSON valid. Tidak ada teks lain, tidak ada markdown, tidak ada komentar.`

  const userPrompt = `Analisa CV berikut dan berikan feedback dalam Bahasa Indonesia yang casual dan to-the-point.

CV TEXT:
${cvText}

Balas HANYA dengan JSON ini (tanpa markdown, tanpa preamble):
{
  "score": <angka 0-100, penilaian keseluruhan kualitas CV>,
  "summary": "<1-2 kalimat ringkasan kesan keseluruhan CV, casual dan jujur>",
  "strengths": [
    "<kelebihan 1>",
    "<kelebihan 2>",
    "<kelebihan 3>"
  ],
  "improvements": [
    "<saran perbaikan 1>",
    "<saran perbaikan 2>",
    "<saran perbaikan 3>"
  ],
  "atsTips": [
    "<tips ATS 1>",
    "<tips ATS 2>",
    "<tips ATS 3>"
  ]
}

Panduan scoring:
- 75-100: CV sudah kuat, siap dikirim ke perusahaan bagus
- 50-74: Ada potensi tapi perlu perbaikan signifikan
- 0-49: Banyak hal mendasar yang kurang

Konteks: Target perusahaan Indonesia (BUMN, startup, MNC lokal).
Bahasa feedback: casual Gen Z, encouraging tapi jujur.`

  return { systemPrompt, userPrompt }
}

/**
 * Save CV analysis to Supabase.
 * Call this after getting the Gemini response.
 * 
 * Table: cv_analyses
 * Columns: id, user_id, score, strengths, improvements, ats_tips, summary, filename, created_at
 * 
 * Run this migration if the table doesn't exist yet:
 * 
 * CREATE TABLE IF NOT EXISTS cv_analyses (
 *   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
 *   score INTEGER NOT NULL DEFAULT 0,
 *   summary TEXT,
 *   strengths JSONB DEFAULT '[]',
 *   improvements JSONB DEFAULT '[]',
 *   ats_tips JSONB DEFAULT '[]',
 *   filename TEXT,
 *   raw_text TEXT,
 *   created_at TIMESTAMPTZ DEFAULT NOW()
 * );
 * 
 * ALTER TABLE cv_analyses ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can CRUD own analyses" ON cv_analyses
 *   FOR ALL USING (auth.uid() = user_id);
 */
export async function saveCVAnalysis(supabase, { userId, analysis, filename, rawText }) {
  const { data, error } = await supabase
    .from('cv_analyses')
    .insert({
      user_id: userId,
      score: analysis.score,
      summary: analysis.summary,
      strengths: analysis.strengths,
      improvements: analysis.improvements,
      ats_tips: analysis.atsTips,
      filename,
      raw_text: rawText,
    })
    .select('id')
    .single()

  return { data, error }
}
