import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import couple1 from "@/assets/couple-1.jpg";
import couple2 from "@/assets/couple-2.jpg";
import couple3 from "@/assets/couple-3.jpg";
import couple4 from "@/assets/couple-4.jpg";
import couple5 from "@/assets/couple-5.jpg";
import couple7 from "@/assets/couple-7.jpg";
import couple8 from "@/assets/couple-8.jpg";
import couple9 from "@/assets/couple-9.jpg";
import couple10 from "@/assets/couple-10.jpg";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES } from "@/constants";
import type { GalleryImage } from "@/types";

const AUTO_SCROLL_INTERVAL = 4000;

const images: GalleryImage[] = [
  { src: couple1, alt: "Eduardo e Nicole na praia" },
  { src: couple2, alt: "Eduardo e Nicole juntos" },
  { src: couple3, alt: "Eduardo e Nicole sorrindo" },
  { src: couple4, alt: "Eduardo e Nicole felizes" },
  { src: couple5, alt: "Eduardo e Nicole se beijando" },
  { src: couple7, alt: "Eduardo e Nicole românticos" },
  { src: couple8, alt: "Eduardo e Nicole abraçados" },
  { src: couple9, alt: "Eduardo e Nicole ao pôr do sol" },
  { src: couple10, alt: "Eduardo e Nicole apaixonados" },
];

/**
 * Gallery Section Component
 * Displays a carousel of couple photos with auto-scroll
 */
const GallerySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-100px" });
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsInView(true);
    }
  }, [inView]);
  const [api, setApi] = useState<CarouselApi>();

  const scrollToNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(scrollToNext, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [api, scrollToNext]);

  return (
    <section className="py-20 md:py-32 bg-[#fdfcf9] overflow-hidden relative" ref={ref}>
      <BackgroundPattern opacity={100} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSectionHeader
          isInView={isInView}
          subtitle={SECTION_TITLES.gallery.subtitle}
          title={SECTION_TITLES.gallery.title}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {images.map((image, index) => (
                <CarouselItem
                  key={`gallery-image-${index}`}
                  className="pl-2 md:pl-4 basis-[85%] md:basis-1/2 lg:basis-1/3"
                >
                  <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                    <div className="aspect-[3/4]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {images.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => api?.scrollTo(index)}
                className="w-2 h-2 rounded-full bg-primary/30 hover:bg-primary/60 transition-colors duration-300"
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
