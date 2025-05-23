import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import OnlineStoreCarousel from "@/components/OnlineStoreCarousel";
import Services from "@/components/Services";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main className="min-h-screen text-gray-800">
      <Hero />
      <Services />
      <Testimonials />
      <OnlineStoreCarousel />
      {/* Call to Action */}
      <section className="py-20 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-pink-700 mb-6">
          Ready for Your Glow-Up?
        </h2>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/booking">Book Your Appointment</Link>
        </Button>
      </section>
      <Footer />
    </main>
  );
}
