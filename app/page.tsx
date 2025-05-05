import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv } from "@/components/ui/motion-div";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative flex flex-col justify-center items-center text-center px-4 py-24 bg-gradient-to-b from-pink-100 to-white">
        {/* Animated introduction with a heading, description, and call-to-action button */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl font-bold mb-4 text-pink-700">
            Welcome to Glam Haven
          </h1>
          <p className="text-lg mb-6 text-gray-600">
            Your luxury destination for Hair, Nails, Lashes & Wellness
          </p>
          {/* Button linking to the booking page */}
          <Button asChild size="lg">
            <Link href="/booking">Book Now</Link>
          </Button>
        </MotionDiv>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-6 bg-white">
        {/* Section heading for services */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Our Signature Services
        </h2>
        {/* Grid layout for showcasing services */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            { title: "Hair Styling", image: "/images/services/hair.jpg", link: "/services/hair" },
            { title: "Nails", image: "/images/services/nails.jpg", link: "/services/nails" },
            { title: "Massage Therapy", image: "/images/services/massage.jpg", link: "/services/massage" },
          ].map((service) => (
            <Card key={service.title} className="hover:shadow-xl transition">
              {/* Each service links to its respective page */}
              <Link href={service.link}>
                <CardContent className="p-0">
                  {/* Service image */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={250}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  {/* Service title */}
                  <div className="p-4">
                    <h3 className="text-xl font-medium text-pink-600">
                      {service.title}
                    </h3>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-pink-50 py-20 px-4">
        {/* Section heading for testimonials */}
        <h2 className="text-3xl font-semibold text-center text-pink-700 mb-10">
          What Our Clients Say
        </h2>
        {/* Animated testimonials with staggered transitions */}
        <div className="max-w-3xl mx-auto space-y-8">
          {["Absolutely loved my hair transformation!", "The massage session was heavenly.", "Best nail art in town!"].map(
            (review, idx) => (
              <MotionDiv
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 + idx * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                {/* Displaying each testimonial */}
                <p className="text-gray-700 italic">"{review}"</p>
              </MotionDiv>
            )
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-white text-center">
        {/* Final call-to-action encouraging users to book */}
        <h2 className="text-3xl font-bold text-pink-700 mb-6">
          Ready for Your Glow-Up?
        </h2>
        <Button asChild size="lg">
          <Link href="/booking">Book Your Appointment</Link>
        </Button>
      </section>
    </main>
  );
}
