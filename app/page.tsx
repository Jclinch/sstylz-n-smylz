import Hero from "@/components/Hero";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import MapSection from "@/components/MapSection";

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
    </main>
  );
}
