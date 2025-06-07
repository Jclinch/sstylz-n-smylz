// ✅ Server file — no "use client" here
import ServicePage from "./ServicePageClient";

export const metadata = {
  title: "Salon Services | Stylz 'N' Smylz",
  description:
    "Discover all 15 premium beauty services offered by Stylz 'N' Smylz – including braids, wig installations, manicures, lashes, and more.",
  openGraph: {
    title: "Stylz 'N' Smylz Services",
    description:
      "Explore our full range of beauty services with photo galleries for each.",
    url: "https://yourdomain.com/services",
    siteName: "Stylz 'N' Smylz",
    images: [
      {
        url: "/services/service-hero.png",
        width: 1200,
        height: 630,
        alt: "Stylz 'N' Smylz Services",
      },
    ],
    type: "website",
  },
};

export default function Page() {
  return <ServicePage />;
}
