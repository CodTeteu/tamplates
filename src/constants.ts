/**
 * Constants & Utilities
 * 
 * Este arquivo mantém compatibilidade com imports existentes e
 * contém apenas funções utilitárias. A configuração do casamento
 * está em src/config/wedding-config.ts
 */

import { weddingConfig } from './config';

// Re-export all config for backwards compatibility
export {
    COUPLE,
    WEDDING,
    VENUE,
    CONTACT,
    PIX,
    DEVELOPER,
    MENU,
    NAV_ITEMS,
    BIBLE_VERSE,
    SECTION_TITLES,
    GUEST_MANUAL,
    THEME,
    ASSETS,
} from './config';

export { weddingConfig };

// ============================================================================
// PAYMENT UTILITIES
// ============================================================================

// Mercado Pago Fee Rate
export const MERCADO_PAGO_FEE_RATE = weddingConfig.paymentConfig.mercadoPagoFee;

// Calculate adjusted price to pass MP fee to buyer
export const calculateMPAdjustedPrice = (originalPrice: number): number => {
    const fee = MERCADO_PAGO_FEE_RATE;
    const adjustedPrice = originalPrice / (1 - fee);
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
