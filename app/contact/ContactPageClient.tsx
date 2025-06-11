"use client";

import Link from "next/link";
import Script from "next/script";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactPageClient() {
  return (
    <>
      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
      >
        <Image
          src="/images/contact-hero.png"
          alt="Contact Hero Background"
          fill
          sizes="100vw"
          className="object-cover z-[-1]"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Reach out to Stylz &apos;N&apos; Smylz for bookings, inquiries, or
            just to say hello. We&apos;re here to help you shine!
          </p>
        </div>
      </motion.div>

      <Script id="json-ld-contact" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "UnisexSalon",
          name: "Stylz 'N' Smylz",
          image: "https://stylznsmylz.com/images/og-image.jpg",
          "@id": "https://stylznsmylz.com",
          url: "https://stylznsmylz.com",
          telephone: "+2349159476719",
          address: {
            "@type": "PostalAddress",
            streetAddress: "megamound shopping complex ikota",
            addressLocality: "Lagos",
            addressCountry: "NG",
          },
          openingHours: ["Mo-Sa 09:00-21:00", "Su 12:00-20:00"],
          sameAs: [
            "https://instagram.com/stylznsmylz",
            "https://wa.me/2347013327637",
          ],
        })}
      </Script>

      <div className="bg-white text-gray-800 min-h-screen pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#93458F] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            We’re always happy to connect. Reach out via any of our channels and
            let’s glam you up!
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp */}
          <Link
            href="https://wa.me/2347013327637"
            target="_blank"
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <FaWhatsapp size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">WhatsApp</h3>
              <p>+234 701 332 7637</p>
            </div>
          </Link>

          {/* Instagram */}
          <Link
            href="https://instagram.com/stylznsmylz"
            target="_blank"
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <FaInstagram size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Instagram</h3>
              <p>@stylznsmylz</p>
            </div>
          </Link>

          {/* Email */}
          <a
            href="mailto:info@stylznsmylz.com"
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <Mail size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p>stylz.smylz@gmail.com</p>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+2347013327637"
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p>+234 915 947 6719</p>
              <p>+234 701 332 7637</p>
            </div>
          </a>
        </div>

        {/* Visit Us Section with Map */}
        <section className="bg-white py-12 px-4 sm:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold italiana text-gray-900">
              Visit Us
            </h2>
            <p className="mt-3 text-gray-600">
              We&apos;re located inside the megamound shopping complex ikota,
              along Lekki-Ajah Expressway, Lagos.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg max-w-6xl mx-auto aspect-video">
            <iframe
              title="Megamound Shopping Complex Ikota Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126871.49860962444!2d3.397929584049247!3d6.4281672230362545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7cf8ff52543%3A0x7202583d542f71c4!2sMegamound%20Shopping%20Mall!5e0!3m2!1sen!2sng!4v1749539157790!5m2!1sen!2sng"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </section>
      </div>
    </>
  );
}
