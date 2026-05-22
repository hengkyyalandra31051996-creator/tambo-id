export const metadata = {
  title: "Tambo — Temukan Jalanmu",
  description:
    "AI career coach untuk fresh grad Indonesia. Tahu skill gap, optimize CV, dan latihan interview — sebelum ketemu HRD asli.",
  openGraph: {
    title: "Tambo — Temukan Jalanmu",
    description:
      "AI career coach untuk fresh grad Indonesia. Tahu skill gap, optimize CV, dan latihan interview.",
    url: "https://tambo.id",
    siteName: "Tambo",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
