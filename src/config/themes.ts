/**
 * Theme Presets - White-Label Template
 * 
 * Presets de cores prontos para facilitar a personalização.
 * Para trocar o tema, basta mudar `activeTheme` em wedding-config.ts
 */

/**
 * Tipo para definição de cores do tema
 */
export interface ThemeColors {
    background: string;
    foreground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    accent: string;
    accentForeground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    // Wedding-specific
    weddingCream: string;
    weddingGold: string;
    weddingBrown: string;
    weddingOlive: string;
    weddingTan: string;
}

export interface ThemePreset {
    name: string;
    description: string;
    colors: ThemeColors;
}

/**
 * THEME PRESETS
 * 
 * 3 temas prontos para uso:
 * - CLASSIC_GOLD: Dourado clássico (atual)
 * - NIGHT_BLUE: Azul Royal com Prata
 * - RUSTIC_EARTH: Terracota com Verde Oliva
 */
export const THEME_PRESETS = {
    /**
     * CLASSIC_GOLD - Tema atual
     * Cores: Creme, Dourado, Marrom
     */
    CLASSIC_GOLD: {
        name: "Classic Gold",
        description: "Elegante combinação de dourado e creme",
        colors: {
            background: "43 100% 97%",      // #fffaef - Creme claro
            foreground: "25 30% 18%",
            primary: "15 95% 31%",          // #992704 - Marrom vivido
            primaryForeground: "43 100% 97%",
            secondary: "37 30% 52%",        // #bfa77f - Dourado apagado
            secondaryForeground: "43 100% 97%",
            accent: "44 26% 43%",           // #867d55 - Oliva
            accentForeground: "43 100% 97%",
            muted: "40 20% 85%",
            mutedForeground: "25 20% 45%",
            border: "37 25% 82%",
            weddingCream: "43 100% 97%",
            weddingGold: "37 30% 52%",
            weddingBrown: "15 95% 31%",
            weddingOlive: "44 26% 43%",
            weddingTan: "28 28% 40%",
        },
    },

    /**
     * NIGHT_BLUE - Azul Royal + Prata
     * Cores: Azul marinho, Prata, Branco
     */
    NIGHT_BLUE: {
        name: "Night Blue",
        description: "Sofisticado azul royal com detalhes em prata",
        colors: {
            background: "220 30% 97%",      // Azul acinzentado claro
            foreground: "220 30% 15%",
            primary: "220 70% 35%",         // Azul Royal
            primaryForeground: "220 30% 97%",
            secondary: "220 15% 60%",       // Prata
            secondaryForeground: "220 30% 97%",
            accent: "220 25% 50%",          // Azul médio
            accentForeground: "220 30% 97%",
            muted: "220 15% 88%",
            mutedForeground: "220 20% 45%",
            border: "220 20% 85%",
            weddingCream: "220 30% 97%",
            weddingGold: "220 15% 60%",
            weddingBrown: "220 70% 35%",
            weddingOlive: "220 25% 50%",
            weddingTan: "220 20% 40%",
        },
    },

    /**
     * RUSTIC_EARTH - Terracota + Verde Oliva
     * Cores: Terracota, Verde Oliva, Bege
     */
    RUSTIC_EARTH: {
        name: "Rustic Earth",
        description: "Rústico com terracota e verde oliva",
        colors: {
            background: "35 40% 95%",       // Bege claro
            foreground: "30 30% 18%",
            primary: "15 60% 40%",          // Terracota
            primaryForeground: "35 40% 95%",
            secondary: "85 25% 45%",        // Verde Oliva
            secondaryForeground: "35 40% 95%",
            accent: "45 35% 50%",           // Mostarda
            accentForeground: "35 40% 95%",
            muted: "35 25% 88%",
            mutedForeground: "30 20% 45%",
            border: "35 20% 82%",
            weddingCream: "35 40% 95%",
            weddingGold: "45 35% 50%",
            weddingBrown: "15 60% 40%",
            weddingOlive: "85 25% 45%",
            weddingTan: "30 25% 40%",
        },
    },
} as const;

/**
 * Tipo para os nomes dos presets disponíveis
 */
export type ThemePresetName = keyof typeof THEME_PRESETS;

/**
 * Obtém as cores de um preset específico
 */
export const getThemeColors = (presetName: ThemePresetName): ThemeColors => {
    return THEME_PRESETS[presetName].colors;
};

export default THEME_PRESETS;
