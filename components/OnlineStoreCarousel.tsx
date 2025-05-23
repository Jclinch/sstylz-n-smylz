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
  const [isMobile, setIsMobile] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse-based background motion
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      bgRef.current.style.setProperty("--x", `${e.clientX}px`);
      bgRef.current.style.setProperty("--y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Swipe tracking (mobile)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  const productsPerSlide = 2;
  const totalSlides = Math.ceil(products.length / productsPerSlide);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getVisibleProducts = () => {
    const start = activeIndex * productsPerSlide;
    return products.slice(start, start + productsPerSlide);
  };

  return (
    <section className="relative py-20 px-6 bg-[#4b0039] text-white overflow-hidden">
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
      <div className="absolute w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse z-0" />
      <div className="absolute w-[300px] h-[300px] bg-pink-300/10 rounded-full blur-2xl bottom-[-50px] right-[-80px] animate-spin-slow z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="heading text-left">
            <h2 className="text-xl md:text-5xl font-bold">Explore Our Beauty Store</h2>
            <p className="text-pink-100 mt-2 text-lg">Premium skincare, haircare, and beauty essentials</p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-8">
            <button className="bg-pink-600 rounded-full hover:bg-pink-700 text-white font-semibold px-4 py-2 text-lg">
              Shop All Products
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Desktop Navigation */}
          {!isMobile && (
            <div className="flex mb-4">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition border-4 border-[#ee85d6]"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="ml-4 bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition border-4 border-[#ee85d6]"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </div>
          )}

          {/* Products */}
          {isMobile ? (
            <div>
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide"
              >
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-[80%] max-w-[80%] snap-center bg-white text-gray-900 rounded-3xl shadow-lg flex-shrink-0 p-4 flex flex-col h-[410px]"
                  >
                    <div className="relative w-full h-40 rounded-xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-4 flex flex-col justify-between flex-grow">
                      <div>
                        <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
                        <p className="text-pink-700 font-bold text-base">{product.price}</p>
                        <p className="text-gray-700 text-sm line-clamp-2">{product.description}</p>
                      </div>
                      <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-md transition">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Swipe Indicators */}
              <div className="flex justify-center gap-2 mt-6">
                {products.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition ${
                      activeIndex === i ? "bg-pink-500 scale-125" : "bg-pink-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Desktop carousel
            <div className="grid grid-cols-2 gap-6 transition-all duration-500 ease-in-out">
              {getVisibleProducts().map((product) => (
                <div
                  key={product.id}
                  className="w-full h-[400px] bg-white text-gray-900 rounded-3xl shadow-lg flex flex-col md:flex-row p-4 md:p-8"
                >
                  <div className="relative w-full md:w-1/2 h-40 md:h-full rounded-xl overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg md:text-2xl font-bold line-clamp-1">{product.name}</h3>
                      <p className="text-pink-700 font-bold text-base md:text-xl">{product.price}</p>
                      <p className="text-gray-700 text-sm md:text-base line-clamp-2">{product.description}</p>
                    </div>
                    <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 md:rounded-full rounded-full transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isMobile && (
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
          )}
        </div>
      </div>
    </section>
  );
};

export default OnlineStoreCarousel;



// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import Image from "next/image";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

// const products = [
//   {
//     id: 1,
//     name: "Glow Face Serum",
//     price: "₦7,500",
//     image: "/products/shop-1.jpg",
//     description: "Revitalize your skin with our premium face serum",
//   },
//   {
//     id: 2,
//     name: "Shea Butter Cream",
//     price: "₦3,200",
//     image: "/products/shop-2.jpg",
//     description: "Natural moisturizer for soft and supple skin",
//   },
//   {
//     id: 3,
//     name: "Coconut Hair Oil",
//     price: "₦2,800",
//     image: "/products/shop-3.jpg",
//     description: "Nourish your hair for a healthy shine",
//   },
//   {
//     id: 4,
//     name: "Aloe Vera Gel",
//     price: "₦4,000",
//     image: "/products/shop-4.jpg",
//     description: "Soothing gel for skin repair and hydration",
//   },
//   {
//     id: 5,
//     name: "Edge Control Wax",
//     price: "₦2,000",
//     image: "/products/shop-5.jpg",
//     description: "Perfect styling for sleek edges and baby hairs",
//   },
// ];

// const OnlineStoreCarousel = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [productsPerSlide, setProductsPerSlide] = useState(2);
//   const bgRef = useRef<HTMLDivElement>(null);

//   // Responsive logic
//   useEffect(() => {
//     const handleResize = () => {
//       const screenWidth = window.innerWidth;
//       if (screenWidth < 768) {
//         setProductsPerSlide(2); // mobile: 2 per view
//       } else {
//         setProductsPerSlide(2); // desktop: 2 per view (unchanged)
//       }
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Mouse background effect
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!bgRef.current) return;
//       bgRef.current.style.setProperty("--x", `${e.clientX}px`);
//       bgRef.current.style.setProperty("--y", `${e.clientY}px`);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   const totalSlides = Math.ceil(products.length / productsPerSlide);

//   const nextSlide = () =>
//     setActiveIndex((current) => (current + 1) % totalSlides);

//   const prevSlide = () =>
//     setActiveIndex((current) => (current - 1 + totalSlides) % totalSlides);

//   const getVisibleProducts = () => {
//     const start = activeIndex * productsPerSlide;
//     return products.slice(start, start + productsPerSlide);
//   };

//   return (
//     <section className="relative py-20 px-6 bg-[#4b0039] text-white overflow-hidden">
//       <div
//         ref={bgRef}
//         className="absolute inset-0 pointer-events-none"
//         style={{
//           backgroundImage: `
//             radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255, 192, 203, 0.2), transparent 60%),
//             url('/curly-bg.svg')`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           transition: "background-position 0.2s ease",
//           zIndex: 0,
//         }}
//       />

//       <div className="absolute w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse z-0" />
//       <div className="absolute w-[300px] h-[300px] bg-pink-300/10 rounded-full blur-2xl bottom-[-50px] right-[-80px] animate-spin-slow z-0" />

//       <div className="max-w-7xl mx-auto relative z-10">
//         {/* Heading */}
//         <div className="flex flex-col md:flex-row items-center justify-between mb-10">
//           <div className="heading text-left">
//             <h2 className="text-xl md:text-5xl font-bold">
//               Explore Our Beauty Store
//             </h2>
//             <p className="text-pink-100 mt-2 text-lg">
//               Premium skincare, haircare, and beauty essentials
//             </p>
//           </div>
//           <div className="mt-6 md:mt-0 md:ml-8">
//             <button className="bg-pink-600 rounded-full hover:bg-pink-700 text-white font-semibold px-4 py-2 transition-colors text-lg">
//               Shop All Products
//             </button>
//           </div>
//         </div>

//         {/* Carousel */}
//         <div className="relative">
//           {/* Navigation */}
//           <button
//             onClick={prevSlide}
//             aria-label="Previous slide"
//             className="bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition mb-4 border-4 border-[#ee85d6]"
//           >
//             <ChevronLeftIcon className="h-6 w-6" />
//           </button>

//           <button
//             onClick={nextSlide}
//             aria-label="Next slide"
//             className="ml-4 bg-[#4b0039] text-white p-2 rounded-full shadow hover:bg-[#ee85d6] transition mb-4 border-4 border-[#ee85d6]"
//           >
//             <ChevronRightIcon className="h-6 w-6" />
//           </button>

//           {/* Cards */}
//           <div className="grid grid-cols-2 gap-4 sm:gap-6 md:flex md:flex-nowrap md:overflow-visible overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
//             {getVisibleProducts().map((product) => (
//               <div
//                 key={product.id}
//                 className="w-full bg-white text-gray-900 rounded-3xl shadow-lg flex flex-col md:flex-row p-4 md:p-8 snap-center"
//               >
//                 <div className="relative w-full md:w-1/2 h-40 md:h-80 rounded-xl overflow-hidden">
//                   <Image
//                     src={product.image}
//                     alt={product.name}
//                     fill
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                     className="object-cover"
//                     placeholder="blur"
//                     blurDataURL="/placeholder.jpg"
//                   />
//                 </div>
//                 <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-6 space-y-4">
//                   <h3 className="text-lg md:text-2xl font-bold">
//                     {product.name}
//                   </h3>
//                   <p className="text-pink-700 font-bold text-base md:text-xl">
//                     {product.price}
//                   </p>
//                   <p className="text-gray-700 text-sm md:text-base">
//                     {product.description}
//                   </p>
//                   <button className="elegant-button mt-3 bg-pink-600 hover:bg-pink-700 text-xs md:text-sm text-white font-semibold px-4 py-2 rounded-md transition">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Indicators */}
//           <div className="flex justify-center mt-6 gap-2">
//             {Array.from({ length: totalSlides }).map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveIndex(i)}
//                 className={`h-3 w-3 rounded-full transition-colors ${
//                   i === activeIndex ? "bg-pink-500" : "bg-pink-200"
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OnlineStoreCarousel;
