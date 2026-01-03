import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import coupleImage from "@/assets/couple-3.jpg";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { COUPLE, SECTION_TITLES, BIBLE_VERSE } from "@/constants";

/**
 * Our Story Section Component
 * Displays the couple's story and journey together
 */
const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="nossa-historia"
      className="py-24 md:py-36 bg-background relative overflow-hidden"
      ref={ref}
    >
      <BackgroundPattern opacity={30} />

      {/* Decorative elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSectionHeader
          isInView={isInView}
          subtitle={SECTION_TITLES.ourStory.subtitle}
          title={SECTION_TITLES.ourStory.title}
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={coupleImage}
                alt={COUPLE.displayName}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary/20 rounded-3xl" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left"
          >
            <h3 className="font-script text-3xl md:text-4xl text-primary mb-8">
              {COUPLE.displayName}
            </h3>

            <p className="font-body text-muted-foreground leading-loose mb-6 text-lg">
              Nos encontramos no tempo certo e, quando demos o primeiro passo, entendemos que Deus já estava escrevendo nossa história. Do pedido de namoro ao pedido de casamento, tudo aconteceu com propósito e confirmação.
            </p>

            <p className="font-body text-muted-foreground leading-loose mb-10 text-lg">
              Jesus tem sido o nosso alicerce, abrindo portas e guiando cada decisão. É com alegria e gratidão que convidamos você para celebrar conosco esse grande dia, onde uniremos nossas vidas diante de Deus.
            </p>

            <div className="relative pl-8 py-4 border-l-2 border-primary/30">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-primary/20 rounded-full" />
              <p className="font-heading text-xl italic text-foreground mb-3 leading-relaxed">
                "{BIBLE_VERSE.text}"
              </p>
              <p className="font-body text-sm text-accent uppercase tracking-widest">
                {BIBLE_VERSE.reference}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
