import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { useRef } from "react";
import useCountdown from "@/hooks/useCountdown";
import { WEDDING, VENUE, COUPLE, ASSETS } from "@/constants";

/**
 * Hero Section Component
 * Refactored to match "Reference Project" layout for mobile stability.
 * Uses parallax scroll effect for immersive experience.
 */
const HeroSection = () => {
  const timeLeft = useCountdown(WEDDING.date);
  const ref = useRef(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Background moves slower (parallax factor 0.5 = 50% speed)
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // Content fades out as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  // Scale effect on background
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
    <section id="inicio" ref={ref} className="relative h-screen min-h-[600px] flex items-center justify-center text-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-[center_top] md:bg-[center_45%]"
        style={{
          backgroundImage: `url(${ASSETS.backgrounds.hero})`,
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
      </motion.div>

      <motion.div
        className="relative z-10 px-4 w-full max-w-5xl mx-auto flex flex-col items-center justify-between h-full pt-20 pb-12 md:py-20"
        style={{ opacity: contentOpacity }}
      >

        {/* --- TOP SECTION --- */}
        <div className="flex flex-col items-center mt-4 md:mt-0 w-full">
          {/* Label Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border border-[#fffaef]/30 bg-black/20 backdrop-blur-sm px-6 py-1.5 rounded-full mb-6 md:mb-8"
          >
            <span className="font-heading text-[#fffaef] text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Save the Date
            </span>
          </motion.div>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-script text-6xl md:text-8xl lg:text-9xl text-[#fffaef] drop-shadow-2xl mb-6 md:mb-8 text-center leading-none"
            style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
          >
            {COUPLE.groom}
            <span className="block text-2xl md:text-4xl my-2 font-heading tracking-widest uppercase opacity-80">&</span>
            {COUPLE.bride}
          </motion.h1>


        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col items-center w-full max-w-md mx-auto mb-6 md:mb-0">

          {/* Countdown (Wider) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-4 gap-3 w-full max-w-[340px] md:max-w-md mb-8"
          >
            {countdownItems.map((item) => (
              <div
                key={item.label}
                className="bg-black/20 backdrop-blur-md border border-[#fffaef]/10 rounded-xl py-3 flex flex-col items-center justify-center transform hover:scale-105 transition-transform"
              >
                <span className="font-heading text-xl md:text-4xl font-light text-[#fffaef] tracking-wide leading-none mb-0.5">
                  {String(item.value).padStart(2, "0")}
                </span>
                <span className="font-body text-[8px] md:text-[10px] uppercase tracking-widest text-[#fffaef]/70">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToConfirmation}
            className="group w-auto relative overflow-hidden bg-black/20 backdrop-blur-md border border-[#fffaef]/30 text-[#fffaef] py-3.5 px-10 rounded-full font-heading text-xs md:text-base tracking-[0.2em] uppercase hover:border-[#fffaef]/60 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
          >
            <span className="relative z-10 font-bold whitespace-nowrap">Confirmar Presença</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </motion.button>
        </div>
      </motion.div>

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
