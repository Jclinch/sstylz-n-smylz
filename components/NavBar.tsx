"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation"; // ← for active route detection
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); // ← Get current route

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        isScrolled ? "bg-black/70 backdrop-blur" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Stylz 'n' Smylz Logo"
            width={60}
            height={50}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
                <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium text-white hover:text-[#B779B3] transition-colors"
                >
                {isActive && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-[#D4B16D] opacity-50 rounded-full pointer-events-none z-[-1]" />
                )}
                {link.name}
                </Link>
            );
          })}
        </nav>

        {/* Book Now Button */}
        <div className="hidden md:block">
          <a
            href="https://wa.me/2347013327637"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full bg-[#93458F] hover:bg-[#B779B3] text-white">
              Book an Appointment
            </Button>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-500"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-white shadow-md md:hidden"
          >
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={clsx(
                    "relative text-sm font-medium text-gray-700 hover:text-[#B779B3]",
                    pathname === link.href && "text-[#93458F]"
                  )}
                >
                  {pathname === link.href && (
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-500 opacity-40 rounded-full pointer-events-none z-[-1]" />
                  )}
                  {link.name}
                </Link>
              ))}
              <Button className="w-full rounded-full bg-[#93458F] text-white hover:bg-[#B779B3]">
                Book an Appointment
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
