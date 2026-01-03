import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Utensils, Wine, IceCream, Soup, Users } from "lucide-react";

const menuCategories = [
  {
    icon: Soup,
    title: "Entrada",
    items: [
      "Polenta frita",
      "Polpette",
      "Sopa de capeletti",
      "Salada de radicci",
      "Salada de maionese",
      "Salada mista",
      "GALETO ASSADO NA BRASA"
    ]
  },
  {
    icon: Utensils,
    title: "Massas",
    items: [
      "Espaguete",
      "Penne",
      "Nhoque",
      "Talharim",
      "Tortéi"
    ]
  },
  {
    icon: Utensils,
    title: "Molhos",
    items: [
      "Molho da Mamma",
      "Quatro queijos",
      "Sugo",
      "Do Neni",
      "Tomate seco",
      "Pesto",
      "Alho e óleo"
    ]
  },
  {
    icon: IceCream,
    title: "Sobremesas",
    items: [
      "Sagu",
      "Pudim de leite",
      "Ambrosia",
      "Doce de abóbora",
      "Sorvete com calda de chocolate"
    ]
  },
  {
    icon: Wine,
    title: "Bebidas",
    items: [
      "Água com gás",
      "Água sem gás",
      "Refrigerantes"
    ]
  }
];

const MenuSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cardapio" className="wedding-section bg-foreground/5" ref={ref}>
      <div className="wedding-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
            Gastronomia
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-primary mb-4">
            Cardápio
          </h2>
          <p className="font-heading text-xl text-foreground">
            Galeto Mamma Mia
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {menuCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card rounded-xl p-6 shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-xl text-foreground">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className={`font-body text-muted-foreground ${
                      item === "GALETO ASSADO NA BRASA" ? "font-semibold text-primary mt-3" : ""
                    }`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground"
        >
          <Users className="w-12 h-12 mx-auto mb-4 opacity-80" />
          <h3 className="font-heading text-2xl mb-6">Valores</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-primary-foreground/10 rounded-xl p-6">
              <p className="font-script text-3xl mb-2">R$ 108,00</p>
              <p className="font-body text-sm opacity-80">Adultos</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-6">
              <p className="font-script text-3xl mb-2">R$ 54,00</p>
              <p className="font-body text-sm opacity-80">5 a 10 anos</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-6">
              <p className="font-script text-3xl mb-2">Isento</p>
              <p className="font-body text-sm opacity-80">0 a 5 anos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuSection;
