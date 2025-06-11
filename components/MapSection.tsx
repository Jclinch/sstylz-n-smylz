"use client";

const MapSection = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold italiana text-gray-900">
          Visit Us
        </h2>
        <p className="mt-3 text-gray-600">
          We&apos;re located inside the megamound shopping complex ikota, along
          Lekki-Ajah Expressway, Lagos.{" "}
        </p>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg max-w-6xl mx-auto aspect-video">
        <iframe
          title="Megamound Shopping Complex Ikota Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126871.49860962444!2d3.397929584049247!3d6.4281672230362545!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf7cf8ff52543%3A0x7202583d542f71c4!2sMegamound%20Shopping%20Mall!5e0!3m2!1sen!2sng!4v1749539157790!5m2!1sen!2sng"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
