import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, User, Phone, Users, MessageCircle, Heart } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, WEDDING, COUPLE, CONTACT } from "@/constants";
import type { RSVPFormData } from "@/types";

const INITIAL_FORM_DATA: RSVPFormData = {
  name: "",
  phone: "",
  attending: "yes",
  guests: "1",
  message: "",
};

const GUEST_OPTIONS = [
  { value: "1", label: "Somente eu" },
  { value: "2", label: "2 Pessoas" },
  { value: "3", label: "3 Pessoas" },
  { value: "4", label: "4 Pessoas" },
  { value: "5", label: "5 Pessoas" },
  { value: "6", label: "6 Pessoas" },
];

/**
 * Build WhatsApp message from form data
 */
const buildWhatsAppMessage = (data: RSVPFormData): string => {
  const attendingText = data.attending === "yes"
    ? "Sim, estarei presente!"
    : "Infelizmente não poderei comparecer";

  let message = `*Confirmação de Presença - Casamento ${COUPLE.displayName}*%0A%0A` +
    `*Nome:* ${data.name}%0A` +
    `*Telefone:* ${data.phone}%0A` +
    `*Presença:* ${attendingText}%0A` +
    `*Quantidade de pessoas:* ${data.guests}`;

  if (data.message) {
    message += `%0A*Recado:* ${data.message}`;
  }

  return message;
};

/**
 * RSVP Section Component
 * Form for guests to confirm their attendance
 */
const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<RSVPFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const message = buildWhatsAppMessage(formData);
    window.open(CONTACT.whatsappUrl(message), "_blank");

    toast({
      title: "Redirecionando para o WhatsApp",
      description: "Complete a confirmação enviando a mensagem.",
    });

    setIsSubmitting(false);
  };

  return (
    <section id="confirmacao" className="py-24 md:py-36 bg-[#fdfcf9] relative overflow-hidden" ref={ref}>
      <BackgroundPattern opacity={100} />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <AnimatedSectionHeader
          isInView={isInView}
          subtitle={SECTION_TITLES.rsvp.subtitle}
          title={SECTION_TITLES.rsvp.title}
          badge={{
            icon: <Heart className="w-4 h-4" />,
            text: `Confirmação até ${WEDDING.confirmationDeadline}`,
          }}
        />

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
                <label
                  className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${formData.attending === "yes"
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30"
                    }`}
                >
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
                <label
                  className={`flex items-center justify-center gap-2 py-4 px-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${formData.attending === "no"
                      ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                      : "border-border hover:border-primary/30"
                    }`}
                >
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
                  {GUEST_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </motion.div>
            )}

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
