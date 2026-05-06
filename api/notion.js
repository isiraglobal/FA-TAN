/**
 * SECURITY-HARDENED Notion API Handler
 *
 * Fixes applied:
 *  - HIGH-3:  All inputs validated and sanitized.
 *  - HIGH-4:  Only generic errors returned to client.
 *  - HIGH-5:  Rate limiting applied.
 *  - MED-7:   PII not logged.
 */

import { createRateLimiter } from './_middleware.js';

const rateLimiter = createRateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 });

const ALLOWED_TYPES = ['Vendor', 'Attendee', 'Venue', 'Contact'];
const ALLOWED_PAYMENT_METHODS = ['venmo', 'zelle', 'cashapp', 'stripe'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!rateLimiter.check(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const NOTION_API_KEY = process.env.NOTION_API_KEY;
  const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    // SECURITY: In production this is an error, not a mock success
    // Keep mock in development only
    if (process.env.NODE_ENV === 'development') {
      console.warn('[notion] Keys missing — returning mock success for development');
      return res.status(200).json({ success: true, mock: true });
    }
    console.error('[notion] NOTION_API_KEY or NOTION_DATABASE_ID not configured');
    return res.status(500).json({ error: 'Service temporarily unavailable.' });
  }

  try {
    const data = req.body;

    // SECURITY: Validate type
    if (data.type && !ALLOWED_TYPES.includes(data.type)) {
      return res.status(400).json({ error: 'Invalid submission type.' });
    }

    // SECURITY: Sanitize all string fields with length caps
    const sanitize = (val, maxLen = 200) =>
      typeof val === 'string' ? val.trim().slice(0, maxLen) : undefined;

    const validEmail = (val) =>
      typeof val === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) && val.length <= 254;

    // Validate required fields
    if (!data.name || sanitize(data.name, 100)?.length < 2) {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (data.email !== undefined && !validEmail(data.email)) {
      return res.status(400).json({ error: 'Valid email is required.' });
    }
    if (data.paymentMethod !== undefined && !ALLOWED_PAYMENT_METHODS.includes(data.paymentMethod)) {
      return res.status(400).json({ error: 'Invalid payment method.' });
    }

    // Build Notion properties from sanitized data
    const properties = {};
    const name = sanitize(data.name, 100);
    const email = sanitize(data.email, 254);
    const businessName = sanitize(data.businessName, 150);
    const instagram = sanitize(data.instagram, 100);
    const paymentMethod = sanitize(data.paymentMethod, 20);
    const type = sanitize(data.type, 20);

    if (name) properties.Name = { title: [{ text: { content: name } }] };
    if (email) properties.Email = { email: email };
    if (businessName) properties.BusinessName = { rich_text: [{ text: { content: businessName } }] };
    if (instagram) properties.Instagram = { rich_text: [{ text: { content: instagram } }] };
    if (paymentMethod) properties.PaymentMethod = { select: { name: paymentMethod } };
    if (type) properties.Type = { select: { name: type } };

    const response = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: properties,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      // SECURITY: Log internal error, return generic message
      console.error('[notion] API error', { status: response.status, code: errorData.code });
      return res.status(500).json({ error: 'Submission failed. Please try again.' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[notion] Unexpected error', { message: error.message });
    return res.status(500).json({ error: 'Submission failed. Please try again.' });
  }
}
