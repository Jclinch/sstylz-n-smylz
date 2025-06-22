// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { useInView } from "react-intersection-observer";
// import { useState, useEffect } from "react";

// import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";

// const services = [
//   "braid", "dreadlock", "manicure", "pedicure", "haircut",
//   "ghanaWeaving", "hairTreatment", "weaveOn", "wigInstallation", "wigVentilation",
//   "makeUp", "massageChair", "piercing", "lash", "training"
// ] as const;

// type ServiceName = (typeof services)[number];

// const serviceDetails: Record<ServiceName, {
//   title: string;
//   description: string;
//   details: string;
// }> = {
//   "braid": {
//     title: "Braids & Protective Styles",
//     description: "Timeless and trendy braiding options to protect and style your crown.",
//     details: "Cornrows, knotless braids, and creative patterns all done with gentle precision."
//   },
//   "dreadlock": {
//     title: "Dreadlock Studio",
//     description: "Bold, stylish, and unique – embrace your natural locks with expert hands.",
//     details: "From starter locs to maintenance and creative styles, we specialize in making your dreads pop."
//   },
//   "manicure": {
//     title: "Manicure Magic",
//     description: "Transform your hands with our luxurious nail care and polish perfection.",
//     details: "From classic to artistic nails, we offer precision grooming and trendy designs that speak elegance."
//   },
//   "pedicure": {
//     title: "Soothing Pedicure Spa",
//     description: "Refresh your soles with deep cleaning, polish, and luxurious foot massage.",
//     details: "Our spa pedicure includes exfoliation, callus care, and rejuvenating oils."
//   },
//   "haircut": {
//     title: "Classic & Creative Haircuts",
//     description: "Tailored cuts for adults and kids – modern, stylish, and sharp.",
//     details: "Barbering meets art with trims, fades, and custom styles for every personality and age."
//   },
//   "ghanaWeaving": {
//     title: "Ghana Weaving Elegance",
//     description: "Perfectly patterned Ghana weaving tailored to showcase your beauty and individuality.",
//     details: "Our stylists craft each braid with precision and care, ensuring durability, comfort, and beauty."
//   },
//   "hairTreatment": {
//     title: "Signature Hair Treatments",
//     description: "Rejuvenate and restore your hair with nourishing, premium treatments.",
//     details: "Deep conditioning, protein infusions, and tailored regimens that leave your hair vibrant and healthy."
//   },
//   "weaveOn": {
//     title: "Luxury Weave-On",
//     description: "Flawless installs and styling for a natural and voluminous finish.",
//     details: "From sew-ins to frontal installations, we make every strand blend effortlessly."
//   },
//   "wigInstallation": {
//     title: "Wig Installation Experts",
//     description: "Melt that lace! Get seamless wig installs with style that slays.",
//     details: "We handle closures, frontals, and full wigs with secure, breathable techniques."
//   },
//   "wigVentilation": {
//     title: "Wig Revamp & Ventilation",
//     description: "Breathe life back into your wigs with professional touch-ups.",
//     details: "From part replacements to ventilation, we restore volume and shape flawlessly."
//   },
//   "makeUp": {
//     title: "Makeup Artistry",
//     description: "Flawless glam for all occasions, from soft glow to bold and fierce.",
//     details: "Let our MUA enhance your features for weddings, shoots, or everyday beauty."
//   },
//   "massageChair": {
//     title: "Relaxing Massage Chair",
//     description: "Melt away tension with our full-body massage chair experience.",
//     details: "Feel the stress disappear as you're gently massaged from head to toe in comfort."
//   },
//   "piercing": {
//     title: "Precision Piercing",
//     description: "Safe and stylish ear and nose piercings done by trained professionals.",
//     details: "We use sanitized tools, hypoallergenic jewelry, and offer aftercare tips."
//   },
//   "lash": {
//     title: "Luxe Semi-Permanent Lashes",
//     description: "Fluffy, full, and fabulous – lashes that last and amplify your gaze.",
//     details: "Choose from classic, hybrid, or volume sets to define your lash look."
//   },
//   "training": {
//     title: "Professional Training",
//     description: "Learn the art and science of beauty with our expert-led training sessions.",
//     details: "We offer hands-on courses in hair styling, braiding, makeup, and more for aspiring professionals and enthusiasts."
//   }
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// export default function ServicePage() {
//   return (
//     <div>
//       {/* Hero */}
//       {/* 
//         To improve page load speed with many images:
//         - Use Next.js <Image> with 'loading="lazy"' for non-critical images.
//         - Only load a few images initially, and load others on scroll or modal open.
//         - Consider using lower-res thumbnails in the grid, and load full-res in modal.
//         - Use webp format if possible for smaller file sizes.
//       */}
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={fadeInUp}
//         className="relative h-[80vh] w-full overflow-hidden mt-[-120px]"
//       >
//         <Image
//           src="/services/service-hero.png"
//           alt="Service Hero Background"
//           fill
//           sizes="100vw"
//           className="object-cover z-[-1]"
//           priority
//         />
//         <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-center items-center text-center text-white px-4">
//           <h1 className="text-white text-4xl md:text-5xl font-bold italiana">
//             Our Services
//           </h1>
//           <p className="mt-4 text-lg text-gray-200 max-w-2xl">
//             Elevate your beauty experience with our range of luxurious and professional services at Stylz &apos;N&apos; Smylz Unisex Salon.
//           </p>
//         </div>
//       </motion.div>

//       {/* Services List */}
//       <section className="max-w-7xl mx-auto py-24 px-6 space-y-32">
//         {services.map((service, idx) => (
//           <ServiceBlock key={service} name={service} idx={idx} />
//         ))}
//       </section>
//     </div>
//   );
// }

// const ServiceBlock = ({ name, idx }: { name: ServiceName; idx: number }) => {
//   const isEven = idx % 2 === 0;
//   const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
//   const slug = name.toLowerCase().replace(/\s+/g, "-");
//   const info = serviceDetails[name];

//   const [isModalOpen, setModalOpen] = useState(false);
//   const [currentImage, setCurrentImage] = useState(0);

//   const handleSwipe = (direction: "left" | "right") => {
//     setCurrentImage((prev) => {
//       if (direction === "left") return prev === 0 ? 9 : prev - 1;
//       if (direction === "right") return prev === 9 ? 0 : prev + 1;
//       return prev;
//     });
//   };

//   useEffect(() => {
//     const handleKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowLeft") handleSwipe("left");
//       if (e.key === "ArrowRight") handleSwipe("right");
//       if (e.key === "Escape") setModalOpen(false);
//     };
//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   return (
//     <motion.div
//       ref={ref}
//       variants={fadeInUp}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       id={slug}
//       className={`flex flex-col md:flex-row ${!isEven ? "md:flex-row-reverse" : ""} gap-10 items-center`}
//     >
//       {/* Text */}
//       <div className="md:w-1/2 space-y-4 text-gray-800">
//         <h2 className="text-3xl font-bold">{info.title}</h2>
//         <p className="text-lg font-semibold text-[#6E226A]">{info.description}</p>
//         <p className="text-base">{info.details}</p>
//       </div>

//       {/* Gallery */}
//       <div className="md:w-1/2 rounded-xl shadow-lg border p-2">
//         <div className="grid grid-cols-3 gap-3 h-[340px] overflow-y-auto pr-1"> {/* Added height + scroll */}
//           {Array.from({ length: 10 }).map((_, i) => (
//             <Image
//               key={i}
//               src={`/services/${slug}/${slug}${i + 1}.jpg`}
//               alt={`${info.title} image ${i + 1}`}
//               width={200}
//               height={200}
//               className="w-[160px] h-[160px] object-cover rounded cursor-pointer mx-auto"
//               onClick={() => {
//                 setCurrentImage(i);
//                 setModalOpen(true);
//               }}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 z-50 flex justify-center items-center p-4"
//           onClick={() => setModalOpen(false)}
//         >
//           <div
//             className="relative bg-white rounded-lg shadow-lg p-4 max-w-xl w-full aspect-[4/3] flex items-center justify-center"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image
//               src={`/services/${slug}/${slug}${currentImage + 1}.jpg`}
//               alt="Expanded"
//               width={800}
//               height={600}
//               className="object-contain rounded max-h-full max-w-full"
//             />
//             {/* Arrows */}
//             <button
//               onClick={() => handleSwipe("left")}
//               className="absolute top-1/2 left-2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
//             >
//               <AiOutlineLeft size={24} />
//             </button>
//             <button
//               onClick={() => handleSwipe("right")}
//               className="absolute top-1/2 right-2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
//             >
//               <AiOutlineRight size={24} />
//             </button>
//             {/* Close */}
//             <button
//               onClick={() => setModalOpen(false)}
//               className="absolute top-2 right-2 text-white bg-black/40 hover:bg-black/60 rounded-full p-2"
//             >
//               <AiOutlineClose size={20} />
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };






"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight, AiOutlineClose } from "react-icons/ai";


// === [NEW] Add state for background interaction ===
import { useRef } from "react";

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
  const glowRef = useRef<HTMLDivElement>(null);
  const sparkleRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // === Animate Gradient Pulse and Cursor Glow ===
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      if (glowRef.current) {
        glowRef.current.style.background = `
          radial-gradient(circle at ${x}% ${y}%, rgba(174, 122, 255, 0.12), transparent 20%)
        `;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // === Sparkle Particle Animation ===
    const canvas = sparkleRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; alpha: number; size: number; dx: number; dy: number }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        alpha: Math.random(),
        size: Math.random() * 2 + 1,
        dx: Math.random() - 0.5,
        dy: Math.random() - 0.5,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      }

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="relative z-10">
      {/* === Sparkle Canvas (z-20) === */}
      <canvas
        ref={sparkleRef}
        className="fixed top-0 left-0 w-full h-full z-20 pointer-events-none"
      />

      {/* === Glow cursor-follow layer (z-30) === */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-full h-full z-30 pointer-events-none transition-all duration-300 ease-out"
      />

      {/* === Color pulse background (z-10 but behind content) === */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 animate-gradientPulse bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-30 blur-3xl" />

      {/* === Your Original Content === */}
      <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
        <div className="relative h-[80vh] w-full overflow-hidden mt-[-120px]">
          <Image
            src="/services/service-hero.png"
            alt="Service Hero Background"
            fill
            sizes="100vw"
            className="object-cover z-[-1]"
            priority
          />
          <div className="absolute inset-0 bg-black/60 z-10 flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-white text-4xl md:text-5xl font-bold italiana">Our Services</h1>
            <p className="mt-4 text-lg text-gray-200 max-w-2xl">
              Elevate your beauty experience with our range of luxurious and professional services at Stylz &apos;N&apos; Smylz Unisex Salon.
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto py-24 px-6 space-y-32 relative z-40">
          {services.map((service, idx) => (
            <ServiceBlock key={service} name={service} idx={idx} />
          ))}
        </section>
      </motion.div>
    </div>
  );
}


// === ServiceBlock remains completely unchanged ===
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
      <div className="md:w-1/2 space-y-4 text-gray-800">
        <h2 className="text-3xl font-bold">{info.title}</h2>
        <p className="text-lg font-semibold text-[#6E226A]">{info.description}</p>
        <p className="text-base">{info.details}</p>
      </div>

      <div className="md:w-1/2 rounded-xl shadow-lg border p-2">
        <div className="grid grid-cols-3 gap-3 h-[340px] overflow-y-auto pr-1">
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
