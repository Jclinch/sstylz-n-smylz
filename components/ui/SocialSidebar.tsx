'use client'
import Link from 'next/link'
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

const socials = [
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
]


const SocialSidebar = () => {
  return (
   <div className="hidden md:flex flex-col gap-3 fixed top-1/3 right-4 z-50">
  {socials.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-12 h-12 flex items-center justify-center rounded-full text-white text-2xl ${item.color} hover:scale-110 transition-transform glossy-icon`}
    >
      <span className="flex items-center justify-center w-full h-full">
        {item.icon}
      </span>
    </Link>
  ))}
</div>

  )
}

export default SocialSidebar
