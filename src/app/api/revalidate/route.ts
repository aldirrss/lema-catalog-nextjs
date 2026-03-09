/**
 * API Proxy — /api/modules
 * Meneruskan request dari client ke Odoo backend server-side,
 * sehingga ODOO_BASE_URL tidak pernah terekspos ke browser.
 */
import { NextRequest, NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function GET(req: NextRequest) {
  // Ambil semua query params dari request client dan teruskan ke Odoo
  const incoming = req.nextUrl.searchParams;
  const q = new URLSearchParams();

  for (const [key, val] of incoming.entries()) {
    if (val) q.set(key, val);
  }

  const odooUrl = `${ODOO_BASE_URL}/api/modules?${q.toString()}`;

  console.log('[proxy] → Odoo:', odooUrl);

  try {
    const res = await fetch(odooUrl, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[proxy] Odoo fetch failed:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to reach Odoo backend' },
      { status: 502 },
    );
  }
}