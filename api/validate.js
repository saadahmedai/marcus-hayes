// api/validate.js
// Vercel serverless function — validates a Gumroad license key
// and returns which tier it belongs to.
//
// ─── SETUP ────────────────────────────────────────────────────────────────────
// Only ONE environment variable needs to be set in Vercel:
//   CONTENT_SECRET  →  any long random string you invent (signs the content token)
//
// Product IDs are hardcoded below from your Gumroad dashboard.
// ──────────────────────────────────────────────────────────────────────────────

// Your Gumroad Product IDs (from Gumroad dashboard → product → API)
const STARTER_PRODUCT_ID = 'mN6jy4LcKI3I9h2Citwkqw==';
const COURSE_PRODUCT_ID  = 'M2a71znApflv-ZyuE4xrjw==';

const CONTENT_SECRET = process.env.CONTENT_SECRET || 'mh_default_secret_change_in_vercel';

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

  const licenseKey = key.trim();

  // Try Starter Kit first, then Full Course
  const products = [
    { id: STARTER_PRODUCT_ID, tier: 2, name: 'Starter Kit' },
    { id: COURSE_PRODUCT_ID,  tier: 3, name: 'Full Course'  },
  ];

  for (const product of products) {
    try {
      const gumroadRes = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          product_id:           product.id,   // ← correct field name for Gumroad API
          license_key:          licenseKey,
          increment_uses_count: 'false',
        }),
      });

      const data = await gumroadRes.json();

      // Log for debugging (visible in Vercel function logs)
      console.log(`[validate] product=${product.name} success=${data.success} message=${data.message || ''}`);

      if (data.success) {
        // Build a signed content token valid for 30 days
        const token = Buffer.from(
          JSON.stringify({
            tier:    product.tier,
            name:    product.name,
            prefix:  licenseKey.slice(0, 8),
            expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
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
      console.error(`[validate] Network error for ${product.name}:`, err.message);
    }
  }

  // No product matched
  return res.status(200).json({
    valid: false,
    error: 'Key not found. Please check your key and try again.',
  });
};
