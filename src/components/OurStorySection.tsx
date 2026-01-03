import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import coupleImage from "@/assets/couple-3.jpg";

const OurStorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="nossa-historia" className="wedding-section bg-background" ref={ref}>
      <div className="wedding-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={coupleImage}
                alt="Eduardo e Nicole"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Nossa História
            </p>
            <h2 className="font-script text-4xl md:text-5xl text-primary mb-6">
              Eduardo & Nicole
            </h2>
            
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-lg">
              Nos encontramos no tempo certo e, quando demos o primeiro passo, entendemos que Deus já estava escrevendo nossa história. Do pedido de namoro ao pedido de casamento, tudo aconteceu com propósito e confirmação.
            </p>
            
            <p className="font-body text-muted-foreground leading-relaxed mb-10 text-lg">
              Jesus tem sido o nosso alicerce, abrindo portas e guiando cada decisão. É com alegria e gratidão que convidamos você para celebrar conosco esse grande dia, onde uniremos nossas vidas diante de Deus.
            </p>

            <div className="border-l-4 border-secondary pl-6 py-2">
              <p className="font-heading text-xl italic text-foreground mb-2">
                "O Senhor fez isto, e é maravilhoso aos nossos olhos."
              </p>
              <p className="font-body text-sm text-accent uppercase tracking-wider">
                — Salmos 118:23
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurStorySection;
