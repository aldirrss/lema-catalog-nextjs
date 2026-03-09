/**
 * API Proxy — POST /api/modules/[slug]/download
 * Meneruskan request increment download ke Odoo backend.
 * Dipanggil dari ModuleSidebar ketika user klik tombol Download (free module).
 */
import { NextRequest, NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  console.log('[download route] POST received, slug:', slug);

  try {
    const odooUrl = `${ODOO_BASE_URL}/api/modules/${encodeURIComponent(slug)}/download`;
    console.log('[download route] forwarding to Odoo:', odooUrl);

    const res = await fetch(odooUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });
    console.log('[download route] Odoo response status:', res.status);
    const data = await res.json();
    console.log('[download route] Odoo response data:', data);
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('[download route] error:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to reach Odoo backend' },
      { status: 502 },
    );
  }
}