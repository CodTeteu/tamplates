import { Helmet } from "react-helmet-async";
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
      
      <main className="overflow-hidden">
        <Navigation />
        <HeroSection />
        <OurStorySection />
        <GallerySection />
        <CeremonySection />
        <MenuSection />
        <GiftsSection />
        <RSVPSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
