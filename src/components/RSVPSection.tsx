import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Phone, Users, Music, MessageCircle, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "yes",
    guests: "1",
    song: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = `*Confirmação de Presença - Casamento Eduardo & Nicole*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*Telefone:* ${formData.phone}%0A` +
      `*Presença:* ${formData.attending === "yes" ? "Sim, estarei presente!" : "Infelizmente não poderei comparecer"}%0A` +
      `*Quantidade de pessoas:* ${formData.guests}%0A` +
      (formData.song ? `*Música sugerida:* ${formData.song}%0A` : "") +
      (formData.message ? `*Recado:* ${formData.message}` : "");

    window.open(`https://wa.me/5551996662954?text=${message}`, "_blank");

    toast({
      title: "Redirecionando para o WhatsApp",
      description: "Complete a confirmação enviando a mensagem.",
    });

    setIsSubmitting(false);
  };

  return (
    <section id="confirmacao" className="py-24 md:py-36 bg-background relative overflow-hidden" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-heading text-accent uppercase tracking-[0.3em] text-xs mb-4">
            Sua Presença
          </p>
          <h2 className="font-script text-4xl md:text-6xl text-primary">
            Confirme sua Presença
          </h2>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto mt-6" />
          <div className="inline-flex items-center gap-2 mt-6 bg-primary/10 text-primary px-5 py-2 rounded-full">
            <Heart className="w-4 h-4" />
            <p className="font-body text-sm">Confirmação até 13/02/2026</p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border border-border/30"
        >
          <div className="space-y-8">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                <User className="w-4 h-4 text-primary/70" />
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                <Phone className="w-4 h-4 text-primary/70" />
                Celular / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Attending */}
            <div>
              <label className="font-body text-sm text-foreground mb-4 block">
                Você poderá comparecer?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.attending === "yes" 
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/30"
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-heading text-lg">Sim, estarei lá!</span>
                </label>
                <label className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                  formData.attending === "no" 
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/10" 
                    : "border-border hover:border-primary/30"
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-heading text-lg">Não poderei</span>
                </label>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                  <Users className="w-4 h-4 text-primary/70" />
                  Quantas pessoas irão com você?
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none"
                >
                  <option value="1">Somente eu</option>
                  <option value="2">2 Pessoas</option>
                  <option value="3">3 Pessoas</option>
                  <option value="4">4 Pessoas</option>
                  <option value="5">5 Pessoas</option>
                  <option value="6">6 Pessoas</option>
                </select>
              </motion.div>
            )}

            {/* Song */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                <Music className="w-4 h-4 text-primary/70" />
                Música que não pode faltar
              </label>
              <input
                type="text"
                name="song"
                value={formData.song}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                placeholder="Sugira uma música (opcional)"
              />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                <MessageCircle className="w-4 h-4 text-primary/70" />
                Recado para os noivos
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-5 py-4 rounded-xl border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                placeholder="Deixe um recado carinhoso (opcional)"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground py-5 rounded-full font-heading text-lg tracking-wide hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              Confirmar via WhatsApp
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
