import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Clock, MapPin, ExternalLink, Calendar, Shirt, Car, Camera, Gift, CheckCircle, X, Navigation } from "lucide-react";
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
      return <Camera className="w-6 h-6" />;
    case "clock":
      return <Clock className="w-6 h-6" />;
    case "shirt":
      return <Shirt className="w-6 h-6" />;
    case "car":
      return <Car className="w-6 h-6" />;
    case "gift":
      return <Gift className="w-6 h-6" />;
    case "check":
      return <CheckCircle className="w-6 h-6" />;
    default:
      return <Clock className="w-6 h-6" />;
  }
};

/**
 * Ceremony Section Component
 * Displays wedding ceremony details, location, and guest manual
 */
const CeremonySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showGpsModal, setShowGpsModal] = useState(false);

  return (
    <>
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
                <button
                  onClick={() => setShowGpsModal(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-3 rounded-full font-body text-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <Navigation className="w-4 h-4" />
                  Abrir no GPS
                </button>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-y-16 gap-x-8 mt-24">
            {GUEST_MANUAL.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform duration-500">
                  {getIcon(item.icon)}
                </div>

                <h4 className="font-heading text-xl text-foreground mb-3 tracking-wide">{item.title}</h4>

                <p className="font-body text-sm text-muted-foreground leading-relaxed px-4 mb-6">
                  {item.description}
                </p>

                {/* Decorative separator line */}
                <div className="w-12 h-[2px] bg-border opacity-50 group-hover:bg-primary/30 transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GPS Navigation Modal */}
      <AnimatePresence>
        {showGpsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowGpsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-3xl shadow-2xl max-w-sm w-full p-8 relative"
            >
              <button
                onClick={() => setShowGpsModal(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-2">Escolha o App</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Como deseja navegar até {VENUE.name}?
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href={VENUE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground px-6 py-4 rounded-2xl font-body text-base hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Google Maps
                </a>

                <a
                  href={VENUE.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-[#33CCFF] text-white px-6 py-4 rounded-2xl font-body text-base hover:shadow-xl hover:bg-[#2bb8e8] transition-all duration-300"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.54 6.63c-.36-2.22-1.89-4-4.07-4.58C14.34 1.55 12.19 2 10.41 3.1 6.24 5.63 4.62 10.6 6.07 15.21c.24.76.56 1.48.94 2.15-.28.69-.78 1.66-1.65 2.61-.27.3-.08.78.33.81 1.49.1 3.62-.5 5.38-1.76.41.08.83.15 1.26.19 4.76.46 9.02-2.69 9.72-7.41.2-1.4.04-2.81-.51-4.17zM9.5 11c-.83 0-1.5-.67-1.5-1.5S8.67 8 9.5 8s1.5.67 1.5 1.5S10.33 11 9.5 11zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 8 14.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                  Waze
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CeremonySection;
