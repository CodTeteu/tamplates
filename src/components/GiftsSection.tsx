import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Gift, Copy, Check, Smartphone, Building2 } from "lucide-react";
import coupleImage from "@/assets/couple-4.jpg";
import { toast } from "@/hooks/use-toast";

const GiftsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const pixKey = "51985363626";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    toast({
      title: "Chave Pix copiada!",
      description: "A chave foi copiada para sua área de transferência.",
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="presentes" className="wedding-section bg-background" ref={ref}>
      <div className="wedding-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Lista de Presentes
            </p>
            <h2 className="font-script text-4xl md:text-5xl text-primary mb-6">
              Presenteie os Noivos
            </h2>
            
            <p className="font-body text-muted-foreground leading-relaxed mb-8 text-lg">
              Nossa maior alegria é ter você conosco. Para quem desejar nos presentear, esta lista foi preparada com carinho para nos acompanhar no início dessa nova etapa.
            </p>
            
            <p className="font-body text-primary font-semibold mb-8 text-lg">
              O que realmente importa é a sua presença.
            </p>

            {/* Pix Card */}
            <div className="bg-secondary/10 rounded-2xl p-6 border border-secondary/30">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="w-6 h-6 text-secondary" />
                <h3 className="font-heading text-xl text-foreground">Presentear com Pix</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Smartphone className="w-5 h-5" />
                  <span className="font-body">Chave (Celular): <strong className="text-foreground">{pixKey}</strong></span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="font-body">Nome: <strong className="text-foreground">Eduardo Piccini Martins</strong></span>
                </div>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Building2 className="w-5 h-5" />
                  <span className="font-body">Banco: <strong className="text-foreground">Mercado Pago</strong></span>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-full font-body hover:bg-primary/90 transition-colors"
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
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={coupleImage}
                alt="Eduardo e Nicole"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;
