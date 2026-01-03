import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Phone, Users, Music, MessageCircle } from "lucide-react";
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

    // Format message for WhatsApp
    const message = `*Confirmação de Presença - Casamento Eduardo & Nicole*%0A%0A` +
      `*Nome:* ${formData.name}%0A` +
      `*Telefone:* ${formData.phone}%0A` +
      `*Presença:* ${formData.attending === "yes" ? "Sim, estarei presente!" : "Infelizmente não poderei comparecer"}%0A` +
      `*Quantidade de pessoas:* ${formData.guests}%0A` +
      (formData.song ? `*Música sugerida:* ${formData.song}%0A` : "") +
      (formData.message ? `*Recado:* ${formData.message}` : "");

    // Open WhatsApp with the message
    window.open(`https://wa.me/5551996662954?text=${message}`, "_blank");

    toast({
      title: "Redirecionando para o WhatsApp",
      description: "Complete a confirmação enviando a mensagem.",
    });

    setIsSubmitting(false);
  };

  return (
    <section id="confirmacao" className="wedding-section bg-foreground/5" ref={ref}>
      <div className="wedding-container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="font-heading text-accent uppercase tracking-[0.2em] text-sm mb-4">
            Formulário
          </p>
          <h2 className="font-script text-4xl md:text-5xl text-primary mb-4">
            Confirmação de Presença
          </h2>
          <div className="bg-primary/10 rounded-full px-6 py-2 inline-block">
            <p className="font-body text-primary font-semibold">
              Confirmação até 13/02/2026
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-card rounded-2xl p-6 md:p-10 shadow-xl border border-border/50"
        >
          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-2">
                <User className="w-4 h-4" />
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-2">
                <Phone className="w-4 h-4" />
                Celular / WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="(00) 00000-0000"
              />
            </div>

            {/* Attending */}
            <div>
              <label className="font-body text-sm text-foreground mb-3 block">
                Você poderá comparecer?
              </label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.attending === "yes" ? "border-primary bg-primary/10" : "border-border"
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === "yes"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-body">Sim!</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  formData.attending === "no" ? "border-primary bg-primary/10" : "border-border"
                }`}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === "no"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="font-body">Não poderei</span>
                </label>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attending === "yes" && (
              <div>
                <label className="flex items-center gap-2 font-body text-sm text-foreground mb-2">
                  <Users className="w-4 h-4" />
                  Quantas pessoas irão com você?
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="1">Somente eu</option>
                  <option value="2">2 Pessoas</option>
                  <option value="3">3 Pessoas</option>
                  <option value="4">4 Pessoas</option>
                  <option value="5">5 Pessoas</option>
                  <option value="6">6 Pessoas</option>
                </select>
              </div>
            )}

            {/* Song */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-2">
                <Music className="w-4 h-4" />
                Música que não pode faltar
              </label>
              <input
                type="text"
                name="song"
                value={formData.song}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Sugira uma música (opcional)"
              />
            </div>

            {/* Message */}
            <div>
              <label className="flex items-center gap-2 font-body text-sm text-foreground mb-2">
                <MessageCircle className="w-4 h-4" />
                Recado para os noivos
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-background font-body focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Deixe um recado carinhoso (opcional)"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-full font-heading text-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
              Confirmar Presença via WhatsApp
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
