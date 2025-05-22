"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Glow Face Serum",
    price: "₦7,500",
    image: "/products/shop-1.jpg",
    description: "Revitalize your skin with our premium face serum",
  },
  {
    id: 2,
    name: "Shea Butter Cream",
    price: "₦3,200",
    image: "/products/shop-2.jpg",
    description: "Natural moisturizer for soft and supple skin",
  },
  {
    id: 3,
    name: "Coconut Hair Oil",
    price: "₦2,800",
    image: "/products/shop-3.jpg",
    description: "Nourish your hair for a healthy shine",
  },
  {
    id: 4,
    name: "Aloe Vera Gel",
    price: "₦4,000",
    image: "/products/shop-4.jpg",
    description: "Soothing gel for skin repair and hydration",
  },
  {
    id: 5,
    name: "Edge Control Wax",
    price: "₦2,000",
    image: "/products/shop-5.jpg",
    description: "Perfect styling for sleek edges and baby hairs",
  },
];

const OnlineStoreCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const bgRef = useRef<HTMLDivElement>(null);

  // Mouse movement effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      if (!bgRef.current) return;
      const bg = bgRef.current;

      bg.style.setProperty("--x", `${clientX}px`);
      bg.style.setProperty("--y", `${clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const productsPerSlide = 2;
  const totalSlides = Math.ceil(products.length / productsPerSlide);
  const nextSlide = () => setActiveIndex((current) => (current + 1) % totalSlides);
  const prevSlide = () => setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);
  const getVisibleProducts = () => {
    const start = activeIndex * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };

  return (
    <section className="relative py-20 px-6 bg-[#4b0039] text-white overflow-hidden">
      
      {/* Background Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 192, 203, 0.2), transparent 60%),
            url('/curly-bg.svg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "background-position 0.2s ease",
          zIndex: 0,
        }}
      />

      {/* Animated Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse z-0" />
      <div className="absolute w-[300px] h-[300px] bg-pink-300/10 rounded-full blur-2xl bottom-[-50px] right-[-80px] animate-spin-slow z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="heading text-left">
            <h2 className="text-xl md:text-5xl font-bold">Explore Our Beauty Store</h2>
            <p className="text-pink-100 mt-2 text-lg">
              Premium skincare, haircare, and beauty essentials
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-8">
            <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-md transition-colors text-lg">
              Shop All Products
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation */}
          <div className="absolute top-1/2 left-2 z-20 -translate-y-1/2">
            <button
              onClick={prevSlide}
              className="bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute top-1/2 right-2 z-20 -translate-y-1/2">
            <button
              onClick={nextSlide}
              className="bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-500 ease-in-out">
            {getVisibleProducts().map((product) => (
              <div
                key={product.id}
                className="bg-white text-gray-900 rounded-3xl shadow-lg flex flex-col md:flex-row p-6 md:p-8"
              >
                <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-xl overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-full md:w-1/2 mt-6 md:mt-0 md:pl-6 space-y-4">
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <p className="text-pink-700 font-bold text-xl">{product.price}</p>
                  <p className="text-gray-700">{product.description}</p>
                  <button className="elegant-button mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-5 py-2 rounded-md transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-3 w-3 rounded-full transition-colors ${
                  i === activeIndex ? "bg-pink-500" : "bg-pink-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineStoreCarousel;