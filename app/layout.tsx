

import NavBar from '@/components/NavBar'
import { Italiana, Karla } from "next/font/google";
import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin", ],
  weight: "400", // Italiana only has 400
  variable: "--font-italiana",
});
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"], // Add more weights as needed
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "Stylz 'N' Smylz",
  description: "Your luxury destination for Hair, Nails, Lashes & Wellness",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
  <html lang="en" className={`${italiana.variable} ${karla.variable}`}>
          <body className="font-sans antialiased">
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
