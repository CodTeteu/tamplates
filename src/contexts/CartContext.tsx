import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Gift } from '../types';

export interface CartItem extends Gift {
    cartId: string; // Unique ID for the item in cart
}

interface CartContextType {
    items: CartItem[];
    addToCart: (item: Gift) => void;
    removeFromCart: (cartId: string) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('wedding_cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error('Failed to parse cart', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('wedding_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (item: Gift) => {
        const newItem: CartItem = { ...item, cartId: `${item.id}-${Date.now()}` };
        setItems((prev) => [...prev, newItem]);
        setIsOpen(true); // Open cart when adding item
    };

    const removeFromCart = (cartId: string) => {
        setItems((prev) => prev.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem('wedding_cart');
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);
    const toggleCart = () => setIsOpen((prev) => !prev);

    const total = items.reduce((sum, item) => sum + item.price, 0);
    const itemCount = items.length;

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            clearCart,
            total,
            itemCount,
            isOpen,
            openCart,
            closeCart,
            toggleCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
