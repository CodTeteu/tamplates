import { supabase, isSupabaseConfigured } from './supabase';
import type { RegistrationRecord } from '../types';

export const RsvpService = {
    async getAll(): Promise<RegistrationRecord[]> {
        if (!isSupabaseConfigured || !supabase) {
            console.log('Supabase not configured. Returning empty RSVP list.');
            return [];
        }

        try {
            const { data, error } = await supabase
                .from('rsvp_responses')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            return (data || []).map(item => ({
                id: item.id,
                date: item.created_at,
                fullName: item.full_name,
                phone: item.phone,
                email: item.email,
                isAttending: item.is_attending,
                totalGuests: item.total_guests,
                companionsCount: item.companions?.length || 0,
                companions: item.companions || [],
                paymentMethod: item.payment_method,
                buffetCost: 0,
                totalCost: parseFloat(item.total_cost || 0),
                songRequest: item.song_request,
                message: item.message,
                status: item.status
            })) as RegistrationRecord[];
        } catch (error) {
            console.error('Error fetching RSVPs:', error);
            return [];
        }
    },

    async delete(id: string): Promise<void> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. Cannot delete RSVP.');
            return;
        }

        const { error } = await supabase
            .from('rsvp_responses')
            .delete()
            .eq('id', id);

        if (error) throw error;
    },

    async create(data: any): Promise<string> {
        if (!isSupabaseConfigured || !supabase) {
            console.warn('Supabase not configured. RSVP not saved to database.');
            return 'offline-' + Date.now();
        }

        const { data: result, error } = await supabase
            .from('rsvp_responses')
            .insert({
                full_name: data.fullName,
                phone: data.phone,
                email: data.email,
                is_attending: data.isAttending,
                total_guests: data.totalGuests,
                companions: data.companions,
                payment_method: data.paymentMethod,
                total_cost: data.totalCost,
                song_request: data.songRequest,
                message: data.message,
                status: data.status || 'confirmed'
            })
            .select('id')
            .single();

        if (error) throw error;
        return result.id;
    }
};
