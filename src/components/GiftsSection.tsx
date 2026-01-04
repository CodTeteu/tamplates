import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Gift, Copy, Check, X, Heart } from "lucide-react";
import giftsImage from "@/assets/gifts.jpg";
import { toast } from "@/hooks/use-toast";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { PIX } from "@/constants";

const COPY_TIMEOUT = 3000;

/**
 * Gifts Section Component
 * Displays gift registry information with PIX payment details
 * Format copied from source project
 */
const GiftsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);
  const [showPixModal, setShowPixModal] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX.key);
    setCopied(true);
    toast({
      title: "Chave Pix copiada!",
      description: "A chave foi copiada para sua área de transferência.",
    });
    setTimeout(() => setCopied(false), COPY_TIMEOUT);
  };

  return (
    <section id="presentes" className="relative py-20 md:py-32 bg-background overflow-hidden" ref={ref}>
      <BackgroundPattern opacity={30} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">

        {/* Intro Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left order-2 md:order-1"
          >
            <span className="text-primary uppercase tracking-[0.3em] text-xs font-bold bg-card/70 px-4 py-1 rounded-full backdrop-blur-sm shadow-sm inline-block mb-6">Lista de Presentes</span>
            <h2 className="text-4xl md:text-6xl font-script text-foreground mb-6">Lista de Presentes</h2>
            <p className="text-muted-foreground leading-relaxed font-body text-lg mb-8">
              Sua presença é o nosso maior presente. Preparamos uma lista virtual apenas para quem desejar nos abençoar com algum presente, ficaremos gratos por qualquer lembrança. Lembrando que sua presença é o que realmente importa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPixModal(true)}
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-primary-foreground transition duration-300 ease-out border border-transparent rounded-full shadow-lg bg-primary hover:bg-foreground cursor-pointer min-w-[200px]"
              >
                <span className="flex items-center gap-2 uppercase tracking-widest text-xs font-bold">
                  <Gift className="w-5 h-5" /> Presentear com Pix
                </span>
              </motion.button>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/lista-presentes"
                  className="inline-flex items-center justify-center px-8 py-4 border border-border rounded-full text-foreground hover:bg-card hover:border-primary transition-colors text-xs font-bold uppercase tracking-widest gap-2 bg-card/50 min-w-[200px]"
                >
                  <Gift className="w-4 h-4" /> Escolher presentes
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative block md:mt-0 order-1 md:order-2"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-all duration-700 border-4 border-card">
              <img
                src={giftsImage}
                alt="Presentes de Casamento"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Decorative small card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg shadow-xl -rotate-6 z-20 max-w-[180px] hidden sm:block">
              <p className="font-script text-2xl text-primary text-center">Lua de Mel</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* PIX Modal/Popup */}
      {showPixModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowPixModal(false)}
          ></div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close button */}
            <button
              onClick={() => setShowPixModal(false)}
              className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header decorativo */}
            <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>

            {/* Conteúdo */}
            <div className="p-6 md:p-8">
              {/* Ícone e título */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading text-foreground mb-2">Obrigado por nos presentear!</h3>
                <p className="text-muted-foreground text-sm">
                  Sua generosidade significa muito para nós. Use o QR Code ou a chave abaixo para fazer seu PIX.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6">
                {/* PIX QR Code */}
                <div className="bg-white p-3 rounded-xl border-2 border-border shadow-sm">
                  <img
                    src="/images/qrcode-pix.png"
                    alt="QR Code PIX"
                    className="w-52 h-52 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>

                {/* Bank Info */}
                <div className="w-full bg-primary/5 border border-primary/20 rounded-lg p-4 text-left">
                  <p className="text-sm text-foreground font-medium font-heading">{PIX.recipientName}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">{PIX.bank}</p>
                  </div>
                </div>

                {/* Chave PIX */}
                <div className="w-full">
                  <div
                    className="bg-muted p-4 rounded-xl border border-border flex items-center justify-between group cursor-pointer hover:border-primary transition-colors"
                    onClick={handleCopyPix}
                  >
                    <span className="font-mono text-sm text-foreground truncate px-2 select-all">
                      {PIX.key}
                    </span>
                    <button className="text-primary group-hover:scale-110 transition-transform">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleCopyPix}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-foreground transition-colors shadow-md flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" /> Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copiar Chave PIX
                    </>
                  )}
                </button>

                {/* Mensagem de agradecimento */}
                <p className="text-center text-muted-foreground text-xs italic">
                  "O amor é a única riqueza que se multiplica quando dividida." ❤️
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default GiftsSection;
