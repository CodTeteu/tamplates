import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, MENU, VENUE, ASSETS } from "@/constants";

/**
 * Menu Section Component
 * Displays the wedding menu with buffet information and pricing
 */
const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Parallax for image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="cardapio" className="py-20 md:py-32 relative bg-[#fdfcf9]" ref={ref}>
      <BackgroundPattern opacity={100} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.3em] text-xs mb-4">
            {SECTION_TITLES.menu.subtitle}
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-2">
            {SECTION_TITLES.menu.title}
          </h2>
          <p className="font-heading text-lg text-muted-foreground">
            {VENUE.name}
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white/50 group">
              <motion.img
                src={ASSETS.venue.buffet}
                alt="Buffet Mamma Mia"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ y: imageY }}
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20 rounded-b-3xl">
                <p className="font-heading text-white/90 text-sm tracking-widest uppercase text-center">
                  {MENU.buffetName}
                </p>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full border border-primary/20 rounded-3xl" />
          </motion.div>

          {/* Menu Card Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between h-full relative"
          >
            {/* Paper Card Effect */}
            <div className="absolute inset-0 bg-[#fffbf2] rounded-3xl shadow-xl transform rotate-1 transition-transform duration-500 hover:rotate-0" />
            <div className="relative h-full bg-white/95 rounded-3xl shadow-sm border border-stone-100 p-8 md:p-12 overflow-hidden">

              {/* Inner Frame Decoration */}
              <div className="absolute inset-3 md:inset-4 border border-primary/20 rounded-2xl pointer-events-none" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-primary/20" />

              <div className="space-y-10 relative z-10">
                {/* Entrada */}
                <div className="text-center">
                  <h3 className="font-serif italic text-3xl md:text-4xl text-primary mb-4">Entrada</h3>
                  <div className="max-w-sm mx-auto">
                    <p className="font-body text-stone-600 leading-relaxed text-sm md:text-base">
                      {MENU.sections.entrada.join(" • ")}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-4">
                    <div className="h-[1px] w-12 bg-primary/30" />
                    <span className="font-heading text-primary font-medium uppercase tracking-widest text-xs">Destaque</span>
                    <div className="h-[1px] w-12 bg-primary/30" />
                  </div>

                  <div className="mt-3">
                    <p className="font-serif text-xl md:text-2xl text-primary/90">
                      ✦ {MENU.mainDish} ✦
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex justify-center opacity-30">
                  <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                {/* Massas & Molhos */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 text-center">
                  <div>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-primary mb-3">Massas</h3>
                    <p className="font-body text-stone-600 leading-relaxed text-sm">
                      {MENU.sections.massas.join(" • ")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-primary mb-3">Molhos</h3>
                    <p className="font-body text-stone-600 leading-relaxed text-sm">
                      {MENU.sections.molhos.join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="flex justify-center opacity-30">
                  <div className="w-2/3 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
                </div>

                {/* Sobremesas e Bebidas */}
                <div className="space-y-6 text-center">
                  <div>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-primary mb-2">Sobremesas</h3>
                    <p className="font-body text-stone-600 leading-relaxed text-sm">
                      {MENU.sections.sobremesas.join(" • ")}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-serif italic text-xl md:text-2xl text-primary mb-2">Bebidas</h3>
                    <p className="font-body text-stone-600 leading-relaxed text-sm">
                      {MENU.sections.bebidas.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Tag */}
              <div className="mt-10 pt-8 border-t border-primary/10 relative z-10">
                <div className="flex justify-center gap-8 md:gap-12">
                  <div className="text-center group">
                    <span className="block font-script text-3xl md:text-4xl text-primary mb-1 transition-transform duration-300 group-hover:scale-110">
                      R$ {MENU.pricing.adult}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500">
                      Por Pessoa
                    </span>
                  </div>
                  <div className="w-[1px] bg-primary/20" />
                  <div className="text-center group">
                    <span className="block font-script text-3xl md:text-4xl text-primary mb-1 transition-transform duration-300 group-hover:scale-110">
                      R$ {MENU.pricing.child}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500">
                      Crianças ({MENU.pricing.childAgeRange})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
