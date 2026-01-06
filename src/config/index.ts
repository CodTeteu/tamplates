/**
 * Config Barrel Export
 * 
 * Centraliza todas as exportações de configuração do casamento.
 */

export {
    // Individual exports for backwards compatibility
    COUPLE,
    WEDDING,
    VENUE,
    CONTACT,
    PIX,
    PAYMENT_CONFIG,
    DEVELOPER,
    THEME,
    ACTIVE_THEME,
    THEME_PRESETS,
    ASSETS,
    MENU,
    NAV_ITEMS,
    BIBLE_VERSE,
    SECTION_TITLES,
    GUEST_MANUAL,
    // Consolidated config object
    weddingConfig,
    default,
} from './wedding-config';

// Re-export theme utilities
export { getThemeColors } from './themes';
export type { ThemePresetName, ThemeColors, ThemePreset } from './themes';
