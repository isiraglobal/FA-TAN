import { createRateLimiter } from '../_middleware.js';

const rateLimiter = createRateLimiter({ maxRequests: 5, windowMs: 15 * 60 * 1000 });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!rateLimiter.check(ip)) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  const { id, password } = req.body;

  const ADMIN_ID = process.env.ADMIN_ID;
  const ADMIN_PASS = process.env.ADMIN_PASS;

  if (!ADMIN_ID || !ADMIN_PASS) {
    console.error('[api/admin/login] ADMIN_ID or ADMIN_PASS not configured');
    return res.status(500).json({ error: 'Login service not configured' });
  }

  if (id === ADMIN_ID && password === ADMIN_PASS) {
    // SECURITY: Use a simple session token derived from internal secret
    // For production, use JWT or a proper session store
    const token = Buffer.from(`${ADMIN_ID}:${process.env.INTERNAL_WEBHOOK_SECRET}`).toString('base64');
    
    // Set as a secure, httpOnly cookie if possible, but for simplicity we'll return it
    // and the client will use it in Authorization header.
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
