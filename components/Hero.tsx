"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/components/ui/motion-div";
import Image from "next/image";
import Link from "next/link";
import SocialSidebar from "./ui/SocialSidebar";

const Hero = () => {
  return (
    <section className=" karla relative h-screen flex items-center justify-center text-center px-4 overflow-hidden pt-[100px] mt-[-100px]">
      {/* Background image - ensure this has enough contrast */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg1.png"
          alt="Salon Background"
          fill
          className="object-cover w-full h-full"
          priority
          sizes="100vw"
        />
      </div>

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
              className="italiana text-[4rem] md:text-[6rem] font-black leading-none  tracking-tighter text-transparent bg-clip-text animate-gradient"
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
              Stylz &apos;N&apos; Smylz
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
        {/* sub header */}
        <div className="karla mt-6 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl text-white text-lg max-w-2xl mx-auto">
          Luxury beauty services: Hair, Nails, Lashes, Wellness & more.
        </div>

        <div className="mt-8 text-center">
            <Button
            size="lg"
            asChild
            className="bg-[#6E226A]/90 text-white hover:bg-[#B779B3] font-semibold shadow-lg rounded-3xl"
            >
            <Link
              href="https://wa.me/2347013327637"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Now
            </Link>
            </Button>
        </div>
      </MotionDiv>

      <SocialSidebar />
    </section>
  );
};

export default Hero;
