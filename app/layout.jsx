import './globals.css'

export const metadata = {
  title: "Tambo — Temukan Jalanmu",
  description: "AI career coach untuk fresh grad Indonesia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}