import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, ExternalLink, Calendar } from "lucide-react";
import coupleImage from "@/assets/couple-7.jpg";

const CeremonySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cerimonia" className="py-24 md:py-36 bg-foreground/5 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.3em] text-xs mb-4">
            Informações
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary">
            Detalhes do Grande Dia
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
          <div className="inline-flex items-center gap-2 mt-6 bg-primary/10 text-primary px-5 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <p className="font-body text-sm">Confirmação até 13/02/2026</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background rounded-3xl shadow-xl overflow-hidden border border-border/30"
          >
            <div className="aspect-[16/10] relative">
              <img
                src={coupleImage}
                alt="Cerimônia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 opacity-80" />
                  <span className="font-heading text-sm tracking-widest uppercase opacity-80">Horário</span>
                </div>
                <p className="font-script text-4xl">18:00</p>
              </div>
            </div>
            <div className="p-8">
              <p className="font-body text-muted-foreground leading-relaxed">
                A cerimônia terá início às <strong className="text-primary">18:00</strong>. Pedimos que cheguem com antecedência para que nada deste momento especial se perca.
              </p>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-background rounded-3xl shadow-xl overflow-hidden border border-border/30"
          >
            <div className="aspect-[16/10] relative bg-accent/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.8!2d-51.1!3d-29.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzAwLjAiUyA1McKwMDYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-background pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 opacity-80" />
                  <span className="font-heading text-sm tracking-widest uppercase opacity-80">Local</span>
                </div>
                <p className="font-script text-4xl">Galeto Mamma Mia</p>
              </div>
            </div>
            <div className="p-8">
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Um local aconchegante e especial para celebrar este dia único.
              </p>
              <a
                href="https://maps.app.goo.gl/F9dTUnP1P6YEPWfA6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3 rounded-full font-body text-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              >
                <ExternalLink className="w-4 h-4" />
                Abrir no GPS
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CeremonySection;
