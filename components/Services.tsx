"use client";

import { MotionDiv } from "@/components/ui/motion-div";
import { useInView } from "react-intersection-observer";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

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

const PATTERN_COUNT = 6;

const services = [
  {
    title: "Ghana Weaving",
    description: "Professional Ghana Weaving styles tailored to perfection",
    details: "Expert care and styling for all Ghana Weaving needs",
    image: "/images/ghana-weaving.png",
  },
  {
    title: "Dreadlocks",
    description: "Specialized dreadlock services for all hair types",
    details:
      "Maintain, style, or start your dreadlocks with our skilled professionals",
    image: "/images/dreadlock.jpg",
  },
  {
    title: "Hair Treatments",
    description: "Rejuvenate your hair with our premium treatments",
    details: "Personalized care for healthy, vibrant hair",
    image: "/images/hair-treatment.jpeg",
  },
  {
    title: "Manicure",
    description: "Pamper your hands with our luxurious manicure services",
    details: "Relax and rejuvenate with expert nail care and treatments",
    image: "/images/manicure.jpg",
  },
  {
    title: "Adult & Kid haircut",
    description: "Precision haircuts for adults and children",
    details:
      "Trendy, classic, and custom cuts for all ages by experienced barbers",
    image: "/images/haircut.jpg",
  },
];

const moreServices = [
  { name: "Braiding", image: "/images/braiding.jpg" },
  { name: "Weave-on", image: "/images/weave-on.jpg" },
  { name: "Wig Installation", image: "/images/wig-installation.jpg" },
  { name: "Wig Ventilation", image: "/images/wig-ventilation.jpg" },
  { name: "Pedicure", image: "/images/pedicure.jpg" },
  { name: "Nail Studio", image: "/images/nails.jpg" },
  { name: "Make Up", image: "/images/make-up.jpg" },
  { name: "Massage Chair", image: "/images/massage-chair.jpg" },
  { name: "Piercing", image: "/images/piercing.jpg" },
  { name: "Semi Permanent lash", image: "/images/lash.jpg" },
  { name: "Training", image: "/images/training.jpg" },
];

const patternColors = [
  "rgba(239,68,68,0.08)",
  "rgba(34,197,94,0.08)",
  "rgba(59,130,246,0.08)",
  "rgba(250,204,21,0.08)",
  "rgba(168,85,247,0.08)",
  "rgba(244,63,94,0.08)",
  "rgba(16,185,129,0.08)",
];

const patternShapes = ["circle", "diamond", "triangle"];

const Services = () => {
  const { ref: inViewRef, inView: isInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const sectionRef = useRef<HTMLElement | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sectionRect, setSectionRect] = useState<DOMRect | null>(null);
  type Pattern = {
    id: number;
    size: number;
    top: number;
    left: number;
    color: string;
    shape: string;
  };
  const [patterns, setPatterns] = useState<Pattern[]>([]);

  function setRefs(node: HTMLElement | null) {
    inViewRef(node);
    sectionRef.current = node;
  }

  useEffect(() => {
    // Only generate patterns on client to avoid hydration mismatch
    setPatterns(
      Array.from({ length: PATTERN_COUNT }, (_, i) => {
        const spacing = 100 / (PATTERN_COUNT + 1);
        const isTop = i < Math.ceil(PATTERN_COUNT * 0.6);
        return {
          id: i,
          size: 80 + Math.random() * 60,
          top: isTop ? biasedRandom(0, 20, 0.2) : biasedRandom(25, 80, 0.7),
          left: spacing * (i + 1),
          color: patternColors[i % patternColors.length],
          shape: patternShapes[i % patternShapes.length],
        };
      })
    );
  }, []);

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

  // 2-2-1 layout positions (relative to center)
  // Top row: left, right; Middle row: left, right; Bottom: center
  const circlePositions = [
    // Top row
    { x: -110, y: -140 },
    { x: 110, y: -140 },
    // Middle row
    { x: -110, y: 0 },
    { x: 110, y: 0 },
    // Bottom center
    { x: 0, y: 140 },
  ];

  return (
    <section
      ref={setRefs}
      className="py-12 sm:py-20 px-4 sm:px-6 bg-white text-gray-900 relative z-20 overflow-hidden"
    >
      {/* Background Patterns */}
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
                  transform: "rotate(45deg)",
                  borderRadius: "16px",
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
                <polygon points="50,10 90,90 10,90" fill={pattern.color} />
              </svg>
            );
          }
        })}
      </div>

      {/* Header */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 w-full max-w-[450px] px-4 mx-auto"
      >
        <h4 className="font-extrabold tracking-tight text-gray-900">
          Where Beauty Meets Perfection!
        </h4>
        <h2 className="italiana text-4xl font-bold tracking-tight">
          Stylz &apos;N&apos; Smylz
        </h2>
        <h2 className="italiana text-xl font-bold tracking-tight">
          Unisex Salon{" "}
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Welcome to Stylz &apos;N&apos; Smylz Unisex Salon, your ultimate
          destination for premium hair and beauty services in megamound shopping
          complex ikota, Lagos.
        </p>
      </MotionDiv>

      {/* Services Layout */}
      <div className="relative flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto mt-20 gap-10 px-4 z-10">
        {/* Desktop 2-2-1 Circular Layout */}
        <div className="relative w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:block hidden">
          {services.map((service, i) => {
            const pos = circlePositions[i];
            return (
              <div
                key={i}
                className="group absolute w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] border-4 border-white rounded-full overflow-hidden shadow-md flex items-end justify-center transition-all duration-300"
                style={{
                  top: `calc(50% + ${pos.y}px)`,
                  left: `calc(50% + ${pos.x}px)`,
                  transform: "translate(-50%, -50%)",
                  background: "#fff",
                  zIndex: 10 - i,
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute bottom-4 text-base sm:text-base font-bold text-white bg-black/60 px-4 py-2 rounded z-10 pointer-events-none text-center w-[85%]">
                  {service.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout: Stack Services */}
        <div className="lg:hidden flex flex-wrap justify-center gap-4 max-w-md mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative w-36 h-36 rounded-full overflow-hidden shadow-md group"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-4 text-[10px] font-bold text-white bg-black/60 px-2 py-1 rounded z-10 pointer-events-none">
                {service.title}
              </span>
            </div>
          ))}
        </div>

        {/* Right Side Description */}
        <div className="max-w-xl text-center lg:text-left space-y-6 mt-10 lg:mt-0">
          <h2 className="text-3xl font-bold italiana">
            Explore All Our Services
          </h2>
          <p className="text-gray-600 text-base">
            From expert hair styling to relaxing beauty treatments, Stylz
            &apos;N&apos; Smylz has you covered. Browse our wide range of
            premium services designed for both men and women.
          </p>

          <div className="bg-gray-100 p-4 rounded-xl border border-gray-200 text-left mt-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Opening Hours
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>
                <strong>Mon - Sat:</strong> 9:00am – 9:00pm
              </li>
              <li>
                <strong>Sun:</strong> 12:00 Noon – 8:00pm
              </li>
            </ul>
          </div>

          <ul className="grid grid-cols-2 gap-2 text-sm sm:text-base text-gray-700 relative">
            {moreServices.map((service, index) => (
              <li
                key={index}
                className="relative before:content-['•'] before:mr-2 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {hoveredIndex === index && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 z-20">
                    <Image
                      src={service.image}
                      alt={service.name}
                      width={120}
                      height={120}
                      className="rounded-full shadow-lg border-2 border-white transition-transform duration-300 scale-105"
                    />
                  </div>
                )}
                {service.name}
              </li>
            ))}
          </ul>
          <Button
            size="lg"
            asChild
            className="bg-[#6E226A]/90 text-white hover:bg-[#B779B3] font-semibold shadow-lg rounded-3xl"
          >
            <Link href="/services">View All</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
