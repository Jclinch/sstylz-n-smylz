// app/about/page.tsx

import AboutPageClient from "./AboutPageClient";

export const metadata = {
  title: "About Us | Stylz 'N' Smylz",
  description:
    "Discover the story behind Stylz 'N' Smylz — Lekki’s premier destination for hair, beauty, grooming, and wellness services. Meet our expert team and explore our mission.",
  keywords: [
    "About Stylz 'N' Smylz",
    "Lekki hair salon",
    "beauty studio Lekki",
    "Ikota hair and nail spa",
    "dreadlocks Lekki",
    "manicure pedicure Lagos",
    "Stylist team Lekki",
  ],
  openGraph: {
    title: "About Stylz 'N' Smylz",
    description:
      "Meet the expert team and vision behind Stylz 'N' Smylz — your luxury beauty destination in Lekki.",
    url: "https://yourdomain.com/about",
    siteName: "Stylz 'N' Smylz",
    type: "website",
    images: [
      {
        url: "/images/about-mission.jpg",
        width: 800,
        height: 600,
        alt: "Inside Stylz 'N' Smylz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stylz 'N' Smylz",
    description:
      "Step into elegance. Learn about our mission, expert team, and the luxury services we offer.",
    images: ["/images/about-mission.jpg"],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
