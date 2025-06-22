




"use client";

import Link from "next/link";
import Script from "next/script";
import { Phone, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// ... (your imports stay the same)

export default function ContactPageClient() {
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLCanvasElement>(null);

  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      if (glowRef.current) {
        glowRef.current.style.background = `
          radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.12), transparent 20%)
        `;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = sparkleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      alpha: Math.random(),
      size: Math.random() * 2 + 1,
      dx: Math.random() - 0.5,
      dy: Math.random() - 0.5,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  const openWhatsApp = (number: string) => {
    window.open(`https://wa.me/${number.replace("+", "")}`, "_blank");
    setShowWhatsAppModal(false);
  };

  const callPhone = (number: string) => {
    window.location.href = `tel:${number}`;
    setShowPhoneModal(false);
  };

  return (
    <div className="relative z-10">
      {/* Sparkles */}
      <canvas
        ref={sparkleRef}
        className="fixed top-0 left-0 w-full h-full z-[150] pointer-events-none"
      />
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-full h-full z-[80] pointer-events-none transition-all duration-300 ease-out"
      />
      <div className="fixed top-0 left-0 w-full h-full z-[70] animate-gradientPulse bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl pointer-events-none" />

      {/* Hero */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[80vh] w-full overflow-hidden mt-[-120px] z-[120]"
      >
        <Image
          src="/images/contact-hero.png"
          alt="Contact Hero Background"
          fill
          sizes="100vw"
          className="object-cover z-[120]"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-[130] flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Reach out to Stylz &apos;N&apos; Smylz for bookings, inquiries, or just to say hello. We&apos;re here to help you shine!
          </p>
        </div>
      </motion.div>

      {/* JSON-LD Structured Data */}
      <Script id="json-ld-contact" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "UnisexSalon",
          name: "STYLZ N SMYLZ GALLERY UNISEX SALON",
          image: "https://stylznsmylz.com/images/hero-bg1.png",
          "@id": "https://stylznsmylz.com",
          url: "https://stylznsmylz.com",
          telephone: ["+2349159476719", "+2347013327637"],
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
            "https://wa.me/2349159476719",
          ],
        })}
      </Script>

      {/* Contact Info */}
      <div className="bg-white text-gray-800 min-h-screen pt-24 pb-12 px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#93458F] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            We’re always happy to connect. Reach out via any of our channels and let’s glam you up!
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          {/* WhatsApp Modal Trigger */}
          <button
            onClick={() => setShowWhatsAppModal(true)}
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition w-full text-left cursor-pointer"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <FaWhatsapp size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">WhatsApp</h3>
              <p>+234 701 332 7637</p>
              <p>+234 915 947 6719</p>
            </div>
          </button>

          <Link
            href="https://instagram.com/stylz.smylz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <FaInstagram size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Instagram</h3>
              <p>@stylz.smylz</p>
            </div>
          </Link>

          <a
            href="mailto:info@stylznsmylz.com"
                        target="_blank"
            rel="noopener noreferrer" 
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

          <button
            onClick={() => setShowPhoneModal(true)}
            className="flex items-center gap-4 p-6 rounded-xl shadow-md bg-[#93458F] hover:bg-[#B779B3] text-white transition w-full text-left"
          >
            <div className="bg-white text-[#93458F] rounded-full p-2">
              <Phone size={28} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Call Us</h3>
              <p>+234 915 947 6719</p>
              <p>+234 701 332 7637</p>
            </div>
          </button>
        </div>

        {/* Visit Us */}
        <section className="bg-white py-12 px-4 sm:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold italiana text-gray-900">
              Visit Us
            </h2>
            <p className="mt-3 text-gray-600">
              We&apos;re located inside the megamound shopping complex ikota, along Lekki-Ajah Expressway, Lagos.
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

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Choose WhatsApp Number</h2>
            <button className="block w-full bg-green-600 text-white py-2 rounded cursor-pointer" onClick={() => openWhatsApp("+2347013327637")}>
              Chat: +234 701 332 7637
            </button>
            <button className="block w-full bg-green-600 text-white py-2 rounded cursor-pointer " onClick={() => openWhatsApp("+2349159476719")}>
              Chat: +234 915 947 6719
            </button>
            <button className="text-sm text-gray-600 underline mt-2" onClick={() => setShowWhatsAppModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Phone Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 z-[999] bg-black/60 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center space-y-4 shadow-xl">
            <h2 className="text-lg font-bold">Choose Number to Call</h2>
            <button className="block w-full bg-[#93458F] text-white py-2 rounded cursor-pointer" onClick={() => callPhone("+2349159476719")}>
              Call: +234 915 947 6719
            </button>
            <button className="block w-full bg-[#93458F] text-white py-2 rounded cursor-pointer" onClick={() => callPhone("+2347013327637")}>
              Call: +234 701 332 7637
            </button>
            <button className="text-sm text-gray-600 underline mt-2" onClick={() => setShowPhoneModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
