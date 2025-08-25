import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { title, price } = req.body;
    if (!title || !price) {
      return res.status(400).json({ error: 'Título y precio son requeridos.' });
    }

    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: title,
            unit_price: Number(price),
            quantity: 1,
          },
        ],
        back_urls: {
          success: "https://darktraining-santuario.vercel.app/gracias",
          failure: "https://darktraining-santuario.vercel.app/pago-fallido",
        },
        auto_return: "approved",
        notification_url: `https://darktraining-santuario.vercel.app/api/payment-webhook`,
      },
    });

    // Devolvemos la URL de pago directamente
    res.json({ init_point: result.init_point });

  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: 'Error interno al crear la preferencia.' });
  }
}
