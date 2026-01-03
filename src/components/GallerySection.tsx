import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple5 from "@/assets/couple-5.jpg";
import couple8 from "@/assets/couple-8.jpg";
import couple9 from "@/assets/couple-9.jpg";
import couple10 from "@/assets/couple-10.jpg";

const images = [
  { src: couple1, alt: "Eduardo e Nicole na praia" },
  { src: couple2, alt: "Eduardo e Nicole juntos" },
  { src: couple5, alt: "Eduardo e Nicole se beijando" },
  { src: couple8, alt: "Eduardo e Nicole abraçados" },
  { src: couple9, alt: "Eduardo e Nicole ao pôr do sol" },
  { src: couple10, alt: "Eduardo e Nicole apaixonados" },
];

const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="wedding-section bg-background" ref={ref}>
      <div className="wedding-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
            Momentos
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">
            Nossa Galeria
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl shadow-lg ${
                index === 0 || index === 5 ? "row-span-2" : ""
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
