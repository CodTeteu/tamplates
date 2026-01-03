import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import couple2 from "@/assets/couple-2.jpg";

const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cardapio" className="py-20 md:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.3em] text-xs mb-4">
            Gastronomia
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary mb-2">
            Cardápio
          </h2>
          <p className="font-heading text-lg text-muted-foreground">
            Galeto Mamma Mia
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={couple2}
                alt="Cardápio do evento"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Menu Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col justify-between"
          >
            <div className="space-y-8">
              {/* Entrada */}
              <div className="border-b border-border/30 pb-6">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Entrada</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Polenta frita • Polpette • Sopa de capeletti • Salada de radicci • Salada de maionese • Salada mista
                </p>
                <p className="font-heading text-primary mt-3 text-lg tracking-wide">
                  ✦ Galeto Assado na Brasa ✦
                </p>
              </div>

              {/* Massas */}
              <div className="border-b border-border/30 pb-6">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Massas</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Espaguete • Penne • Nhoque • Talharim • Tortéi
                </p>
              </div>

              {/* Molhos */}
              <div className="border-b border-border/30 pb-6">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Molhos</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Molho da Mamma • Quatro queijos • Sugo • Do Neni • Tomate seco • Pesto • Alho e óleo
                </p>
              </div>

              {/* Sobremesas */}
              <div className="border-b border-border/30 pb-6">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Sobremesas</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Sagu • Pudim de leite • Ambrosia • Doce de abóbora • Sorvete com calda de chocolate
                </p>
              </div>

              {/* Bebidas */}
              <div className="pb-6">
                <h3 className="font-heading text-xl text-primary mb-3 tracking-wide">Bebidas</h3>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Água com gás • Água sem gás • Refrigerantes
                </p>
              </div>
            </div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-primary-foreground"
            >
              <h3 className="font-heading text-lg mb-6 text-center tracking-widest uppercase opacity-90">
                Valores
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/10 rounded-xl py-4 px-2 backdrop-blur-sm">
                  <p className="font-script text-2xl md:text-3xl mb-1">R$ 108</p>
                  <p className="font-body text-xs uppercase tracking-wider opacity-80">Adultos</p>
                </div>
                <div className="bg-white/10 rounded-xl py-4 px-2 backdrop-blur-sm">
                  <p className="font-script text-2xl md:text-3xl mb-1">R$ 54</p>
                  <p className="font-body text-xs uppercase tracking-wider opacity-80">5 a 10 anos</p>
                </div>
                <div className="bg-white/10 rounded-xl py-4 px-2 backdrop-blur-sm">
                  <p className="font-script text-2xl md:text-3xl mb-1">Isento</p>
                  <p className="font-body text-xs uppercase tracking-wider opacity-80">0 a 5 anos</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
