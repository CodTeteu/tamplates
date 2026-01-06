import { useEffect } from "react";
import { COUPLE, WEDDING, ASSETS } from "@/constants";

/**
 * Helper to update or create a meta tag
 */
const updateMetaTag = (property: string, content: string) => {
    // Check for property attribute (Open Graph)
    let element = document.querySelector(`meta[property="${property}"]`);

    // Check for name attribute (standard meta)
    if (!element) {
        element = document.querySelector(`meta[name="${property}"]`);
    }

    if (element) {
        element.setAttribute("content", content);
    } else {
        // Create new meta tag
        const meta = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
            meta.setAttribute("property", property);
        } else {
            meta.setAttribute("name", property);
        }
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
    }
};

/**
 * SEO Manager Component
 * 
 * Dynamically updates document title and meta tags based on wedding config.
 * This ensures proper SEO and social media sharing (WhatsApp, Facebook, etc.)
 */
export const SEOManager = () => {
    useEffect(() => {
        // Build dynamic content
        const title = `${COUPLE.displayName} - Casamento`;
        const description = `Você está convidado para o casamento de ${COUPLE.displayName}! ${WEDDING.dateFormatted} às ${WEDDING.time}. Confirme sua presença e celebre conosco este momento especial.`;
        const heroImageUrl = window.location.origin + ASSETS.backgrounds.hero;

        // Update document title
        document.title = title;

        // Update standard meta tags
        updateMetaTag("description", description);
        updateMetaTag("author", COUPLE.displayName);

        // Update Open Graph tags (Facebook, WhatsApp, etc.)
        updateMetaTag("og:title", title);
        updateMetaTag("og:description", description);
        updateMetaTag("og:image", heroImageUrl);
        updateMetaTag("og:type", "website");
        updateMetaTag("og:url", window.location.href);

        // Update Twitter Card tags
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        updateMetaTag("twitter:image", heroImageUrl);

    }, []); // Run once on mount

    return null; // This component doesn't render anything
};

export default SEOManager;
