import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer' // <-- Import Footer
import { Italiana, Karla } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const italiana = Italiana({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-italiana",
});
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <Footer /> {/* <-- Add Footer here */}
      </body>
    </html>
  )
}
