import { MercadoPagoConfig, Payment } from 'mercadopago';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });
    const payment = new Payment(client);

    const result = await payment.create({ body: req.body });

    res.status(201).json({ id: result.id, status: result.status });

  } catch (error) {
    console.error("Error al crear el pago:", error);
    res.status(500).json({ error: error.message });
  }
}
