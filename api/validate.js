// api/validate.js
// Validates Gumroad license keys and returns tier level.
//
// TIERS:
//   Tier 1 = Free Guide    (ZxFaasW37a8-pd1GkieMkg==)
//   Tier 2 = Starter Kit   (mN6jy4LcKI3I9h2Citwkqw==)
//   Tier 3 = Full Course   (M2a71znApflv-ZyuE4xrjw==)
//
// VERCEL ENVIRONMENT VARIABLES REQUIRED:
//   CONTENT_SECRET → the random string you already set
//
// Note: Product IDs are hardcoded here — they never change.
// Your existing GUMROAD_STARTER_PRODUCT_ID and GUMROAD_COURSE_PRODUCT_ID
// env vars used the permalink ("starter", "fullcourse") NOT the product ID.
// The Gumroad API requires the product_id field (the base64 string),
// so we hardcode those directly below. CONTENT_SECRET stays in env vars.

const FREE_GUIDE_PRODUCT_ID = 'ZxFaasW37a8-pd1GkieMkg==';
const STARTER_PRODUCT_ID    = 'mN6jy4LcKI3I9h2Citwkqw==';
const COURSE_PRODUCT_ID     = 'M2a71znApflv-ZyuE4xrjw==';

const CONTENT_SECRET = process.env.CONTENT_SECRET || 'mh_default_secret_change_in_vercel';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { key } = req.body || {};

  if (!key || typeof key !== 'string' || key.trim().length < 8) {
    return res.status(400).json({ error: 'Invalid key format' });
  }

  const licenseKey = key.trim();

  const products = [
    { id: FREE_GUIDE_PRODUCT_ID, tier: 1, name: 'Free Guide'  },
    { id: STARTER_PRODUCT_ID,    tier: 2, name: 'Starter Kit' },
    { id: COURSE_PRODUCT_ID,     tier: 3, name: 'Full Course'  },
  ];

  for (const product of products) {
    try {
      const gumroadRes = await fetch('https://api.gumroad.com/v2/licenses/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          product_id:           product.id,
          license_key:          licenseKey,
          increment_uses_count: 'false',
        }),
      });

      const data = await gumroadRes.json();
      console.log(`[validate] product=${product.name} success=${data.success} message=${data.message || ''}`);

      if (data.success) {
        const token = Buffer.from(
          JSON.stringify({
            tier:    product.tier,
            name:    product.name,
            prefix:  licenseKey.slice(0, 8),
            expires: Date.now() + 1000 * 60 * 60 * 24 * 30,
            sig:     CONTENT_SECRET,
          })
        ).toString('base64');

        return res.status(200).json({ valid: true, tier: product.tier, name: product.name, token });
      }
    } catch (err) {
      console.error(`[validate] Network error for ${product.name}:`, err.message);
    }
  }

  return res.status(200).json({
    valid: false,
    error: 'Key not found. Please check your key and try again.',
  });
}
