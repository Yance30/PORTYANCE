import type { Metadata } from "next";
import "./globals.css";

const siteHost =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.VERCEL_PROJECT_PRODUCTION_URL ??
  process.env.VERCEL_URL;
const metadataBase = siteHost
  ? new URL(siteHost.startsWith("http") ? siteHost : `https://${siteHost}`)
  : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Yance Adhy Nata Panjaitan | Business Intelligence & Pengembangan Web",
  description:
    "Portofolio Yance Adhy Nata Panjaitan, mahasiswa Sistem Informasi dengan fokus Business Intelligence, dashboard analitik, dan pengembangan web. Jelajahi proyek serta studi kasus data.",
  openGraph: {
    title: "Yance Adhy Nata Panjaitan | Business Intelligence & Pengembangan Web",
    description:
      "Aplikasi web, dashboard analitik, dan pengalaman organisasi Yance Adhy Nata Panjaitan.",
    siteName: "Portyance",
    locale: "id_ID",
    type: "website",
    ...(metadataBase && {
      images: [{ url: "/yance-portrait.png", alt: "Yance Adhy Nata Panjaitan" }],
    }),
  },
  twitter: {
    card: "summary_large_image",
    title: "Yance Adhy Nata Panjaitan | Business Intelligence & Pengembangan Web",
    description:
      "Portofolio aplikasi web dan dashboard analitik Yance Adhy Nata Panjaitan.",
    ...(metadataBase && { images: ["/yance-portrait.png"] }),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
