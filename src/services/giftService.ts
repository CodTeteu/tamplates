import { supabase, isSupabaseConfigured } from './supabase';
import type { Gift, GiftPayment } from '../types';
import { INITIAL_GIFTS } from '../constants/initialGifts';

export const GiftService = {
    // === GIFTS ===

    async getAllGifts(): Promise<Gift[]> {
        // If Supabase is not configured, return local data
        if (!isSupabaseConfigured || !supabase) {
            console.log('Using local gift data (Supabase not configured)');
            return INITIAL_GIFTS;
        }

        try {
            const { data, error } = await supabase
                .from('gifts')
                .select('*')
                .order('name');

            if (error) throw error;

            // Map snake_case to camelCase
            const gifts = (data || []).map(item => ({
                id: item.id,
                name: item.name,
                price: parseFloat(item.price),
                description: item.description,
                imageUrl: item.image_url,
                category: item.category,
                featured: item.featured
            })) as Gift[];

            // If database is empty, return local data
            return gifts.length > 0 ? gifts : INITIAL_GIFTS;
        } catch (error) {
            console.warn('Error fetching gifts from Supabase, using local data:', error);
            return INITIAL_GIFTS;
        }
    },

    async addGift(gift: Omit<Gift, 'id'>, imageFile?: File): Promise<string> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot add gift.');
            return 'offline-' + Date.now();
        }

        let imageUrl = gift.imageUrl;

        if (imageFile) {
            imageUrl = await this.uploadImage(imageFile);
        }

        const { data, error } = await supabase
            .from('gifts')
            .insert({
                name: gift.name,
                price: gift.price,
                description: gift.description,
                image_url: imageUrl,
                category: gift.category,
                featured: gift.featured || false
            })
            .select('id')
            .single();

        if (error) throw error;
        return data.id;
    },

    async updateGift(id: string, updates: Partial<Gift>, imageFile?: File): Promise<void> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot update gift.');
            return;
        }

        let imageUrl = updates.imageUrl;

        if (imageFile) {
            imageUrl = await this.uploadImage(imageFile);
        }

        const updateData: any = {};
        if (updates.name) updateData.name = updates.name;
        if (updates.price) updateData.price = updates.price;
        if (updates.description !== undefined) updateData.description = updates.description;
        if (imageUrl) updateData.image_url = imageUrl;
        if (updates.category) updateData.category = updates.category;
        if (updates.featured !== undefined) updateData.featured = updates.featured;

        const { error } = await supabase
            .from('gifts')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;
    },

    async deleteGift(id: string): Promise<void> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot delete gift.');
            return;
        }

        const { error } = await supabase
            .from('gifts')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async uploadImage(file: File): Promise<string> {
        if (!supabase) {
            console.warn('Supabase Storage not configured.');
            return URL.createObjectURL(file);
        }

        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('gifts')
            .upload(fileName, file);

        if (error) {
            console.error('Error uploading image:', error);
            return URL.createObjectURL(file);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('gifts')
            .getPublicUrl(data.path);

        return urlData.publicUrl;
    },

    // === PAYMENTS ===

    async getPayments(): Promise<GiftPayment[]> {
        if (!isSupabaseConfigured || !supabase) {
            console.log('Supabase not configured. Returning empty payments.');
            return [];
        }

        try {
            const { data, error } = await supabase
                .from('gift_payments')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (data || []).map(item => ({
                id: item.id,
                date: item.created_at,
                buyerName: item.buyer_name,
                buyerEmail: item.buyer_email,
                buyerPhone: item.buyer_phone,
                paymentMethod: item.payment_method,
                status: item.status,
                items: item.items,
                totalAmount: parseFloat(item.total_amount),
                message: item.message
            })) as GiftPayment[];
        } catch (error) {
            console.warn('Error fetching payments:', error);
            return [];
        }
    },

    async deletePayment(id: string): Promise<void> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot delete payment.');
            return;
        }

        const { error } = await supabase
            .from('gift_payments')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async savePixPayment(data: {
        buyerName: string;
        buyerPhone: string;
        items: { id: string; name: string; price: number }[];
        totalAmount: number;
        paymentMethod: 'pix';
    }): Promise<string> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. PIX payment not saved to database.');
            return 'offline-' + Date.now();
        }

        const { data: result, error } = await supabase
            .from('gift_payments')
            .insert({
                buyer_name: data.buyerName,
                buyer_email: `${data.buyerPhone.replace(/\D/g, '')}@pix.casamento.com`,
                buyer_phone: data.buyerPhone,
                items: data.items,
                total_amount: data.totalAmount,
                payment_method: 'pix',
                status: 'pending_confirmation'
            })
            .select('id')
            .single();

        if (error) throw error;
        return result.id;
    },

    async seedGifts(gifts: Gift[]) {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot seed gifts.');
            return;
        }

        const giftRows = gifts.map(gift => ({
            name: gift.name,
            price: gift.price,
            description: gift.description,
            image_url: gift.imageUrl,
            category: gift.category,
            featured: gift.featured || false
        }));

        const { error } = await supabase
            .from('gifts')
            .insert(giftRows);

        if (error) throw error;
    }
};
