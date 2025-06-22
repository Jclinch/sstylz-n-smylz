// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
// };

// const AboutPageClient = () => {
//   const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

//   return (
//     <>
//       {/* Hero section with background image */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeInUp}
//         className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
//       >
//         {/* Background image */}
//         <Image
//           src="/images/about-hero.png" // Replace with your preferred hero image
//           alt="About background"
//           layout="fill"
//           objectFit="cover"
//           quality={90}
//           className="z-0"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
//           <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
//             About Us
//           </h1>
          
//           <p className="mt-4 text-lg text-gray-200 max-w-2xl">
//             At Stylz &apos;N&apos; Smylz Unisex Salon, we believe in more than just beauty — we believe in confidence,
//             self-expression, and self-care.
//           </p>
//         </div>
//       </motion.div>

//       {/* Main content */}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <motion.div
//           ref={ref1}
//           initial="hidden"
//           animate={inView1 ? "visible" : "hidden"}
//           variants={fadeInUp}
//           className="grid md:grid-cols-2 gap-10 items-center mb-16"
//         >
//           <div className="space-y-4 text-gray-700">
//             <h2 className="text-2xl font-semibold">Our Story</h2>
//             <p>
//               Founded in the heart of Ikota, Lekki, Stylz &apos;N&apos; Smylz was born from a desire to provide
//               a luxurious yet welcoming beauty experience for everyone.
//             </p>
//             <p>
//               Our talented team of stylists and therapists are passionate about what they do —
//               delivering exceptional hair care, nail artistry, skincare, and more.
//             </p>
//           </div>
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <Image
//               src="/images/about-mission.jpg"
//               alt="Salon interior"
//               width={600}
//               height={400}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//         </motion.div>

//         <motion.div
//           ref={ref2}
//           initial="hidden"
//           animate={inView2 ? "visible" : "hidden"}
//           variants={fadeInUp}
//           className="grid md:grid-cols-2 gap-10 items-center"
//         >
//           <div className="rounded-xl overflow-hidden shadow-lg">
//             <Image
//               src="/images/team.jpg"
//               alt="Our team"
//               width={600}
//               height={400}
//               className="w-full h-auto object-cover"
//             />
//           </div>
//           <div className="space-y-4 text-gray-700">
//             <h2 className="text-2xl font-semibold">Meet the Experts</h2>
//             <p>
//               Each member of our team brings years of experience and a touch of creativity to every appointment.
//               From the latest in hair trends to timeless beauty techniques, we tailor every service to you.
//             </p>
//             <Button asChild className="mt-4 bg-[#6E226A]/90 text-white hover:bg-[#B779B3] font-semibold shadow rounded-3xl">
//               <Link href="/services">Explore Our Services</Link>
//             </Button>
//           </div>
//         </motion.div>
//       </section>
//     </>
//   );
// };

// export default AboutPageClient;






"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const AboutPageClient = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

  const glowRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLCanvasElement>(null);

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

    const particles: {
      x: number;
      y: number;
      alpha: number;
      size: number;
      dx: number;
      dy: number;
    }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        alpha: Math.random(),
        size: Math.random() * 2 + 1,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5,
      });
    }

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

  return (
    <div className="relative z-10">
      {/* Sparkles */}
      <canvas
        ref={sparkleRef}
        className="fixed top-0 left-0 w-full h-full z-[100] pointer-events-none"
      />

      {/* Cursor Glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none transition-all duration-300 ease-out"
      />

      {/* Pulsing Gradient Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 animate-gradientPulse bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl" />

      {/* === Main Page Content === */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-40"
      >
        {/* Hero section with background image */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
        >
          <Image
            src="/images/about-hero.png"
            alt="About background"
            layout="fill"
            objectFit="cover"
            quality={90}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/50 z-10 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
              About Us
            </h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl">
              At Stylz &apos;N&apos; Smylz Unisex Salon, we believe in more than just beauty — we believe in confidence,
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
      </motion.div>
    </div>
  );
};

export default AboutPageClient;
