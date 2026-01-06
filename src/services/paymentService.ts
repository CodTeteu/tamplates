export interface PaymentItem {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl?: string;
}

export interface CreatePreferenceData {
    items: PaymentItem[];
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    metadata?: {
        type?: 'rsvp' | 'gift';
        guests?: number;
        companions?: string[];
    };
    successUrl?: string;
}

// Vercel Serverless Function URL for payment processing
const API_URL = import.meta.env.VITE_PAYMENT_API_URL || '/api/create-preference';

export const PaymentService = {
    /**
     * Creates a payment preference in Mercado Pago via Cloud Function
     */
    async createPreference(data: CreatePreferenceData): Promise<{ init_point: string; sandbox_init_point?: string }> {
        // Sanitize phone to create fake email if needed
        const cleanPhone = data.buyerPhone.replace(/\D/g, '');

        // If no email provided, create a fictitious one based on phone (MP requirement)
        const emailToSend = data.buyerEmail || `${cleanPhone}@casamentoeduardonicole.com`;

        // Basic validation
        if (!data.buyerName) {
            throw new Error('Nome é obrigatório.');
        }

        if (!data.items || data.items.length === 0) {
            throw new Error('Nenhum item para pagamento.');
        }

        const payload = {
            ...data,
            buyerEmail: emailToSend
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('Erro na API de pagamento:', errorData);
                throw new Error(errorData.error || `Erro do servidor: ${response.statusText}`);
            }

            const result = await response.json();

            if (!result.init_point && !result.sandbox_init_point) {
                throw new Error('URL de pagamento não recebida do servidor.');
            }

            return result;
        } catch (error: any) {
            console.error('PaymentService Error:', error);
            throw new Error(error.message || 'Falha ao processar pagamento.');
        }
    }
};
