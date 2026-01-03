import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, MapPin, ExternalLink, Calendar } from "lucide-react";
import coupleImage from "@/assets/couple-6.jpg";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, WEDDING, VENUE, GUEST_MANUAL } from "@/constants";

/**
 * Camera Icon Component
 */
const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

/**
 * Sparkle Icon Component
 */
const SparkleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

/**
 * Get icon component by type
 */
const getIcon = (iconType: string) => {
  switch (iconType) {
    case "camera":
      return <CameraIcon />;
    case "clock":
      return <Clock className="w-6 h-6" />;
    case "sparkle":
      return <SparkleIcon />;
    default:
      return null;
  }
};

/**
 * Ceremony Section Component
 * Displays wedding ceremony details, location, and guest manual
 */
const CeremonySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="cerimonia" className="py-24 md:py-36 bg-background relative overflow-hidden" ref={ref}>
      <BackgroundPattern opacity={30} />

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSectionHeader
          isInView={isInView}
          subtitle={SECTION_TITLES.ceremony.subtitle}
          title={SECTION_TITLES.ceremony.title}
          badge={{
            icon: <Calendar className="w-4 h-4" />,
            text: `Confirmação até ${WEDDING.confirmationDeadline}`,
          }}
        />

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
                <p className="font-script text-4xl">{WEDDING.time}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="font-body text-muted-foreground leading-relaxed">
                A cerimônia terá início às <strong className="text-primary">{WEDDING.time}</strong>. Pedimos que cheguem com antecedência para que nada deste momento especial se perca.
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
                src={VENUE.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
                title="Localização do evento"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-background pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 opacity-80" />
                  <span className="font-heading text-sm tracking-widest uppercase opacity-80">Local</span>
                </div>
                <p className="font-script text-4xl">{VENUE.name}</p>
              </div>
            </div>
            <div className="p-8">
              <p className="font-body text-muted-foreground mb-6 leading-relaxed">
                Um local aconchegante e especial para celebrar este dia único.
              </p>
              <a
                href={VENUE.mapsUrl}
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

        {/* Guest Manual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 lg:mt-32 max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="font-script text-3xl md:text-4xl text-primary mb-4">Manual do Convidado</h3>
            <p className="font-body text-muted-foreground">Dicas para aproveitarmos juntos este momento inesquecível</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {GUEST_MANUAL.map((item) => (
              <div
                key={item.id}
                className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-primary/10 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {getIcon(item.icon)}
                </div>
                <h4 className="font-heading text-lg text-primary mb-2">{item.title}</h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CeremonySection;
