import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer' // <-- Import Footer
import { Italiana, Karla } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';

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
      <head>
        <link
    rel="stylesheet"
    href="https://cdn.locadapt.com/locadapt.min.css"
/>
<Script
    src="https://cdn.locadapt.com/locadapt.min.js"
    data-project-id="fd57891c-6b4a-4c4a-a9c9-6b4ac4919780"
></Script>
      </head>
      <body className="font-sans antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer /> {/* <-- Add Footer here */}
      </body>
    </html>
  )
}
