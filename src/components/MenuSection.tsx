import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import mammaMiaBuffet from "@/assets/mamma-mia-buffet.png";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, MENU, VENUE } from "@/constants";

/**
 * Menu Section Component
 * Displays the wedding menu with buffet information and pricing
 */
const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white/50 group">
              <img
                src={mammaMiaBuffet}
                alt="Buffet Mamma Mia"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
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
            className="flex flex-col justify-between h-full bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-lg border border-primary/10"
          >
            <div className="space-y-8">
              {/* Entrada */}
              <div className="border-b border-primary/10 pb-6 text-center">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Entrada</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  {MENU.sections.entrada.join(" • ")}
                </p>
                <div className="inline-block mt-4 px-4 py-1 border border-primary/20 rounded-full">
                  <p className="font-heading text-primary text-sm tracking-wide">
                    ✦ {MENU.mainDish} ✦
                  </p>
                </div>
              </div>

              {/* Massas & Molhos Combined for alignment */}
              <div className="grid md:grid-cols-2 gap-8 border-b border-primary/10 pb-6">
                <div className="text-center">
                  <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Massas</h3>
                  <p className="font-body text-muted-foreground leading-relaxed text-sm">
                    {MENU.sections.massas.join(" • ")}
                  </p>
                </div>
                <div className="text-center">
                  <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Molhos</h3>
                  <p className="font-body text-muted-foreground leading-relaxed text-sm">
                    {MENU.sections.molhos.join(" • ")}
                  </p>
                </div>
              </div>

              {/* Sobremesas & Bebidas */}
              <div className="space-y-6 text-center">
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2 tracking-wide">Sobremesas</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {MENU.sections.sobremesas.join(" • ")}
                  </p>
                </div>
                <div>
                  <h3 className="font-heading text-xl text-primary mb-2 tracking-wide">Bebidas</h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {MENU.sections.bebidas.join(" • ")}
                  </p>
                </div>
              </div>
            </div>

            {/* Pricing Tag */}
            <div className="mt-8 pt-6 border-t border-primary/10 flex justify-center gap-6">
              <div className="text-center">
                <span className="block font-script text-2xl text-primary">
                  R$ {MENU.pricing.adult}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Adultos
                </span>
              </div>
              <div className="w-[1px] h-10 bg-primary/20" />
              <div className="text-center">
                <span className="block font-script text-2xl text-primary">
                  R$ {MENU.pricing.child}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Crianças ({MENU.pricing.childAgeRange})
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
