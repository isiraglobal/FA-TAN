import { createRateLimiter } from '../_middleware.js';

const rateLimiter = createRateLimiter({ maxRequests: 50, windowMs: 15 * 60 * 1000 });

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!rateLimiter.check(ip)) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // SECURITY: Verify Token
  const authHeader = req.headers.authorization || '';
  const expectedToken = Buffer.from(`${process.env.ADMIN_ID}:${process.env.INTERNAL_WEBHOOK_SECRET}`).toString('base64');

  if (!authHeader.includes(expectedToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  if (!GOOGLE_SCRIPT_URL) {
    return res.status(500).json({ error: 'Storage service not configured' });
  }

  try {
    if (req.method === 'POST') {
      const { cities } = req.body;
      if (!Array.isArray(cities)) {
        return res.status(400).json({ error: 'Invalid data format' });
      }

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.INTERNAL_WEBHOOK_SECRET}`,
        },
        body: JSON.stringify({
          action: 'updateCities',
          cities: cities.map(c => ({
            name: String(c.name || '').slice(0, 100),
            status: String(c.status || '').slice(0, 50),
            date: String(c.date || '').slice(0, 50),
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Apps Script update failed');
      }

      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('[api/admin/cities] Error', error);
    return res.status(500).json({ error: 'Operation failed' });
  }
}
