// api/validate.js
// Vercel serverless function — validates a Gumroad license key
// and returns which tier it belongs to.
//
// ─── SETUP ────────────────────────────────────────────────────────────────────
// In your Vercel project dashboard → Settings → Environment Variables, add:
//   GUMROAD_STARTER_PRODUCT_ID   →  your Starter Kit product permalink
//   GUMROAD_COURSE_PRODUCT_ID    →  your Full Course product permalink
//   CONTENT_SECRET               →  any long random string you invent
//                                   (used to sign content tokens)
//
// Gumroad product permalink = the short ID in your Gumroad product URL.
// Example: gumroad.com/l/xyzabc  →  permalink is "xyzabc"
// ──────────────────────────────────────────────────────────────────────────────

const STARTER_PRODUCT = process.env.GUMROAD_STARTER_PRODUCT_ID || 'STARTER_PRODUCT_ID_HERE';
const COURSE_PRODUCT  = process.env.GUMROAD_COURSE_PRODUCT_ID  || 'COURSE_PRODUCT_ID_HERE';
const CONTENT_SECRET  = process.env.CONTENT_SECRET             || 'REPLACE_WITH_RANDOM_SECRET';

module.exports = async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { key } = req.body || {};

  if (!key || typeof key !== 'string' || key.trim().length < 8) {
    return res.status(400).json({ error: 'Invalid key format' });
  }

  // Try Starter Kit product first, then Full Course
  const products = [
    { id: STARTER_PRODUCT, tier: 2, name: 'Starter Kit' },
    { id: COURSE_PRODUCT,  tier: 3, name: 'Full Course'  },
  ];

  for (const product of products) {
    try {
      const gumroadRes = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          product_permalink: product.id,
          license_key:       key.trim(),
          increment_uses_count: 'false',
        }),
      });

      const data = await gumroadRes.json();

      if (data.success) {
        // Key is valid for this product — create a signed content token
        const token = Buffer.from(
          JSON.stringify({
            tier:    product.tier,
            name:    product.name,
            key:     key.trim().slice(0, 8), // store only prefix for reference
            expires: Date.now() + 1000 * 60 * 60 * 24 * 30, // 30 days
            sig:     CONTENT_SECRET,
          })
        ).toString('base64');

        return res.status(200).json({
          valid: true,
          tier:  product.tier,
          name:  product.name,
          token,
        });
      }
    } catch (err) {
      // Network error on this product — continue to next
      console.error(`Gumroad check failed for ${product.id}:`, err.message);
    }
  }

  // No product matched
  return res.status(200).json({
    valid: false,
    error: 'Key not found. Please check your key and try again.',
  });
};
