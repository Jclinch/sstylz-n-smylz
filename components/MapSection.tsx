"use client";

const MapSection = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-8 relative z-10">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold italiana text-gray-900">
          Visit Us
        </h2>
        <p className="mt-3 text-gray-600">
          We’re located inside the Ikota Shopping Complex along Lekki-Ajah Expressway, Lagos.
        </p>
      </div>

      <div className="rounded-xl overflow-hidden shadow-lg max-w-6xl mx-auto aspect-video">
        <iframe
          title="Ikota Shopping Complex Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1984.2022350520234!2d3.531491716132394!3d6.452367100765181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf6b13f7ed0b9%3A0xf6016a6e870c2114!2sIkota%20Shopping%20Complex!5e0!3m2!1sen!2sng!4v1717506954115!5m2!1sen!2sng"
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
