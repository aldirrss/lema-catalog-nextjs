import { NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function GET() {
  try {
    const res = await fetch(`${ODOO_BASE_URL}/api/articles/tree`, { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
