// components/Footer.tsx
"use client"
import React from 'react';
// import '../styles.css'; // Import global styles for consistent button styling

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-gray-700 py-10 px-6 mt-12 ">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <p className="mb-1">🌸 Radiant Glow Beauty Salon</p>
          <p className="mb-1">📍 123 Blossom Street, Beautyville</p>
          <p className="mb-1">📞 (123) 456-7890</p>
          <p>📧 info@radiantglow.com</p>
        </div>

        {/* Appointment Button */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Ready for a Glow-Up?</h3>
          <button
            className="elegant-button"
            onClick={() => window.location.href = '/appointments'}
          >
            Book an Appointment
          </button>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()} Radiant Glow Beauty Salon. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
