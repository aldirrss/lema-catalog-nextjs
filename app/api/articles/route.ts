import { NextRequest, NextResponse } from 'next/server';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const qs = searchParams.toString();
    const url = `${ODOO_BASE_URL}/api/articles${qs ? `?${qs}` : ''}`;

    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
