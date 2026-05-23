import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { Fraunces } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata = {
  title: 'Tambo — Temukan Jalanmu',
  description: 'AI career coach untuk fresh grad Indonesia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${GeistSans.variable} ${fraunces.variable}`}>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
