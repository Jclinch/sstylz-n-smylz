"use client";

import { MotionDiv } from "@/components/ui/motion-div";
import { useInView } from "react-intersection-observer";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

// Utility: Biased random number generator
function biasedRandom(
  min: number,
  max: number,
  bias: number = 0.5,
  influence: number = 0.8
) {
  const rnd = Math.random();
  const mix = (1 - influence) * rnd + influence * bias;
  return min + mix * (max - min);
}

// Pattern generation logic
const PATTERN_COUNT = 6;
const patterns = Array.from({ length: PATTERN_COUNT }, (_, i) => {
  const spacing = 100 / (PATTERN_COUNT + 1);
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
    title: "Manicure",
    description: "Pamper your feet with our luxurious manicure services",
    details: "Relax and rejuvenate with expert foot care and nail treatments",
    durations: ["1 HR | ₦4,000"],
    image: "/images/manicure.jpg",
  },
];

const Services = () => {
  const { ref: inViewRef, inView: isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionRect, setSectionRect] = useState<DOMRect | null>(null);

  function setRefs(node: HTMLElement | null) {
    inViewRef(node);
    sectionRef.current = node;
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateRect = () => {
      if (sectionRef.current) {
        setSectionRect(sectionRef.current.getBoundingClientRect());
      }
    };
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, []);

  const relCursor = {
    x:
      sectionRect && sectionRect.width
        ? (cursorPos.x - sectionRect.left) / sectionRect.width
        : 0.5,
    y:
      sectionRect && sectionRect.height
        ? (cursorPos.y - sectionRect.top) / sectionRect.height
        : 0.5,
  };

  return (
    <section
      ref={setRefs}
      className="py-12 sm:py-20 px-4 sm:px-6 bg-white text-gray-900 relative z-20 overflow-hidden"
    >
      {/* Floating background patterns */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {patterns.map((pattern) => {
          const moveX =
            (relCursor.x - 0.5) * 60 * (pattern.id % 2 === 0 ? 1 : -1);
          const moveY =
            (relCursor.y - 0.5) * 60 * (pattern.id % 2 === 1 ? 1 : -1);
          const style: React.CSSProperties = {
            position: "absolute",
            top: `calc(${pattern.top}% + ${moveY}px)`,
            left: `calc(${pattern.left}% + ${moveX}px)`,
            width: pattern.size,
            height: pattern.size,
            opacity: 1,
            zIndex: 1,
            transition: "top 0.3s ease, left 0.3s ease",
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
          } else if (pattern.shape === "diamond") {
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
          } else {
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
          }
        })}
      </div>

      {/* Custom cursor indicator */}
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

      {/* Section Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 w-full max-w-[450px] px-4 mx-auto"
      >
        <h4 className="font-extrabold tracking-tight text-gray-900">
          Where Beauty Meets Perfection!
        </h4>
        <h2 className="text-4xl font-bold tracking-tight">
          STYLZ &apos;n&apos; SMLYZ
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to STYLZ &apos;n&apos; SMLYZ, your ultimate destination for
          premium hair and beauty services in Lekki, Ikota, Lagos. We specialize
          in transforming your look with expert hairstyling, professional beauty
          treatments, and a luxurious salon experience tailored for both men and
          women.
        </p>
      </MotionDiv>

      {/* Service Cards */}
      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.01, delay: 0.01 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8 max-w-7xl mx-auto mt-10 px-4"
      >
        {services.map((service, idx) => (
          <MotionDiv
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.1, ease: "easeOut", delay: idx * 0.01 }}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative w-full rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="relative w-full h-32 sm:h-48 md:h-64">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-all duration-300" />
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-2xl font-bold text-white drop-shadow-md">
                  {service.title}
                </h3>
              </div>
            </div>
            <div className="p-3 sm:p-4 md:p-6">
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 font-medium">
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
                      <span className="text-gray-500 text-[8px] md:text-sm">
                        DURATION:
                      </span>
                      <span className="text-red-500 font-bold text-[8px] md:text-sm">
                        {duration}
                        <br className="md:block hidden" />
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <button className="mt-3 sm:mt-6 w-full py-2 sm:py-3 text-sm sm:text-base bg-red-50 text-red-600 font-medium rounded-md hover:bg-[#e91e63] hover:text-white transition-colors cursor-pointer">
                Book Now
              </button>
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};

export default Services;
