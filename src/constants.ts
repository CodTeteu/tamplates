/**
 * Wedding Configuration Constants
 * Centralized configuration for the wedding invitation website
 */

// ============================================================================
// COUPLE INFORMATION
// ============================================================================

export const COUPLE = {
    groom: "Eduardo",
    bride: "Nicole",
    groomFullName: "Eduardo Piccini Martins",
    brideFullName: "Nicole",
    displayName: "Eduardo & Nicole",
    initials: "E & N",
} as const;

// ============================================================================
// WEDDING EVENT DETAILS
// ============================================================================

export const WEDDING = {
    date: new Date("2026-02-28T18:00:00"),
    dateFormatted: "28 de Fevereiro de 2026",
    time: "18:00",
    confirmationDeadline: "13/02/2026",
} as const;

export const VENUE = {
    name: "Galeto Mamma Mia",
    address: "Galeto Mamma Mia",
    mapsUrl: "https://maps.app.goo.gl/F9dTUnP1P6YEPWfA6",
    wazeUrl: "https://waze.com/ul?ll=-30.0801,-51.1785&navigate=yes",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.8!2d-51.1!3d-29.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU0JzAwLjAiUyA1McKwMDYnMDAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890",
} as const;

// ============================================================================
// CONTACT & PAYMENT
// ============================================================================

export const CONTACT = {
    whatsappNumber: "5551996662954",
    whatsappUrl: (message: string) => `https://wa.me/5551996662954?text=${message}`,
} as const;

export const PIX = {
    key: "51985363626",
    keyType: "Celular",
    recipientName: "Eduardo Piccini Martins",
    bank: "Mercado Pago",
} as const;

// ============================================================================
// MENU CONFIGURATION
// ============================================================================

export const MENU = {
    buffetName: "Buffet Tradicional Galeto Mamma Mia",
    mainDish: "Galeto Assado na Brasa",
    sections: {
        entrada: [
            "Polenta frita",
            "Polpette",
            "Sopa de capeletti",
            "Salada de radicci",
            "Salada de maionese",
            "Salada mista",
        ],
        massas: ["Espaguete", "Penne", "Nhoque", "Talharim", "Tortéi"],
        molhos: [
            "Quatro queijos",
            "Sugo",
            "Do Neni",
            "Tomate seco",
            "Pesto",
            "Alho e óleo",
        ],
        sobremesas: [
            "Sagu",
            "Pudim de leite",
            "Ambrosia",
            "Doce de abóbora",
            "Sorvete",
        ],
        bebidas: ["Água com e sem gás", "Refrigerantes"],
    },
    pricing: {
        adult: 108,
        child: 54,
        childAgeRange: "5-10",
    },
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================

export const NAV_ITEMS = [
    { name: "Início", href: "#inicio" },
    { name: "O Casal", href: "#nossa-historia" },
    { name: "Cerimônia", href: "#cerimonia" },
    { name: "Cardápio", href: "#cardapio" },
    { name: "Presentes", href: "#presentes" },
    { name: "Confirmar", href: "#confirmacao" },
] as const;

// ============================================================================
// BIBLE VERSE
// ============================================================================

export const BIBLE_VERSE = {
    text: "O Senhor fez isto, e é maravilhoso aos nossos olhos.",
    reference: "Salmos 118:23",
} as const;

// ============================================================================
// SECTION TITLES
// ============================================================================

export const SECTION_TITLES = {
    ourStory: {
        subtitle: "Sobre Nós",
        title: "Nossa História",
    },
    ceremony: {
        subtitle: "Informações",
        title: "Detalhes do Grande Dia",
    },
    gallery: {
        subtitle: "Momentos Especiais",
        title: "Nossa Galeria",
    },
    menu: {
        subtitle: "Gastronomia",
        title: "Cardápio",
    },
    gifts: {
        subtitle: "Com Carinho",
        title: "Lista de Presentes",
    },
    rsvp: {
        subtitle: "Sua Presença",
        title: "Confirme sua Presença",
    },
} as const;

// ============================================================================
// GUEST MANUAL
// ============================================================================

export const GUEST_MANUAL = [
    {
        id: "punctuality",
        title: "Chegue no horário",
        description: "A cerimônia começará pontualmente às 18:00. Sua presença desde o início é muito importante.",
        icon: "clock",
    },
    {
        id: "dresscode",
        title: "O que vestir",
        description: "Traje Esporte Fino. Pedimos gentilmente que evitem as cores Branco, Fúcsia e Rosa Pink.",
        icon: "shirt",
    },
    {
        id: "parking",
        title: "Estacionamento",
        description: "Haverá estacionamento gratuito e seguro no local para todos os convidados.",
        icon: "car",
    },
    {
        id: "photos",
        title: "Muitas fotos",
        description: "Amamos fotos! Registre cada momento e compartilhe conosco usando nossa hashtag.",
        icon: "camera",
    },
    {
        id: "gifts",
        title: "Presentes",
        description: "Sua presença é o principal! Para mimos, temos uma lista virtual aqui no site.",
        icon: "gift",
    },
    {
        id: "confirmation",
        title: "Confirmação",
        description: "Por favor, confirme sua presença até o dia 13/02 para organizarmos tudo com carinho.",
        icon: "check",
    },
] as const;

// ============================================================================
// PAYMENT CONFIGURATION
// ============================================================================

// Mercado Pago Fee Rate (4.99% for credit card only - PIX has no fee)
export const MERCADO_PAGO_FEE_RATE = 0.0499;

// Calculate adjusted price to pass MP fee to buyer
export const calculateMPAdjustedPrice = (originalPrice: number): number => {
    const adjustedPrice = originalPrice / (1 - MERCADO_PAGO_FEE_RATE);
    return Math.round(adjustedPrice * 100) / 100;
};

// Phone validation regex
export const PHONE_REGEX = /^\(?[1-9]{2}\)?\s?(?:9\d{4}|\d{4})[-\s]?\d{4}$/;

// Sanitization helper
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .trim();
};

