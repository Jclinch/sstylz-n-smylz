// components/Footer.tsx
"use client"
import React from 'react';
import { Button } from './ui/button';
// import '../styles.css'; // Import global styles for consistent button styling

const Footer = () => {
  return (
    <footer className="bg-[#210b21] text-white py-10 px-6 mt-12 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="mb-1">🌸 Stylz &apos;N&apos; Smylz Beauty Salon</p>
          <p className="mb-1">📍 123 Ikota Shopping Complex, Lekki-Epe Expressway, Lagos State.</p>
          <p className="mb-1">📞 (+234) 915 947 6719</p>
          <p>📧 info@radiantglow.com</p>
        </div>

        {/* Appointment Button */}
        <div>
          <h3 className="text-xl font-semibold mb-2 hidden md:block">Ready for a Glow-Up?</h3>
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
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Stylz &apos;N&apos; Smylz Beauty Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
