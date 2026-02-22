import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { title, price, designId } = req.body;

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: title,
                description: `License for Design #${designId}`,
              },
              unit_amount: Math.round(price * 100), 
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/index.html?status=success`,
        cancel_url: `${req.headers.origin}/index.html?status=cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      console.error("Stripe Error:", err);
      res.status(500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}