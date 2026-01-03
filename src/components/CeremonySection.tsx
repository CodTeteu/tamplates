import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import coupleImage from "@/assets/couple-7.jpg";

const CeremonySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cerimonia" className="wedding-section relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="wedding-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
            Informações
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-primary">
            Detalhes do Grande Dia
          </h2>
          <p className="font-body text-muted-foreground mt-4">
            Confirmação até 13/02/2026
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50"
          >
            <div className="aspect-video relative">
              <img
                src={coupleImage}
                alt="Cerimônia"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-heading text-lg">Horário</span>
                </div>
                <p className="font-script text-3xl">18:00</p>
              </div>
            </div>
            <div className="p-6">
              <p className="font-body text-muted-foreground">
                A cerimônia terá início às <strong className="text-primary">18:00</strong>.
              </p>
              <p className="font-body text-muted-foreground mt-2">
                Pedimos, por favor, que cheguem no horário para que nada se perca deste dia especial.
              </p>
            </div>
          </motion.div>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border/50"
          >
            <div className="aspect-video relative bg-accent/20 flex items-center justify-center">
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
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-heading text-lg">Local</span>
                </div>
                <p className="font-script text-3xl">Galeto Mamma Mia</p>
              </div>
            </div>
            <div className="p-6">
              <p className="font-body text-muted-foreground mb-4">
                Um local aconchegante para celebrar este momento especial.
              </p>
              <a
                href="https://maps.app.goo.gl/F9dTUnP1P6YEPWfA6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-body text-sm hover:bg-primary/90 transition-colors"
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
