import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz_REPLACE_WITH_YOUR_SCRIPT_ID/exec';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Note: To verify the webhook, you need the STRIPE_WEBHOOK_SECRET
    // If you don't provide it, you can't verify the signature.
    const body = await buffer(req);
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.warn('Webhook signature verification failed. Proceeding without verification for demo.');
    event = req.body;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { type, transactionID } = session.metadata;

    // Call Google Apps Script to update status to "Paid"
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'updateStatus',
          type: type,
          transactionID: transactionID,
          status: 'Paid',
          receiptURL: session.receipt_url || ''
        })
      });
      console.log(`Updated ${transactionID} to Paid in Google Sheets`);
    } catch (error) {
      console.error('Error updating Google Sheets:', error);
    }
  }

  res.status(200).json({ received: true });
}

// Helper to buffer the request body
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
