/**
 * Wedding Configuration - White-Label Template
 * 
 * Este é o ÚNICO arquivo que precisa ser modificado para configurar um novo casamento.
 * Todos os componentes do site leem os dados deste arquivo.
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
    /** História do casal - exibida na seção "Nossa História" */
    story: {
        paragraph1: "Nos encontramos no tempo certo e, quando demos o primeiro passo, entendemos que Deus já estava escrevendo nossa história. Do pedido de namoro ao pedido de casamento, tudo aconteceu com propósito e confirmação.",
        paragraph2: "Jesus tem sido o nosso alicerce, abrindo portas e guiando cada decisão. É com alegria e gratidão que convidamos você para celebrar conosco esse grande dia, onde uniremos nossas vidas diante de Deus.",
    },
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
// THEME CONFIGURATION
// ============================================================================

import { THEME_PRESETS, getThemeColors, type ThemePresetName } from './themes';

/**
 * Tema ativo - Mude esta string para trocar o visual do site inteiro
 * Opções disponíveis: "CLASSIC_GOLD" | "NIGHT_BLUE" | "RUSTIC_EARTH"
 */
export const ACTIVE_THEME: ThemePresetName = "CLASSIC_GOLD";

export const THEME = {
    /** Nome do preset ativo */
    activePreset: ACTIVE_THEME,
    fonts: {
        /** Fonte decorativa para títulos estilizados (nomes do casal) */
        script: '"Great Vibes", cursive',
        /** Fonte para títulos de seção */
        heading: '"Playfair Display", serif',
        /** Fonte para corpo de texto */
        body: '"Cormorant Garamond", serif',
    },
    /** 
     * Cores do tema ativo.
     * Definidas em HSL (sem a função hsl()).
     * Para trocar as cores, mude ACTIVE_THEME acima.
     */
    colors: getThemeColors(ACTIVE_THEME),
} as const;

// Re-export THEME_PRESETS for convenience
export { THEME_PRESETS } from './themes';

// ============================================================================
// ASSETS CONFIGURATION
// ============================================================================

/**
 * Caminhos das imagens do site.
 * Para novos clientes, substitua os arquivos em public/casamento mantendo os nomes.
 */
export const ASSETS = {
    /** Imagens de fundo das seções */
    backgrounds: {
        hero: "/casamento/backgrounds/hero-bg.jpg",
        story: "/casamento/backgrounds/story.jpg",
        ceremony: "/casamento/backgrounds/ceremony.jpg",
        gifts: "/casamento/backgrounds/gifts.jpg",
        pattern: "/casamento/backgrounds/pattern.png",
    },
    /** Imagens do local do evento */
    venue: {
        buffet: "/casamento/venue/buffet.jpg",
        location: "/casamento/venue/location.jpg",
    },
    /** Galeria de fotos do casal */
    gallery: [
        { src: "/casamento/galeria/foto-01.jpg", alt: "Foto do casal 1" },
        { src: "/casamento/galeria/foto-02.jpg", alt: "Foto do casal 2" },
        { src: "/casamento/galeria/foto-03.jpg", alt: "Foto do casal 3" },
        { src: "/casamento/galeria/foto-04.jpg", alt: "Foto do casal 4" },
        { src: "/casamento/galeria/foto-05.jpg", alt: "Foto do casal 5" },
        { src: "/casamento/galeria/foto-06.jpg", alt: "Foto do casal 6" },
        { src: "/casamento/galeria/foto-07.jpg", alt: "Foto do casal 7" },
        { src: "/casamento/galeria/foto-08.jpg", alt: "Foto do casal 8" },
        { src: "/casamento/galeria/foto-09.jpg", alt: "Foto do casal 9" },
    ],
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
        description: "Vista-se confortável! Apenas evite branco (cor da noiva) e verde oliva (cor das madrinhas).",
        icon: "shirt",
    },
    {
        id: "parking",
        title: "Estacionamento",
        description: "Estacionamento pago no Pontal Shopping. Carros: R$ 17 por 2h + R$ 3/hora adicional. Motos: R$ 9 por 2h + R$ 2/hora adicional.",
        icon: "car",
    },
    {
        id: "photos",
        title: "Muitas fotos",
        description: "Amamos fotos! Registre cada momento e compartilhe conosco! 📸",
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
// CONSOLIDATED CONFIG OBJECT
// ============================================================================

/**
 * Objeto consolidado com toda a configuração do casamento.
 * Use este objeto para acessar todas as configurações de forma unificada.
 */
export const weddingConfig = {
    couple: COUPLE,
    event: WEDDING,
    venue: VENUE,
    contact: CONTACT,
    pix: PIX,
    theme: THEME,
    assets: ASSETS,
    menu: MENU,
    navigation: NAV_ITEMS,
    bibleVerse: BIBLE_VERSE,
    sectionTitles: SECTION_TITLES,
    guestManual: GUEST_MANUAL,
} as const;

export default weddingConfig;
