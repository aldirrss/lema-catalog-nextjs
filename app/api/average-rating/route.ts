import { NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function GET() {
  try {
    const res = await fetch(`${ODOO_BASE_URL}/api/average-rating`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('[proxy] average-rating fetch failed:', err);
    return NextResponse.json(
      { success: false, average_rating: 0.0, error: 'Failed to reach Odoo backend' },
      { status: 502 },
    );
  }
}