/**
 * /api/discuss/modules-search
 * GET — search modules for tag autocomplete
 */
import { NextRequest, NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') ?? '';
  try {
    const res = await fetch(
      `${ODOO_BASE_URL}/api/discuss/modules-search?q=${encodeURIComponent(q)}&limit=10`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}