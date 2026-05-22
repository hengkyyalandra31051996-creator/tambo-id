# Tambo.id

> AI Career Coach untuk Fresh Grad Indonesia

## Stack
- Next.js 14 (App Router)
- React 18
- Tally.so (waitlist form)

## Structure
```
tambo/
├── app/
│   ├── layout.jsx     # Root layout + metadata
│   └── page.jsx       # Home page
├── components/
│   └── TamboHero.jsx  # Hero section + waitlist form
├── package.json
└── next.config.js
```

## Deploy ke Vercel

1. Push folder ini ke GitHub repo baru
2. Buka vercel.com → New Project → import repo
3. Framework: Next.js (auto-detected)
4. Deploy → selesai

## Local Dev

```bash
npm install
npm run dev
# buka http://localhost:3000
```
