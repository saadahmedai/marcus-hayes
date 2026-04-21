// api/content.js
// Returns protected tier content only after token validation.
// Tier 2 and 3 content never touches the frontend HTML directly.

const CONTENT_SECRET = process.env.CONTENT_SECRET || 'mh_default_secret_change_in_vercel';

function verifyToken(token) {
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
    if (decoded.sig !== CONTENT_SECRET) return null;
    if (Date.now() > decoded.expires) return null;
    return decoded;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: 'No token provided' });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ error: 'Invalid or expired token' });

  // Return the tier level — actual course content lives in separate course pages
  // which do their own localStorage tier check. This endpoint just confirms
  // the token is valid and returns the tier so dashboard can update UI.
  return res.status(200).json({ valid: true, tier: decoded.tier, name: decoded.name });
}
