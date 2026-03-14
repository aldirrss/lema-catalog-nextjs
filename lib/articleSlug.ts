/**
 * articleSlug.ts
 * --------------
 * Encode / decode article slugs on the Next.js side.
 *
 * Mirrors the Python implementation in Odoo's article.py exactly:
 *   encode: id → 100-char HMAC-verified hash string
 *   decode: 100-char string → number | null
 *
 * Used by:
 *   - API routes: /api/articles/[slug] — pass slug straight to Odoo
 *   - Client components: build href from article.slug returned by API
 *   - No need to encode/decode on the client — Odoo already returns `slug` in every article object
 *
 * The secret must match EXACTLY what is set in Odoo's ir.config_parameter
 * key: 'lema.article.hash_secret'
 * Default fallback (same as Python): 'LemaCoreKnowledgeSecret2024!'
 *
 * Set via env var: ARTICLE_HASH_SECRET
 */

import { createHmac, createHash, timingSafeEqual } from 'crypto';

const SECRET = process.env.ARTICLE_HASH_SECRET ?? 'LemaCoreKnowledgeSecret2024!';

/**
 * Encode an article ID (number) → 100-char slug string.
 * Used if you ever need to build a URL client-side without the API slug field.
 */
export function encodeArticleId(id: number): string {
  const idStr = String(id).padStart(10, '0');                    // "0000000034"
  const mac   = createHmac('sha256', SECRET).update(idStr).digest('hex'); // 64 hex
  const base  = idStr + mac;                                     // 74 chars
  const filler = createHash('sha256').update(mac).digest('hex'); // 64 hex
  return (base + filler).slice(0, 100);                          // exactly 100
}

/**
 * Decode a 100-char slug → article ID.
 * Returns null if length ≠ 100 or HMAC is invalid (tampered / wrong secret).
 */
export function decodeArticleSlug(slug: string): number | null {
  if (slug.length !== 100) return null;
  try {
    const idStr      = slug.slice(0, 10);
    const macReceived = slug.slice(10, 74);
    const id         = parseInt(idStr, 10);
    if (isNaN(id)) return null;

    const macExpected = createHmac('sha256', SECRET).update(idStr).digest('hex');

    // Constant-time comparison to prevent timing attacks
    const a = Buffer.from(macReceived,  'hex');
    const b = Buffer.from(macExpected, 'hex');
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    return id;
  } catch {
    return null;
  }
}

/**
 * Build the Next.js article detail URL from a slug.
 * e.g. articleUrl('aX7k...100chars...') → '/articles/aX7k...100chars...'
 */
export function articleUrl(slug: string): string {
  return `/articles/${slug}`;
}
