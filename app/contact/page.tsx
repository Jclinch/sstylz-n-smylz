
import ContactPageClient from "./ContactPageClient";

export const metadata = {
  title: "Contact Us | Stylz 'N' Smylz",
  description: "Connect with Stylz 'N' Smylz via WhatsApp, Instagram, phone, or email. We're here to glam you up!",
  keywords: [
    "Stylz 'N' Smylz contact",
    "contact salon",
    "WhatsApp Stylz 'N' Smylz",
    "Instagram Stylz 'N' Smylz",
    "Lagos beauty salon",
    "Hair, Makeup, Lashes, Piercing",
  ],
  openGraph: {
    title: "Contact Stylz 'N' Smylz",
    description: "Reach out for beauty services and appointments.",
    url: "https://yourdomain.com/contact",
    siteName: "Stylz 'N' Smylz",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg", // Replace with your OG image
        width: 1200,
        height: 630,
        alt: "Stylz 'N' Smylz Salon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Stylz 'N' Smylz",
    description: "Reach out to us for glam services and bookings.",
    images: ["https://yourdomain.com/images/og-image.jpg"], // Replace this
  },
  alternates: {
    canonical: "https://yourdomain.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
