"use client";

import Link from "next/link";
import { FaWhatsapp, FaInstagram, FaTiktok } from "react-icons/fa6";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/2347013327637", // Replace with your WhatsApp link
    icon: <FaWhatsapp />,
    color: "bg-green-500",
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@stylz.n.smylz.gal", // You may want to use a TikTok icon here if you have one, e.g. <FaTiktok />
    icon: <FaTiktok />,
    color: "bg-black",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/stylz.smylz", // Replace with your Instagram link
    icon: <FaInstagram />,
    color: "bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500",
  },
];

const ContactSection = () => {
  return (
    <section className="bg-[#210b21] text-white py-16 px-6 sm:px-10 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 italiana">
          Let&apos;s Connect
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          Follow us on social media or reach out directly. We&apos;re always
          happy to chat and help you book your next appointment!
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social) => (
            <Link
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white transition transform hover:scale-110 shadow-md ${social.color}`}
              aria-label={social.name}
            >
              <span className="text-xl sm:text-2xl group-hover:scale-125 transition-transform duration-200">
                {social.icon}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
