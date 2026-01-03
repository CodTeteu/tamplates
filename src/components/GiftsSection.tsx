import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Gift, Copy, Check, Smartphone, Building2 } from "lucide-react";
import giftsImage from "@/assets/gifts.jpg";
import { toast } from "@/hooks/use-toast";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, PIX } from "@/constants";

const COPY_TIMEOUT = 3000;

/**
 * Gifts Section Component
 * Displays gift registry information with PIX payment details
 */
const GiftsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PIX.key);
    setCopied(true);
    toast({
      title: "Chave Pix copiada!",
      description: "A chave foi copiada para sua área de transferência.",
    });
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  };

  return (
    <section id="presentes" className="py-20 md:py-32 bg-background relative" ref={ref}>
      <BackgroundPattern opacity={30} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <AnimatedSectionHeader
          isInView={isInView}
          subtitle={SECTION_TITLES.gifts.subtitle}
          title={SECTION_TITLES.gifts.title}
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="font-body text-muted-foreground leading-relaxed mb-6 text-lg">
              Nossa maior alegria é ter você conosco. Para quem desejar nos presentear, esta lista foi preparada com carinho para nos acompanhar no início dessa nova etapa.
            </p>

            <p className="font-heading text-primary text-xl mb-10 italic">
              "O que realmente importa é a sua presença."
            </p>

            {/* Pix Card */}
            <div className="bg-background rounded-3xl p-8 border border-border/30 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl text-foreground tracking-wide">
                  Presentear com Pix
                </h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground p-3 bg-foreground/5 rounded-xl">
                  <Smartphone className="w-5 h-5 text-primary/70" />
                  <div>
                    <span className="font-body text-sm text-muted-foreground">
                      Chave ({PIX.keyType})
                    </span>
                    <p className="font-heading text-foreground">{PIX.key}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground p-3 bg-foreground/5 rounded-xl">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <span className="text-primary/70 font-bold text-sm">N</span>
                  </div>
                  <div>
                    <span className="font-body text-sm text-muted-foreground">Nome</span>
                    <p className="font-heading text-foreground">{PIX.recipientName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-muted-foreground p-3 bg-foreground/5 rounded-xl">
                  <Building2 className="w-5 h-5 text-primary/70" />
                  <div>
                    <span className="font-body text-sm text-muted-foreground">Banco</span>
                    <p className="font-heading text-foreground">{PIX.bank}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-4 rounded-full font-heading tracking-wide hover:shadow-xl hover:shadow-primary/20 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copiar chave Pix
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={giftsImage}
                alt="Presentes de casamento"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/15 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;
