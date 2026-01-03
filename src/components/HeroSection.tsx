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
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={coupleImage}
          alt="Eduardo e Nicole"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-heading text-[#fffaef] text-sm md:text-base uppercase tracking-[0.3em] mb-6 border border-[#fffaef]/50 inline-block px-6 py-2 rounded-full backdrop-blur-sm bg-black/20"
        >
          Save The Date
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-script text-5xl md:text-7xl lg:text-8xl text-[#fffaef] mb-8 drop-shadow-lg"
          style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.5)" }}
        >
          Eduardo & Nicole
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-[#fffaef] mb-10"
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <span className="font-heading text-lg" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>28 de Fevereiro de 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span className="font-heading text-lg" style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}>Galeto Mamma Mia</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-4 gap-3 md:gap-6 max-w-lg mx-auto mb-10"
        >
          {[
            { value: timeLeft.days, label: "Dias" },
            { value: timeLeft.hours, label: "Horas" },
            { value: timeLeft.minutes, label: "Min" },
            { value: timeLeft.seconds, label: "Seg" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-md border border-[#fffaef]/30 rounded-lg py-4 px-2"
            >
              <span className="block font-heading text-3xl md:text-4xl font-light text-[#fffaef]">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="font-body text-xs uppercase tracking-wider text-[#fffaef]/80">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          onClick={scrollToConfirmation}
          className="bg-[#992704] text-[#fffaef] border border-[#fffaef]/30 px-8 py-3 rounded-full font-heading text-lg hover:bg-[#992704]/90 transition-all duration-300 mb-16"
        >
          Confirmar Presença →
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-8"
        >
          <ChevronDown className="w-8 h-8 text-[#fffaef]/70 animate-bounce mx-auto" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
