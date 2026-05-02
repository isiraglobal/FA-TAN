export async function fetchCheckoutSession({ type, amount, transactionID, name, email, tier }) {
  const response = await fetch('/api/stripe-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, amount, transactionID, name, email, tier }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || 'Unable to create Stripe checkout session');
  }

  const data = await response.json();

  if (!data.url) {
    throw new Error('Stripe checkout URL was not returned');
  }

  return data.url;
}

export function generateTransactionID(prefix = 'ID') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}
