import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.atelier-pile-attitude.fr"),
  title: {
    default: "L'Atelier Pile-Attitude — Studio Pilates Chatou (78)",
    template: "%s | Atelier Pile-Attitude",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  description:
    "Studio de Pilates sur machines à Chatou (78), à 5 min du RER A Chatou-Croissy. Cours Solo, Duo, Trio et collectifs tapis avec Sophie & Elise, certifiées Polestar Pilates.",
  keywords: [
    "Pilates Chatou",
    "studio Pilates Chatou",
    "cours Pilates Chatou",
    "Pilates machines Chatou",
    "Reformer Pilates Chatou",
    "Pilates 78",
    "Pilates Yvelines",
    "Polestar Pilates",
    "cours Pilates tapis",
    "Atelier Pile-Attitude",
  ],
  authors: [{ name: "L'Atelier Pile-Attitude" }],
  creator: "L'Atelier Pile-Attitude",
  verification: {
    google: "qkQOpouDMYixN8K4KSk-yIPfkUaGIRIHkPL_jgThi1w",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.atelier-pile-attitude.fr",
    siteName: "L'Atelier Pile-Attitude",
    title: "L'Atelier Pile-Attitude — Studio Pilates Chatou (78)",
    description:
      "Studio de Pilates sur machines à Chatou (78), à 5 min du RER A Chatou-Croissy. Cours Solo, Duo, Trio et collectifs tapis avec Sophie & Elise.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "L'Atelier Pile-Attitude — Studio de Pilates sur machines à Chatou (78)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Atelier Pile-Attitude — Studio Pilates Chatou (78)",
    description:
      "Cours de Pilates sur machines et tapis à Chatou (78). Certifiées Polestar Pilates. À 5 min du RER A Chatou-Croissy.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
