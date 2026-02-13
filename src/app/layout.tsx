import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MapStory PACA — L'évolution des métiers en Provence-Alpes-Côte d'Azur",
  description:
    "Découvrez comment le paysage économique de la région PACA s'est transformé : quels métiers disparaissent, lesquels émergent, et les disparités entre territoires.",
  openGraph: {
    title: "MapStory PACA",
    description: "L'évolution des métiers en région PACA — scrollytelling interactif",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
