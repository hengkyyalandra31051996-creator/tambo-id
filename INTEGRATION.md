# Tambo.id — Batch 1 Integration Guide

## Files Delivered
```
components/auth/
  PasswordInput.jsx      — password field + visibility toggle
  FormField.jsx          — text/email field + error message
  GoogleOAuthButton.jsx  — Google OAuth via Supabase

app/(auth)/
  login/page.jsx         — full login page (replace existing)
  register/page.jsx      — full register page (replace existing)
  forgot-password/page.jsx
  reset-password/page.jsx

app/auth/
  callback/route.js      — OAuth & magic link callback handler

components/cv/
  CVLoadingState.jsx     — progressive loading (4 steps)
  CVAnalysisResult.jsx   — score card + 3 result cards + parseGeminiAnalysis()

app/cv/result/[id]/
  page.jsx               — CV result page by ID

app/dashboard/
  page.jsx               — full dashboard (replace existing)

components/navigation/
  BottomNav.jsx          — mobile bottom bar (Home/CV/Profil)
  TopNav.jsx             — desktop top navbar

components/layout/
  AppLayout.jsx          — wraps authenticated pages

lib/
  cv-analysis.js         — Gemini prompt builder + Supabase save helper
```

---

## Step-by-step Integration

### 1. Supabase — Enable Google OAuth
1. Supabase Dashboard → Authentication → Providers → Google → Enable
2. Add Client ID + Secret from Google Cloud Console
3. Add redirect URL: `https://tambo.id/auth/callback`

### 2. Copy files to your repo

Copy all files above, maintaining the same relative paths.

### 3. Register auth routes
Make sure these routes exist in `app/(auth)/`:
- `login/page.jsx` ← replace
- `register/page.jsx` ← replace
- `forgot-password/page.jsx` ← new
- `reset-password/page.jsx` ← new
- `app/auth/callback/route.js` ← new (not inside (auth) group)

### 4. Add cv_analyses table (if not already)

Run in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS cv_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  summary TEXT,
  strengths JSONB DEFAULT '[]',
  improvements JSONB DEFAULT '[]',
  ats_tips JSONB DEFAULT '[]',
  filename TEXT,
  raw_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE cv_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own analyses" ON cv_analyses
  FOR ALL USING (auth.uid() = user_id);
```

### 5. Update your CV upload API route

In your existing `/api/analyze-cv/route.js` (or wherever Gemini is called):

```js
import { buildCVAnalysisPrompt, saveCVAnalysis } from '@/lib/cv-analysis'
import { parseGeminiAnalysis } from '@/components/cv/CVAnalysisResult'

// 1. Build prompt
const { systemPrompt, userPrompt } = buildCVAnalysisPrompt(cvText)

// 2. Call Gemini (your existing call, just swap the prompt)
const geminiResult = await callGemini(systemPrompt, userPrompt)
const analysis = parseGeminiAnalysis(geminiResult)

// 3. Save to Supabase
const { data } = await saveCVAnalysis(supabase, {
  userId: user.id,
  analysis,
  filename: file.name,
  rawText: cvText,
})

// 4. Return the analysis + id so client can navigate to /cv/result/[id]
return Response.json({ analysis, id: data.id })
```

### 6. Update your existing CV page to show CVAnalysisResult

In your `/app/cv/page.jsx`, replace the plain text output section:

```jsx
import CVAnalysisResult from '@/components/cv/CVAnalysisResult'
import CVLoadingState from '@/components/cv/CVLoadingState'

// While analyzing:
{isLoading && <CVLoadingState />}

// After result:
{analysis && <CVAnalysisResult analysis={analysis} />}
```

### 7. Wrap authenticated pages with AppLayout

Create `app/(app)/layout.jsx`:
```jsx
import AppLayout from '@/components/layout/AppLayout'
export default function Layout({ children }) {
  return <AppLayout>{children}</AppLayout>
}
```

Move `dashboard/`, `cv/`, `profil/` under `app/(app)/`.

**OR** simpler: just add `<BottomNav />` and `<TopNav />` directly to your existing 
`app/dashboard/layout.jsx` and `app/cv/layout.jsx`.

### 8. Add `safe-area-pb` to Tailwind config

In `tailwind.config.js`:
```js
theme: {
  extend: {
    spacing: {
      'safe-area-pb': 'env(safe-area-inset-bottom)',
    }
  }
}
```

OR just replace `safe-area-pb` in `BottomNav.jsx` with `pb-2` if you skip this.

---

## Middleware — add forgot-password & reset-password to public routes

In your existing `middleware.js`, make sure these are NOT protected:

```js
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/forgot-password',   // ← add
  '/reset-password',    // ← add
  '/auth/callback',     // ← add
]
```

---

## Checklist before deploy

- [ ] Google OAuth enabled in Supabase
- [ ] `app/auth/callback/route.js` exists
- [ ] `cv_analyses` table + RLS created
- [ ] `/api/analyze-cv` saves to `cv_analyses` and returns `{ analysis, id }`
- [ ] CV page shows `CVLoadingState` during fetch, `CVAnalysisResult` after
- [ ] Dashboard page replaces old one
- [ ] `BottomNav` renders on mobile, hidden on desktop (md:hidden)
- [ ] `TopNav` hidden on mobile (hidden md:block)
- [ ] `forgot-password` and `reset-password` in public routes middleware
- [ ] Deploy: `vercel --prod`
