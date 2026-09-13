import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "The Wedding of Afna & Syahrul",
  description: "Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir di hari pernikahan Syahrul & Afna.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "The Wedding of Syahrul & Afna",
    description: "Undangan pernikahan Syahrul & Afna · 25 Oktober 2026",
    url: "/",
    siteName: "Syahrul & Afna",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/IMG_2414-compressed.jpg",
        width: 1920,
        height: 2560,
        alt: "Syahrul & Afna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Syahrul & Afna",
    description: "Undangan pernikahan Syahrul & Afna · 25 Oktober 2026",
    images: ["/IMG_2414-compressed.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
