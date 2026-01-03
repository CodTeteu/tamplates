/**
 * TypeScript Type Definitions
 * Shared types and interfaces for the wedding invitation website
 */

// ============================================================================
// COUNTDOWN
// ============================================================================

export interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// ============================================================================
// NAVIGATION
// ============================================================================

export interface NavItem {
    name: string;
    href: string;
}

// ============================================================================
// GALLERY
// ============================================================================

export interface GalleryImage {
    src: string;
    alt: string;
}

// ============================================================================
// RSVP FORM
// ============================================================================

export interface RSVPFormData {
    name: string;
    phone: string;
    attending: "yes" | "no";
    guests: string;
    message: string;
}

// ============================================================================
// GUEST MANUAL
// ============================================================================

export interface GuestManualItem {
    id: string;
    title: string;
    description: string;
    icon: "camera" | "clock" | "sparkle";
}

// ============================================================================
// SECTION HEADER
// ============================================================================

export interface SectionHeaderProps {
    subtitle: string;
    title: string;
    showDivider?: boolean;
    badge?: {
        icon: React.ReactNode;
        text: string;
    };
    className?: string;
}

// ============================================================================
// BACKGROUND PATTERN
// ============================================================================

export interface BackgroundPatternProps {
    opacity?: number;
    className?: string;
}
