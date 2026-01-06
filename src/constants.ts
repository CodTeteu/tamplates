/**
 * Constants & Utilities
 * 
 * Este arquivo mantém compatibilidade com imports existentes e
 * contém apenas funções utilitárias. A configuração do casamento
 * está em src/config/wedding-config.ts
 */

// Re-export all config for backwards compatibility
export {
    COUPLE,
    WEDDING,
    VENUE,
    CONTACT,
    PIX,
    MENU,
    NAV_ITEMS,
    BIBLE_VERSE,
    SECTION_TITLES,
    GUEST_MANUAL,
    THEME,
    ASSETS,
    weddingConfig,
} from './config';

// ============================================================================
// PAYMENT UTILITIES
// ============================================================================

// Mercado Pago Fee Rate (4.99% for credit card only - PIX has no fee)
export const MERCADO_PAGO_FEE_RATE = 0.0499;

// Calculate adjusted price to pass MP fee to buyer
export const calculateMPAdjustedPrice = (originalPrice: number): number => {
    const adjustedPrice = originalPrice / (1 - MERCADO_PAGO_FEE_RATE);
    return Math.round(adjustedPrice * 100) / 100;
};

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

// Phone validation regex
export const PHONE_REGEX = /^\(?[1-9]{2}\)?\s?(?:9\d{4}|\d{4})[-\s]?\d{4}$/;

// Sanitization helper
export const sanitizeInput = (input: string): string => {
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .trim();
};
