"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

const services = [
  "braid", "dreadlock", "manicure", "pedicure", "haircut",
  "ghanaWeaving", "hairTreatment", "weaveOn", "wigInstallation", "wigVentilation",
  "makeUp", "massageChair", "piercing", "lash", "training"
] as const;

type ServiceName = (typeof services)[number];

const serviceDetails: Record<ServiceName, {
  title: string;
  description: string;
  details: string;
}> = {
  "braid": {
    title: "Braids & Protective Styles",
    description: "Timeless and trendy braiding options to protect and style your crown.",
    details: "Cornrows, knotless braids, and creative patterns all done with gentle precision."
  },
  "dreadlock": {
    title: "Dreadlock Studio",
    description: "Bold, stylish, and unique – embrace your natural locks with expert hands.",
    details: "From starter locs to maintenance and creative styles, we specialize in making your dreads pop."
  },
  "manicure": {
    title: "Manicure Magic",
    description: "Transform your hands with our luxurious nail care and polish perfection.",
    details: "From classic to artistic nails, we offer precision grooming and trendy designs that speak elegance."
  },
  "pedicure": {
    title: "Soothing Pedicure Spa",
    description: "Refresh your soles with deep cleaning, polish, and luxurious foot massage.",
    details: "Our spa pedicure includes exfoliation, callus care, and rejuvenating oils."
  },
  "haircut": {
    title: "Classic & Creative Haircuts",
    description: "Tailored cuts for adults and kids – modern, stylish, and sharp.",
    details: "Barbering meets art with trims, fades, and custom styles for every personality and age."
  },
  "ghanaWeaving": {
    title: "Ghana Weaving Elegance",
    description: "Perfectly patterned Ghana weaving tailored to showcase your beauty and individuality.",
    details: "Our stylists craft each braid with precision and care, ensuring durability, comfort, and beauty."
  },
  "hairTreatment": {
    title: "Signature Hair Treatments",
    description: "Rejuvenate and restore your hair with nourishing, premium treatments.",
    details: "Deep conditioning, protein infusions, and tailored regimens that leave your hair vibrant and healthy."
  },
  "weaveOn": {
    title: "Luxury Weave-On",
    description: "Flawless installs and styling for a natural and voluminous finish.",
    details: "From sew-ins to frontal installations, we make every strand blend effortlessly."
  },
  "wigInstallation": {
    title: "Wig Installation Experts",
    description: "Melt that lace! Get seamless wig installs with style that slays.",
    details: "We handle closures, frontals, and full wigs with secure, breathable techniques."
  },
  "wigVentilation": {
    title: "Wig Revamp & Ventilation",
    description: "Breathe life back into your wigs with professional touch-ups.",
    details: "From part replacements to ventilation, we restore volume and shape flawlessly."
  },
  "makeUp": {
    title: "Makeup Artistry",
    description: "Flawless glam for all occasions, from soft glow to bold and fierce.",
    details: "Let our MUA enhance your features for weddings, shoots, or everyday beauty."
  },
  "massageChair": {
    title: "Relaxing Massage Chair",
    description: "Melt away tension with our full-body massage chair experience.",
    details: "Feel the stress disappear as you're gently massaged from head to toe in comfort."
  },
  "piercing": {
    title: "Precision Piercing",
    description: "Safe and stylish ear and nose piercings done by trained professionals.",
    details: "We use sanitized tools, hypoallergenic jewelry, and offer aftercare tips."
  },
  "lash": {
    title: "Luxe Semi-Permanent Lashes",
    description: "Fluffy, full, and fabulous – lashes that last and amplify your gaze.",
    details: "Choose from classic, hybrid, or volume sets to define your lash look."
  },
  "training": {
    title: "Professional Training",
    description: "Learn the art and science of beauty with our expert-led training sessions.",
    details: "We offer hands-on courses in hair styling, braiding, makeup, and more for aspiring professionals and enthusiasts."
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ServicePage() {
  return (
    <div>
      {/* Hero */}
      {/* 
        To improve page load speed with many images:
        - Use Next.js <Image> with 'loading="lazy"' for non-critical images.
        - Only load a few images initially, and load others on scroll or modal open.
        - Consider using lower-res thumbnails in the grid, and load full-res in modal.
        - Use webp format if possible for smaller file sizes.
      */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
      >
        <Image
          src="/services/service-hero.png"
          alt="Service Hero Background"
          fill
          sizes="100vw"
          className="object-cover z-[-1]"
          priority
        />
        <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
            Our Services
          </h1>
          <p className="mt-4 text-lg text-gray-200 max-w-2xl">
            Elevate your beauty experience with our range of luxurious and professional services at Stylz &apos;N&apos; Smylz Unisex Salon.
          </p>
        </div>
      </motion.div>

      {/* Services List */}
      <section className="max-w-7xl mx-auto py-24 px-6 space-y-32">
        {services.map((service, idx) => (
          <ServiceBlock key={service} name={service} idx={idx} />
        ))}
      </section>
    </div>
  );
}

const ServiceBlock = ({ name, idx }: { name: ServiceName; idx: number }) => {
  const isEven = idx % 2 === 0;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const slug = name.toLowerCase().replace(/\s+/g, "-");
  const info = serviceDetails[name];

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentImage((prev) => {
      if (direction === "left") return prev === 0 ? 9 : prev - 1;
      if (direction === "right") return prev === 9 ? 0 : prev + 1;
      return prev;
    });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleSwipe("left");
      if (e.key === "ArrowRight") handleSwipe("right");
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id={slug}
      className={`flex flex-col md:flex-row ${!isEven ? "md:flex-row-reverse" : ""} gap-10 items-center`}
    >
      {/* Text */}
      <div className="md:w-1/2 space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold">{info.title}</h2>
        <p className="text-lg font-semibold text-[#6E226A]">{info.description}</p>
        <p className="text-base">{info.details}</p>
      </div>

      {/* Gallery */}
      <div className="md:w-1/2 rounded-xl shadow-lg border p-2">
        <div className="grid grid-cols-3 gap-3 h-[340px] overflow-y-auto pr-1"> {/* Added height + scroll */}
          {Array.from({ length: 10 }).map((_, i) => (
            <Image
              key={i}
              src={`/services/${slug}/${slug}${i + 1}.jpg`}
              alt={`${info.title} image ${i + 1}`}
              width={200}
              height={200}
              className="w-[160px] h-[160px] object-cover rounded cursor-pointer mx-auto"
              onClick={() => {
                setCurrentImage(i);
                setModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg p-4 max-w-xl w-full aspect-[4/3] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/services/${slug}/${slug}${currentImage + 1}.jpg`}
              alt="Expanded"
              width={800}
              height={600}
              className="object-contain rounded max-h-full max-w-full"
            />
            {/* Arrows */}
            <button
              onClick={() => handleSwipe("left")}
              className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
            >
              <AiOutlineLeft size={24} />
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
            >
              <AiOutlineRight size={24} />
            </button>
            {/* Close */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};