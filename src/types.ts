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

// ============================================================================
// GIFT REGISTRY
// ============================================================================

export interface Gift {
    id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    featured?: boolean;
}

// For backwards compatibility
export type GiftOption = Gift;

export interface GiftPayment {
    id: string;
    date: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone?: string;
    paymentMethod: 'pix' | 'mercadopago';
    status: 'approved' | 'pending' | 'pending_confirmation' | 'rejected';
    items: {
        giftId?: string;
        id?: string;
        name: string;
        price: number;
        quantity?: number;
    }[];
    totalAmount: number;
    message?: string;
}

// ============================================================================
// RSVP EXTENDED (for payment flow)
// ============================================================================

export interface Companion {
    name: string;
    isChild: boolean;
}

export interface RsvpFormData {
    fullName: string;
    phone: string;
    isAttending: boolean;
    totalGuests: number;
    companionsCount: number;
    companions: Companion[];
    message: string;
    songRequest: string;
}

export interface RegistrationRecord extends RsvpFormData {
    id: string;
    date: string;
    paymentMethod: 'pix' | 'card' | 'none';
    buffetCost: number;
    totalCost: number;
    receiptUrl?: string;
    status?: string;  // 'pending_payment', 'paid', etc.
}

// ============================================================================
// PRICING & PAYMENT CONSTANTS
// ============================================================================

// Loaded from environment variables with fallbacks
export const BUFFET_PRICE = parseFloat(import.meta.env.VITE_BUFFET_PRICE || '108');
export const PIX_KEY = import.meta.env.VITE_PIX_KEY || '51985363626';
export const PIX_NAME = import.meta.env.VITE_PIX_NAME || 'Eduardo Piccini Martins';
export const CONFIRMATION_PHONE = '5551996662954';

