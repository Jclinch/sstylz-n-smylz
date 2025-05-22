// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { MotionDiv } from "@/components/ui/motion-div";
// import Image from "next/image";
// import Link from "next/link";
// import SocialSidebar from "./ui/SocialSidebar";

// const Hero = () => {
//   return (
//     <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
//       {/* Background image */}
//       <Image
//         src="/images/hero-bg.jpg"
//         alt="Salon Background"
//         fill
//         className="object-cover z-0"
//         priority
//       />

//       {/* Gradient overlay with knockout group */}
//       <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-pink-800/60 to-black/70 flex items-center justify-center isolate">
//         {/* Knockout Text */}
//         <h1
//   className="text-[3.5rem] md:text-[5rem] font-extrabold leading-tight text-transparent bg-clip-text z-20"
//   style={{
//     backgroundImage: "transparent",
//     backgroundSize: "100% 100%",
//     backgroundRepeat: "no-repeat",
//     WebkitBackgroundClip: "text",
//     backgroundClip: "text", // for Firefox
//   }}
// >
//   Sstylz & Smylz
// </h1>

//       </div>

//       {/* Motion content on top */}
//       <MotionDiv
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="absolute bottom-24 z-30 w-full px-4"
//       >
//         {/* Subtext */}
//         <div className="mt-6 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white text-lg max-w-2xl mx-auto">
//           Luxury beauty services: Hair, Nails, Lashes, Wellness & more.
//         </div>

//         {/* Button */}
//         <div className="mt-8 text-center">
//           <Button size="lg" asChild>
//             <Link href="/booking">Book Now</Link>
//           </Button>
//         </div>
//       </MotionDiv>

//       <SocialSidebar />
//     </section>
//   );
// };

// export default Hero;

"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import Image from "next/image";
import Link from "next/link";
import SocialSidebar from "./ui/SocialSidebar";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-4 overflow-hidden">
      {/* Background image - ensure this has enough contrast */}
      <Image
        src="/images/hero-bg.jpg"
        alt="Salon Background"
        fill
        className="object-cover z-0 brightness-75 contrast-125"
        priority
      />

      {/* Semi-transparent overlay for better text contrast */}
      <div className="absolute inset-0 z-10 bg-black/30 flex items-center justify-center">
        {/* Knockout Text Container */}
        <div className="relative isolate">
          {/* Glow effect behind text */}
          <div
            className="absolute inset-0 blur-xl opacity-60"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)",
              zIndex: -1,
            }}
          ></div>

          {/* Main knockout text */}
          <MotionDiv
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1
              className="text-[4rem] md:text-[6rem] font-black leading-none uppercase tracking-tighter text-transparent bg-clip-text animate-gradient"
              style={{
                backgroundImage:
                  "linear-gradient(270deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4), rgba(255,255,255,0.8))",
                backgroundSize: "400% 400%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                mixBlendMode: "lighten",
                letterSpacing: "-0.03em",
                lineHeight: "0.85",
              }}
            >
              Sstylz & Smylz
            </h1>
          </MotionDiv>
        </div>
      </div>

      {/* CTA section */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-24 z-30 w-full px-4"
      >
        <div className="mt-6 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white text-lg max-w-2xl mx-auto">
          Luxury beauty services: Hair, Nails, Lashes, Wellness & more.
        </div>

        <div className="mt-8 text-center">
          <Button
            size="lg"
            asChild
            className="bg-white/90 hover:bg-white text-pink-900 hover:text-pink-950 font-semibold shadow-lg"
          >
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </MotionDiv>

      <SocialSidebar />
    </section>
  );
};

export default Hero;
