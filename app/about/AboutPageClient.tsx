"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutPageClient = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <>
      {/* Hero section with background image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
      >
        {/* Background image */}
        <Image
          src="/images/about-hero.png" // Replace with your preferred hero image
          alt="About background"
          layout="fill"
          objectFit="cover"
          quality={90}
          className="z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
            About Stylz &apos;N&apos; Smylz
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            At Stylz &apos;N&apos; Smylz, we believe in more than just beauty — we believe in confidence,
            self-expression, and self-care.
          </p>
        </div>
      </motion.div>

      {/* Main content */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <motion.div
          ref={ref1}
          initial="hidden"
          animate={inView1 ? "visible" : "hidden"}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-10 items-center mb-16"
        >
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <p>
              Founded in the heart of Ikota, Lekki, Stylz &apos;N&apos; Smylz was born from a desire to provide
              a luxurious yet welcoming beauty experience for everyone.
            </p>
            <p>
              Our talented team of stylists and therapists are passionate about what they do —
              delivering exceptional hair care, nail artistry, skincare, and more.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/about-mission.jpg"
              alt="Salon interior"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          ref={ref2}
          initial="hidden"
          animate={inView2 ? "visible" : "hidden"}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/images/team.jpg"
              alt="Our team"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="space-y-4 text-gray-700">
            <h2 className="text-2xl font-semibold">Meet the Experts</h2>
            <p>
              Each member of our team brings years of experience and a touch of creativity to every appointment.
              From the latest in hair trends to timeless beauty techniques, we tailor every service to you.
            </p>
            <Button asChild className="mt-4 bg-[#6E226A]/90 text-white hover:bg-[#B779B3] font-semibold shadow rounded-3xl">
              <Link href="/services">Explore Our Services</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutPageClient;
