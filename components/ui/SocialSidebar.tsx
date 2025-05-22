'use client'
import Link from 'next/link'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const socials = [
  {
    name: 'Facebook',
    icon: <FaFacebookF />,
    href: 'https://facebook.com',
    color: 'bg-blue-600'
  },
  {
    name: 'Twitter',
    icon: <FaTwitter />,
    href: 'https://twitter.com',
    color: 'bg-sky-500'
  },
  {
    name: 'Instagram',
    icon: <FaInstagram />,
    href: 'https://instagram.com',
    color: 'bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600'
  },
  {
    name: 'YouTube',
    icon: <FaYoutube />,
    href: 'https://youtube.com',
    color: 'bg-red-600'
  }
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
          className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${item.color} hover:scale-110 transition-transform`}
        >
          {item.icon}
        </Link>
      ))}
    </div>
  )
}

export default SocialSidebar
