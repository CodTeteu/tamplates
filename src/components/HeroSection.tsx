import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import coupleImage from "@/assets/couple-6.jpg";

const HeroSection = () => {
  const weddingDate = new Date("2026-02-28T18:00:00");
  
  const calculateTimeLeft = () => {
    const difference = +weddingDate - +new Date();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const scrollToConfirmation = () => {
    document.getElementById("confirmacao")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={coupleImage}
          alt="Eduardo e Nicole"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      </div>

      {/* Names at top */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-start pt-24 md:pt-32 px-4">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-[#fffaef]/90 text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
        >
          Casamento
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-[#fffaef] drop-shadow-2xl"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.5)" }}
        >
          Eduardo & Nicole
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "120px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-[#fffaef]/60 to-transparent mt-6"
        />
      </div>

      {/* Bottom Content - Countdown and Button */}
      <div className="relative z-10 pb-8 md:pb-12 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-8 text-[#fffaef]/90 mb-8"
        >
          <div className="flex items-center gap-2 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            <Calendar className="w-4 h-4" />
            <span className="font-heading text-sm md:text-base tracking-wide">28 de Fevereiro de 2026</span>
          </div>
          <div className="flex items-center gap-2 backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4" />
            <span className="font-heading text-sm md:text-base tracking-wide">Galeto Mamma Mia</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto mb-8"
        >
          {[
            { value: timeLeft.days, label: "Dias" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Seg" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black/40 backdrop-blur-md border border-[#fffaef]/20 rounded-xl py-3 md:py-4 px-2"
            >
              <span className="block font-heading text-2xl md:text-3xl font-light text-[#fffaef] tracking-wide">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-body text-[10px] md:text-xs uppercase tracking-widest text-[#fffaef]/70">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={scrollToConfirmation}
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-10 py-4 rounded-full font-heading text-base tracking-wide hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 mx-auto block"
        >
          <span className="relative z-10">Confirmar Presença</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-6"
        >
          <ChevronDown className="w-6 h-6 text-[#fffaef]/50 animate-bounce mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
