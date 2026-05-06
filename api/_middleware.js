/**
 * Shared API Middleware
 *
 * Provides:
 *  - Rate limiter factory (HIGH-5)
 *  - In-memory sliding window rate limiting by key (e.g., IP address)
 *
 * For production, replace the in-memory store with Redis/Upstash for
 * cross-instance rate limiting when deployed to serverless environments.
 */

const stores = new Map();

/**
 * Creates a rate limiter instance.
 * @param {Object} options
 * @param {number} options.maxRequests - Max requests allowed in the window
 * @param {number} options.windowMs - Time window in milliseconds
 * @returns {{ check: (key: string) => boolean }}
 */
export function createRateLimiter({ maxRequests = 10, windowMs = 60000 }) {
  const store = new Map();
  stores.set(store, true);

  // Cleanup old entries every 5 minutes to prevent memory leaks
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now - record.windowStart > windowMs) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000);

  return {
    /**
     * Check if the key is within the rate limit.
     * @param {string} key - Usually the client IP address
     * @returns {boolean} true if allowed, false if rate limited
     */
    check(key) {
      const now = Date.now();
      const record = store.get(key);

      if (!record || now - record.windowStart > windowMs) {
        // First request in this window
        store.set(key, { count: 1, windowStart: now });
        return true;
      }

      if (record.count >= maxRequests) {
        return false; // Rate limited
      }

      record.count++;
      return true;
    },
  };
}

/**
 * Validates that the Content-Type is application/json.
 * CSRF mitigation: simple requests (form submits) cannot set Content-Type to application/json.
 * @param {import('http').IncomingMessage} req
 * @returns {boolean}
 */
export function requireJsonContentType(req) {
  const ct = req.headers['content-type'] || '';
  return ct.includes('application/json');
}
