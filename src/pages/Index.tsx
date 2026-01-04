import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import OurStorySection from "@/components/OurStorySection";
import CeremonySection from "@/components/CeremonySection";
import MenuSection from "@/components/MenuSection";
import GiftsSection from "@/components/GiftsSection";
import GallerySection from "@/components/GallerySection";
import RSVPSection from "@/components/RSVPSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const rsvpSection = document.getElementById('confirmacao');
      if (rsvpSection) {
        const rsvpTop = rsvpSection.getBoundingClientRect().top;
        const isPastHero = window.scrollY > 400;
        const isBeforeRsvp = rsvpTop > window.innerHeight - 100;
        setShowFloatingCta(isPastHero && isBeforeRsvp);
      } else {
        setShowFloatingCta(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRsvp = () => {
    const element = document.getElementById('confirmacao');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Eduardo & Nicole - Casamento | 28 de Fevereiro de 2026</title>
        <meta
          name="description"
          content="Estamos muito felizes em convidá-lo para celebrar conosco o nosso casamento. 28 de Fevereiro de 2026 no Galeto Mamma Mia."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navigation />
      <main className="overflow-hidden">
        <HeroSection />
        <OurStorySection />
        <GallerySection />
        <CeremonySection />
        <MenuSection />
        <GiftsSection />
        <RSVPSection />
        <Footer />
      </main>

      {/* Mobile Floating CTA */}
      <div
        className={`mobile-floating-cta fixed bottom-6 left-4 right-4 z-40 md:hidden transition-all duration-500 transform ${showFloatingCta ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
          }`}
      >
        <button
          onClick={scrollToRsvp}
          className="w-full bg-primary text-primary-foreground py-4 rounded-full shadow-2xl flex items-center justify-center gap-3 font-medium uppercase tracking-widest text-xs border border-primary-foreground/20 backdrop-blur-sm hover:shadow-primary/30 transition-shadow"
        >
          <span>Confirmar Presença</span>
          <div className="bg-primary-foreground/20 p-1 rounded-full">
            <Heart className="w-3 h-3 fill-current" />
          </div>
        </button>
      </div>
    </>
  );
};

export default Index;

