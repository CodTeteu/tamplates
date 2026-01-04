import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Send, User, Phone, Users, MessageCircle, Heart, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import BackgroundPattern from "@/components/ui/BackgroundPattern";
import { AnimatedSectionHeader } from "@/components/ui/SectionHeader";
import { SECTION_TITLES, WEDDING, COUPLE, CONTACT } from "@/constants";
import { RsvpService } from "@/services";
import type { RSVPFormData as BaseRSVPFormData } from "@/types";

// Extended form data to include companions
interface ExtendedRSVPFormData extends BaseRSVPFormData {
  companions: string[];
}

const INITIAL_FORM_DATA: ExtendedRSVPFormData = {
  name: "",
  phone: "",
  attending: "yes",
  guests: "1",
  message: "",
  companions: [],
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
 * Helper to validate full name (at least 2 words)
 */
const isValidFullName = (name: string): boolean => {
  return name.trim().split(/\s+/).length >= 2;
};

/**
 * Build WhatsApp message from form data
 */
const buildWhatsAppMessage = (data: ExtendedRSVPFormData): string => {
  const isAttending = data.attending === "yes";

  let message = "";

  if (isAttending) {
    message = `Olá! Que alegria! Gostaria de confirmar minha presença no casamento de *${COUPLE.displayName}*! ❤️%0A%0A` +
      `*Nome:* ${data.name}%0A` +
      `*Telefone:* ${data.phone}%0A` +
      `*Estarei lá:* Sim! 😍%0A` +
      `*Total de pessoas:* ${data.guests}`;

    if (data.companions.length > 0) {
      const validCompanions = data.companions.filter(c => c.trim() !== "");
      if (validCompanions.length > 0) {
        message += `%0A%0A*Acompanhantes:* ✨%0A${validCompanions.map(c => `• ${c}`).join("%0A")}`;
      }
    }
  } else {
    message = `Olá! Agradeço muito o convite para o casamento de *${COUPLE.displayName}*. ❤️%0A%0A` +
      `*Nome:* ${data.name}%0A` +
      `Infelizmente não poderei comparecer, mas desejo toda a felicidade do mundo aos noivos! ✨`;
  }

  if (data.message) {
    message += `%0A%0A*Meu recado para os noivos:* 💌%0A"${data.message}"`;
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

  const [formData, setFormData] = useState<ExtendedRSVPFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update companions array size when number of guests changes
  useEffect(() => {
    const numGuests = parseInt(formData.guests);
    const numCompanions = Math.max(0, numGuests - 1);

    setFormData(prev => {
      const currentCompanions = [...prev.companions];

      // If we need more slots, add empty strings
      if (currentCompanions.length < numCompanions) {
        return {
          ...prev,
          companions: [
            ...currentCompanions,
            ...Array(numCompanions - currentCompanions.length).fill("")
          ]
        };
      }

      // If we have too many slots, trim the end
      if (currentCompanions.length > numCompanions) {
        return {
          ...prev,
          companions: currentCompanions.slice(0, numCompanions)
        };
      }

      return prev;
    });
  }, [formData.guests]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCompanionChange = (index: number, value: string) => {
    setFormData(prev => {
      const newCompanions = [...prev.companions];
      newCompanions[index] = value;
      return { ...prev, companions: newCompanions };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 0. Validation
    if (!isValidFullName(formData.name)) {
      toast({
        title: "Nome incompleto",
        description: "Por favor, digite seu nome e sobrenome.",
        variant: "destructive"
      });
      return;
    }

    // Validate companions if attending
    if (formData.attending === "yes") {
      for (let i = 0; i < formData.companions.length; i++) {
        const companionName = formData.companions[i];
        if (companionName && !isValidFullName(companionName)) {
          toast({
            title: "Nome do acompanhante incompleto",
            description: `Por favor, digite o nome e sobrenome do acompanhante ${i + 1}.`,
            variant: "destructive"
          });
          return;
        }
      }
    }

    setIsSubmitting(true);

    try {
      // 1. Prepare data for Database
      let rsvpData: any = {
        fullName: formData.name,
        phone: formData.phone,
        message: formData.message,
        songRequest: "",
      };

      if (formData.attending === "yes") {
        const companionsList = formData.companions
          .filter(c => c.trim() !== "")
          .map(name => ({ name, isChild: false }));

        rsvpData = {
          ...rsvpData,
          isAttending: true,
          totalGuests: parseInt(formData.guests),
          companions: companionsList,
          paymentMethod: 'none',
          totalCost: 0,
          status: 'confirmed'
        };
      } else {
        rsvpData = {
          ...rsvpData,
          isAttending: false,
          totalGuests: 0,
          companions: [],
          paymentMethod: 'none',
          totalCost: 0,
          status: 'declined'
        };
      }

      // 2. Save to Database IMMEDIATELY
      await RsvpService.create(rsvpData);

      toast({
        title: "Sucesso!",
        description: "Seus dados foram salvos. Redirecionando para o WhatsApp...",
      });

    } catch (error) {
      console.error("Erro ao salvar no banco de dados:", error);
      toast({
        title: "Aviso",
        description: "Houve um erro ao salvar no sistema, mas prossiga para o WhatsApp.",
        variant: "destructive"
      });
    }

    // 3. Redirect to WhatsApp (Always happens, even if DB fails, as per fallback logic)
    // Small delay to ensure user sees the success toast if DB worked
    setTimeout(() => {
      const message = buildWhatsAppMessage(formData);
      window.open(CONTACT.whatsappUrl(message), "_blank");
      setIsSubmitting(false);
    }, 1000);
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

            {/* Number of Guests & Companion Names */}
            {formData.attending === "yes" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="flex items-center gap-2 font-body text-sm text-foreground mb-3">
                    <Users className="w-4 h-4 text-primary/70" />
                    Quantas pessoas irão com você (incluindo você)?
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
                </div>

                {/* Dynamic Companion Inputs */}
                {formData.companions.length > 0 && (
                  <div className="pl-4 border-l-2 border-primary/20 space-y-4">
                    <p className="text-xs font-bold uppercase text-primary tracking-wider mb-2">Nome dos Acompanhantes</p>
                    {formData.companions.map((name, index) => (
                      <div key={index}>
                        <label className="flex items-center gap-2 font-body text-xs text-muted-foreground mb-1">
                          <UserPlus className="w-3 h-3" />
                          Acompanhante {index + 1}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => handleCompanionChange(index, e.target.value)}
                          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                          placeholder={`Nome do acompanhante ${index + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
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
              {isSubmitting ? "Salvando..." : "Confirmar via WhatsApp"}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RSVPSection;
