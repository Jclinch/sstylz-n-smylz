"use client";

import { MotionDiv } from "@/components/ui/motion-div";
import { useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
// import MassageTherapy from "./MassageTherapy";

function biasedRandom(min: number, max: number, bias: number = 0.5, influence: number = 0.8) {
  const rnd = Math.random();
  const mix = (1 - influence) * rnd + influence * bias;
  return min + mix * (max - min);
}


// Add some random pattern configs
const PATTERN_COUNT = 6; // Number of patterns
const patterns = Array.from({ length: PATTERN_COUNT }, (_, i) => {
  const spacing = 100 / (PATTERN_COUNT + 1);
  // 60% of patterns at the top, rest randomized vertically
  const isTop = i < Math.ceil(PATTERN_COUNT * 0.6);
  return {
    id: i,
    size: 80 + Math.random() * 60,
    top: isTop ? biasedRandom(0, 20, 0.2) : biasedRandom(25, 80, 0.7),
    left: spacing * (i + 1),
    color: [
      "rgba(239,68,68,0.08)",
      "rgba(34,197,94,0.08)",
      "rgba(59,130,246,0.08)",
      "rgba(250,204,21,0.08)",
      "rgba(168,85,247,0.08)",
      "rgba(244,63,94,0.08)",
      "rgba(16,185,129,0.08)",
    ][i % 7],
    shape: ["circle", "diamond", "triangle"][i % 3],
  };
});


const services = [
  {
    title: "Ghana Weaving",
    description: "Professional Ghana Weaving styles tailored to perfection",
    details: "Expert care and styling for all Ghana Weaving needs",
    durations: ["15 MINS | ₦2,000"],
    image: "/images/ghana-weaving.jpg",
  },
  {
    title: "Dreadlocks",
    description: "Specialized dreadlock services for all hair types",
    details:
      "Maintain, style, or start your dreadlocks with our skilled professionals",
    durations: ["15 MINS | ₦20,000"],
    image: "/images/dreadlock.jpg",
  },
  {
    title: "Hair Treatments",
    description: "Rejuvenate your hair with our premium treatments",
    details: "Personalized care for healthy, vibrant hair",
    durations: ["30 MINS | ₦3,000"],
    image: "/images/hair-treatment.jpeg",
  },
  {
    title: "manicure",
    description: "Pamper your feet with our luxurious manicure services",
    details: "Relax and rejuvenate with expert foot care and nail treatments",
    durations: ["1 HR | ₦4,000"],
    image: "/images/manicure.jpg",
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionRect, setSectionRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Get section bounding rect for relative cursor movement
  useEffect(() => {
    if (sectionRef.current) {
      setSectionRect(sectionRef.current.getBoundingClientRect());
    }
    const handleResize = () => {
      if (sectionRef.current) {
        setSectionRect(sectionRef.current.getBoundingClientRect());
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate relative cursor position in section
  let relCursor = { x: 0.5, y: 0.5 };
  if (sectionRect) {
    relCursor = {
      x: (cursorPos.x - sectionRect.left) / sectionRect.width,
      y: (cursorPos.y - sectionRect.top) / sectionRect.height,
    };
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-white text-gray-900 relative z-20 overflow-x-auto"
      style={{ overflow: "hidden" }}
    >
      {/* Stylish interactive patterns */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {patterns.map((pattern) => {
          // Make patterns move slightly with cursor
          const moveX = ((relCursor.x - 0.5) * 60 * (pattern.id % 2 === 0 ? 1 : -1));
          const moveY = ((relCursor.y - 0.5) * 60 * (pattern.id % 2 === 1 ? 1 : -1));
          const style: React.CSSProperties = {
            position: "absolute",
            top: `calc(${pattern.top}% + ${moveY}px)`,
            left: `calc(${pattern.left}% + ${moveX}px)`,
            width: pattern.size,
            height: pattern.size,
            opacity: 1,
            zIndex: 1,
            transition: "top 0.3s cubic-bezier(.4,0,.2,1), left 0.3s cubic-bezier(.4,0,.2,1)",
            pointerEvents: "none",
          };

          if (pattern.shape === "circle") {
            return (
              <div
                key={pattern.id}
                style={{
                  ...style,
                  borderRadius: "50%",
                  background: pattern.color,
                  boxShadow: "0 4px 32px 0 rgba(0,0,0,0.04)",
                  border: "2px solid rgba(239,68,68,0.08)",
                }}
              />
            );
          }
          if (pattern.shape === "diamond") {
            return (
              <div
                key={pattern.id}
                style={{
                  ...style,
                  background: pattern.color,
                  transform: `rotate(45deg)`,
                  borderRadius: "16px",
                  boxShadow: "0 4px 32px 0 rgba(0,0,0,0.04)",
                  border: "2px solid rgba(59,130,246,0.08)",
                }}
              />
            );
          }
          // triangle
          return (
            <svg
              key={pattern.id}
              style={style}
              viewBox="0 0 100 100"
              fill="none"
            >
              <polygon
                points="50,10 90,90 10,90"
                fill={pattern.color}
                stroke="rgba(250,204,21,0.08)"
                strokeWidth="4"
              />
            </svg>
          );
        })}
      </div>

      {/* Custom cursor arrow */}
      <div
        className="fixed w-6 h-6 pointer-events-none z-50 transition-all duration-100 rounded-full"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform:
            hoveredIndex !== null
              ? `translate(-50%, -50%) scale(1.5)`
              : `translate(-50%, -50%) scale(0)`,
          opacity: hoveredIndex !== null ? 1 : 0,
          background:
            "radial-gradient(circle, rgba(239,68,68,0.8) 0%, rgba(239,68,68,0.4) 70%)",
        }}
      />
      
      <div className="text-center mb-16 w-[450px] mx-auto">
        <h4 className="l font-extrabold tracking-tight text-gray-900">
          Where Beauty Meets Perfection!
        </h4>
        <h2 className="text-4xl font-bold tracking-tight">STYLZ N SMLYZ</h2>
        <p className="mt-4 text-lg text-gray-600 ">
          Welcome to STYLZ N SMLYZ, your ultimate destination for premium hair
          and beauty services in Lekki, Ikota, Lagos. We specialize in
          transforming your look with expert hairstyling, professional beauty
          treatments, and a luxurious salon experience tailored for both men and
          women.{" "}
        </p>
      </div>
    

      <div className="flex gap-8 pb-8 max-w-max mx-auto mt-10">
        {services.map((service, idx) => (
          <MotionDiv
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.1, delay: idx * 0.08 }}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative min-w-[300px] rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative w-full h-64">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all duration-300" />

              {/* Title on image */}
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                  {service.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <p className="mt-2 text-gray-600 font-medium">
                {service.description}
              </p>

              {service.details && (
                <p className="mt-3 text-sm text-gray-500">{service.details}</p>
              )}

              {service.durations.length > 0 && (
                <div className="mt-4 space-y-2">
                  {service.durations.map((duration, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm font-medium"
                    >
                      <span className="text-gray-500">DURATION:</span>
                      <span className="text-red-500 font-bold">{duration}</span>
                    </div>
                  ))}
                </div>
              )}

              <button className="mt-6 w-full py-2 bg-red-50 text-red-600 font-medium rounded-md hover:bg-[#e91e63] hover:text-white transition-colors cursor-pointer">
                Book Now
              </button>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};

export default Services;
