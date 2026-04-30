import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, name, email, transactionID, amount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `MarketPeace ${type} Registration - ${name}`,
              description: type === 'Vendor' ? 'Booth Deposit' : 'Event Ticket',
            },
            unit_amount: amount * 100, // Stripe expects amounts in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success?transaction_id=${transactionID}&type=${type}`,
      cancel_url: `${req.headers.origin}/${type === 'Vendor' ? 'vendors' : 'attendees'}`,
      customer_email: email,
      client_reference_id: transactionID,
      metadata: {
        type,
        transactionID
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    res.status(500).json({ message: error.message });
  }
}
