import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import coupleImage from "@/assets/couple-7.jpg";
import useCountdown from "@/hooks/useCountdown";
import { WEDDING, VENUE, COUPLE } from "@/constants";

/**
 * Hero Section Component
 * Refactored to match "Reference Project" layout for mobile stability.
 * Uses h-screen and CSS background instead of JS parallax.
 */
const HeroSection = () => {
  const timeLeft = useCountdown(WEDDING.date);

  const scrollToConfirmation = () => {
    document.getElementById("confirmacao")?.scrollIntoView({ behavior: "smooth" });
  };

  const countdownItems = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <section id="inicio" className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image - Fixed on Desktop, Scroll on Mobile for performance/compatibility */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: `url(${coupleImage})`
        }}
      >
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 px-4 w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full pt-16 md:pt-0">

        {/* Names at top area */}
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-[#fffaef]/90 text-xs md:text-sm uppercase tracking-[0.4em] mb-4 md:mb-6"
        >
          Casamento
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-[#fffaef] drop-shadow-2xl mb-6 md:mb-10"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          {COUPLE.displayName}
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#fffaef]/60 to-transparent mb-8 md:mb-12"
        />

        {/* Date & Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center gap-4 text-[#fffaef]/90 mb-8"
        >
          <div className="flex items-center gap-2 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/30 transition-colors">
            <Calendar className="w-4 h-4" />
            <span className="font-heading text-sm md:text-base tracking-wide">
              {WEDDING.dateFormatted}
            </span>
          </div>
          <div className="flex items-center gap-2 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full border border-white/10 hover:bg-black/30 transition-colors">
            <MapPin className="w-4 h-4" />
            <span className="font-heading text-sm md:text-base tracking-wide">
              {VENUE.name}
            </span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-4 gap-3 max-w-[320px] md:max-w-md w-full mb-10"
        >
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="bg-black/20 backdrop-blur-md border border-[#fffaef]/10 rounded-lg py-3 px-1 flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
            >
              <span className="font-heading text-xl md:text-3xl font-light text-[#fffaef] tracking-wide leading-none mb-1">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-body text-[9px] md:text-xs uppercase tracking-widest text-[#fffaef]/70">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={scrollToConfirmation}
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-4 rounded-full font-heading text-base tracking-wide hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500"
        >
          <span className="relative z-10">Confirmar Presença</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#fffaef]/50 animate-bounce cursor-pointer"
        onClick={scrollToConfirmation}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
