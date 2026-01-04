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

        // Construct the preference payload
        const preferenceData = {
            items: body.items.map(item => ({
                id: item.id,
                title: item.name,
                description: item.description,
                picture_url: item.imageUrl,
                quantity: Number(item.quantity) || 1,
                unit_price: Number(item.price),
                currency_id: 'BRL'
            })),
            payer: {
                name: body.buyerName,
                email: body.buyerEmail,
                phone: {
                    area_code: body.buyerPhone.substring(0, 2),
                    number: body.buyerPhone.substring(2)
                }
            },
            back_urls: {
                success: body.successUrl || 'https://eduardo-nicole.vercel.app',
                failure: 'https://eduardo-nicole.vercel.app',
                pending: 'https://eduardo-nicole.vercel.app'
            },
            auto_return: 'approved'
        };

        const response = await preference.create({ body: preferenceData });

        return res.status(200).json({
            init_point: response.init_point,
            sandbox_init_point: response.sandbox_init_point,
            id: response.id
        });

    } catch (error) {
        console.error('Mercado Pago Error:', error);
        return res.status(500).json({
            error: error.message || 'Erro interno ao criar preferência de pagamento'
        });
    }
}
