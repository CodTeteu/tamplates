import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
    // CORS configuration
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
        if (!accessToken) {
            throw new Error('MERCADO_PAGO_ACCESS_TOKEN não configurado no servidor.');
        }

        const client = new MercadoPagoConfig({ accessToken: accessToken });
        const preference = new Preference(client);

        const body = req.body;

        // Sanitize phone number (remove formatting)
        const cleanPhone = (body.buyerPhone || '').replace(/\D/g, '');
        const areaCode = cleanPhone.substring(0, 2) || '11';
        const phoneNumber = cleanPhone.substring(2) || '999999999';

        // Construct the preference payload
        const preferenceData = {
            items: body.items.map(item => ({
                id: item.id || 'gift',
                title: item.name || 'Presente',
                description: item.description || 'Presente de casamento',
                picture_url: item.imageUrl || '',
                quantity: Number(item.quantity) || 1,
                unit_price: Number(item.price) || 1,
                currency_id: 'BRL'
            })),
            payer: {
                name: body.buyerName || 'Convidado',
                email: body.buyerEmail || `${cleanPhone}@casamento.com`,
                phone: {
                    area_code: areaCode,
                    number: phoneNumber
                }
            },
            back_urls: {
                success: body.successUrl || 'https://eduardo-nicole.vercel.app',
                failure: 'https://eduardo-nicole.vercel.app',
                pending: 'https://eduardo-nicole.vercel.app'
            },
            auto_return: 'approved',
            // Apenas cartão de crédito - exclui PIX, boleto, débito e transferência
            payment_methods: {
                excluded_payment_types: [
                    { id: 'bank_transfer' },  // Exclui PIX e transferência
                    { id: 'ticket' },          // Exclui boleto
                    { id: 'atm' },             // Exclui caixa eletrônico
                    { id: 'debit_card' }       // Exclui débito
                ]
            }
        };

        console.log('Creating preference:', JSON.stringify(preferenceData, null, 2));
        const response = await preference.create({ body: preferenceData });

        return res.status(200).json({
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point,
            id: response.id
        });

    } catch (error) {
        console.error('Mercado Pago Error:', error);
        const errorMessage = error.message || error.cause?.message || 'Erro desconhecido';
        const errorDetails = error.cause ? JSON.stringify(error.cause) : '';
        return res.status(500).json({
            error: `${errorMessage} ${errorDetails}`.trim()
        });
    }
}
