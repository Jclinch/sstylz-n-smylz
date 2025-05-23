"use client";

import { MotionDiv } from "@/components/ui/motion-div";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Testimonials data
const testimonials = [
  {
    image: "/clients/client1.jpg",
    name: "Sophia W.",
    quote: "This salon is a dream come true! My skin feels amazing and the staff made me feel pampered every step of the way.",
  },
  {
    image: "/clients/client2.jpg",
    name: "Isabella K.",
    quote: "Absolutely love my new look. The team truly listens and brings out your best features!",
  },
  {
    image: "/clients/client3.jpg",
    name: "Amara B.",
    quote: "Radiant Glow is my new happy place. The vibe, the people, the results — all perfect!",
  },
];

const PATTERN_COUNT = 14;

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsla(${hue}, 100%, 85%, ${Math.random() * 0.4 + 0.4})`;
}

const getRandomPatterns = () =>
  Array.from({ length: PATTERN_COUNT }).map(() => ({
    top: Math.random() * 80 + 5,
    left: Math.random() * 80 + 5,
    size: Math.random() * 80 + 40,
    opacity: Math.random() * 0.4 + 0.4,
    borderRadius: Math.random() > 0.5 ? "50%" : "30% 70% 70% 30% / 30% 30% 70% 70%",
    color: getRandomColor(),
    rotate: Math.random() * 360,
  }));

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true });

  const [patterns] = useState(getRandomPatterns());
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMouse({ x, y });
    };
    const node = sectionRef.current;
    if (node) node.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (node) node.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const testimonial = testimonials[index];

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-br from-pink-100 via-pink-50 to-white py-20 px-6 relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: "rgba(255,255,255,0.65)",
          mixBlendMode: "lighten",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0">
        {patterns.map((p, i) => {
          const moveX = ((mouse.x - 50) / 20) * (i % 2 === 0 ? 1 : -1);
          const moveY = ((mouse.y - 50) / 20) * (i % 2 === 0 ? -1 : 1);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: `calc(${p.top}% + ${moveY}px)`,
                left: `calc(${p.left}% + ${moveX}px)`,
                width: p.size,
                height: p.size,
                background: p.color,
                opacity: p.opacity,
                borderRadius: p.borderRadius,
                transform: `rotate(${p.rotate}deg)`,
                transition: "top 0.2s, left 0.2s",
                filter: "blur(4px)",
                zIndex: 1,
                mixBlendMode: "soft-light",
              }}
            />
          );
        })}
      </div>

      <MotionDiv
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10"
      >
        {/* Rotating frame + Client image */}
        <div className="relative md:w-[600px] w-[300px] md:h-[600px] h-[300px] flex items-center justify-center">
          <div className="absolute inset-0 animate-spin-slow z-0">
            <Image
              src="/images/gold-frame.png"
              alt="Rotating Frame"
              fill
              className="object-contain"
            />
          </div>
          <div className="md:w-[420px] w-[210px] md:h-[420px] h-[210px] rounded-full overflow-hidden shadow-2xl relative z-10">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Testimonial Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="md:text-4xl text-xl font-bold text-gray-800">What Our Clients Say</h2>
          <p className="text-lg italic text-gray-600 leading-relaxed">
            “{testimonial.quote}”
          </p>
          <p className="text-md font-semibold text-pink-700">— {testimonial.name}</p>
        </div>
      </MotionDiv>
    </section>
  );
};

export default Testimonials;
