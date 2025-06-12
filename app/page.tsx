"use client"
import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Back to top"
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full shadow-lg transition-opacity duration-300
        bg-[#93458F] hover:bg-[#B779B3] text-white ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      style={{ boxShadow: "0 4px 24px 0 rgba(147, 69, 143, 0.15)" }}
    >
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <path
          d="M12 19V5M12 5l-7 7M12 5l7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen text-gray-800">
      <Hero />
      <Services />
      <ContactSection />
      <Testimonials />
      <MapSection />
      
      {/* Call to Action */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-[#231222] mb-6">
          Ready for Your Glow-Up?
        </h2>
        <Button asChild size="lg" className="rounded-full bg-[#93458F] hover:bg-[#B779B3] text-white">
          <Link
            href="https://wa.me/2347013327637"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Your Appointment
          </Link>
        </Button>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
