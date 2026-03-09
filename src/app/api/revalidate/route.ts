/**
 * On-Demand Revalidation API
 * --------------------------
 * Endpoint yang dipanggil dari Odoo (via webhook/automation)
 * untuk membersihkan cache Next.js secara instan setelah
 * data modul diupdate.
 *
 * POST /api/revalidate?secret=<REVALIDATE_SECRET>
 *
 * Body JSON (opsional):
 * {
 *   "type": "module" | "catalog" | "feedback" | "all",
 *   "slug": "nama-modul"   // wajib jika type = "module" atau "feedback"
 * }
 *
 * Jika body tidak dikirim, default revalidate semua halaman.
 */

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------

type RevalidateBody = {
  type?: 'module' | 'catalog' | 'feedback' | 'all';
  slug?: string;
};

type RevalidateResult = {
  revalidated: boolean;
  paths: string[];
  tags: string[];
  timestamp: string;
  error?: string;
};

// ----------------------------------------------------------------
// Handler
// ----------------------------------------------------------------

export async function POST(req: NextRequest): Promise<NextResponse<RevalidateResult>> {
  // 1. Validasi secret token
  const secret = req.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.REVALIDATE_SECRET;

  if (!expectedSecret) {
    console.error('[revalidate] REVALIDATE_SECRET env variable is not set!');
    return NextResponse.json(
      {
        revalidated: false,
        paths: [],
        tags: [],
        timestamp: new Date().toISOString(),
        error: 'Server misconfiguration: REVALIDATE_SECRET not set',
      },
      { status: 500 },
    );
  }

  if (secret !== expectedSecret) {
    return NextResponse.json(
      {
        revalidated: false,
        paths: [],
        tags: [],
        timestamp: new Date().toISOString(),
        error: 'Invalid or missing secret token',
      },
      { status: 401 },
    );
  }

  // 2. Parse body
  let body: RevalidateBody = { type: 'all' };
  try {
    const text = await req.text();
    if (text) body = JSON.parse(text);
  } catch {
    // Body kosong atau bukan JSON — default ke 'all'
  }

  const revalidatedPaths: string[] = [];
  const revalidatedTags: string[] = [];

  try {
    // 3. Revalidate berdasarkan type
    switch (body.type) {

      // ----- Revalidate halaman modul spesifik -----
      case 'module': {
        if (!body.slug) {
          return NextResponse.json(
            {
              revalidated: false,
              paths: [],
              tags: [],
              timestamp: new Date().toISOString(),
              error: 'slug is required when type is "module"',
            },
            { status: 400 },
          );
        }

        // Halaman detail modul
        revalidatePath(`/modules/${body.slug}`);
        revalidatedPaths.push(`/modules/${body.slug}`);

        // Tag cache per-slug
        revalidateTag(`module-${body.slug}`, 'max');
        revalidatedTags.push(`module-${body.slug}`);

        // Catalog & homepage ikut update (list modul bisa berubah)
        revalidatePath('/catalog');
        revalidatePath('/');
        revalidatedPaths.push('/catalog', '/');

        // Tag global modules
        revalidateTag('modules', 'max');
        revalidatedTags.push('modules');

        console.log(`[revalidate] Module "${body.slug}" revalidated`);
        break;
      }

      // ----- Revalidate feedback/review modul spesifik -----
      // Dipanggil dari Odoo ketika ada feedback baru yang diapprove
      case 'feedback': {
        if (!body.slug) {
          return NextResponse.json(
            {
              revalidated: false,
              paths: [],
              tags: [],
              timestamp: new Date().toISOString(),
              error: 'slug is required when type is "feedback"',
            },
            { status: 400 },
          );
        }

        // Cukup revalidate halaman detail modul ybs
        revalidatePath(`/modules/${body.slug}`);
        revalidatedPaths.push(`/modules/${body.slug}`);

        // Tag per-slug sudah cukup — tidak perlu revalidate catalog
        revalidateTag(`module-${body.slug}`, 'max');
        revalidatedTags.push(`module-${body.slug}`);

        console.log(`[revalidate] Feedback for "${body.slug}" revalidated`);
        break;
      }

      // ----- Revalidate halaman catalog saja -----
      case 'catalog': {
        revalidatePath('/catalog');
        revalidatedPaths.push('/catalog');

        revalidateTag('modules', 'max');
        revalidatedTags.push('modules');

        console.log('[revalidate] Catalog revalidated');
        break;
      }

      // ----- Revalidate semua halaman (default) -----
      case 'all':
      default: {
        revalidatePath('/', 'layout'); // Revalidate seluruh layout tree
        revalidatePath('/catalog');
        revalidatePath('/modules/[slug]', 'page');
        revalidatedPaths.push('/', '/catalog', '/modules/[slug]');

        revalidateTag('modules', 'max');
        revalidateTag('categories', 'max');
        revalidatedTags.push('modules', 'categories');

        console.log('[revalidate] All paths revalidated');
        break;
      }
    }

    return NextResponse.json({
      revalidated: true,
      paths: revalidatedPaths,
      tags: revalidatedTags,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    console.error('[revalidate] Error during revalidation:', err);
    return NextResponse.json(
      {
        revalidated: false,
        paths: [],
        tags: [],
        timestamp: new Date().toISOString(),
        error: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

// GET untuk health-check (tanpa secret)
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: 'ok',
    message: 'Revalidation endpoint is active. Use POST with ?secret=<token> to trigger.',
    timestamp: new Date().toISOString(),
  });
}