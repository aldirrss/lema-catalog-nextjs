/**
 * Odoo API Client
 * ---------------
 * Thin wrapper around the Odoo REST API endpoints exposed by
 * the lema_module_catalog Odoo module.
 *
 * Semua fungsi didesain untuk dipanggil dari Server Components
 * atau API routes — berjalan server-side, tidak expose Odoo URL ke browser.
 *
 * Cache Strategy (Production):
 * - Pakai ISR dengan revalidate 300 detik (5 menit) sebagai fallback.
 * - Setiap fetch diberi cache tag agar bisa di-revalidate secara on-demand
 *   via POST /api/revalidate ketika data Odoo berubah.
 */

import type {
  ApiListResponse,
  ApiSingleResponse,
  Category,
  CatalogFilters,
  Module,
  ModuleDetail,
} from '@/types';

const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

/**
 * Fallback revalidate time (detik).
 * Ini adalah "safety net" — data PASTI fresh dalam 5 menit
 * meski webhook Odoo tidak terpanggil.
 */
const REVALIDATE_SECONDS = 300;

// ----------------------------------------------------------------
// Internal helper
// ----------------------------------------------------------------

async function odooFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const url = `${ODOO_BASE_URL}${path}`;
  const res = await fetch(url, init);

  if (!res.ok) {
    throw new Error(`Odoo API error: ${res.status} ${res.statusText} [${url}]`);
  }

  return res.json() as Promise<T>;
}

function buildQuery(params: Record<string, string | number | undefined>): string {
  const q = new URLSearchParams();
  for (const [key, val] of Object.entries(params)) {
    if (val !== undefined && val !== '') {
      q.set(key, String(val));
    }
  }
  const qs = q.toString();
  return qs ? `?${qs}` : '';
}

// ----------------------------------------------------------------
// Public API
// ----------------------------------------------------------------

/** Fetch paginated, filtered list of modules. */
export async function getModules(
  filters: Partial<CatalogFilters> = {},
): Promise<ApiListResponse<Module>> {
  const query = buildQuery({
    page:         filters.page,
    search:       filters.search,
    category_id:  filters.category_id,
    odoo_version: filters.odoo_version,
    price:        filters.price,
    sort_by:      filters.sort_by,
    limit: 12,
  });

  // Selalu no-store — catalog page pakai force-dynamic,
  // jadi tidak perlu ISR. Data selalu fresh dari Odoo.
  return odooFetch(`/api/modules${query}`, { cache: 'no-store' });
}

/** Fetch featured modules untuk homepage. */
export async function getFeaturedModules(limit = 6): Promise<Module[]> {
  const res = await odooFetch<{ success: boolean; data: Module[] }>(
    `/api/modules/featured?limit=${limit}`,
    {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ['modules'],
      },
    },
  );
  return res.data;
}

/** Fetch single module by URL slug. Returns null jika tidak ditemukan. */
export async function getModuleBySlug(
  slug: string,
): Promise<ModuleDetail | null> {
  try {
    const res = await odooFetch<ApiSingleResponse<ModuleDetail>>(
      `/api/modules/${encodeURIComponent(slug)}`,
      {
        next: {
          revalidate: REVALIDATE_SECONDS,
          tags: ['modules', `module-${slug}`],
        },
        'cache': 'no-store',
      },
    );
    return res.data;
  } catch {
    return null;
  }
}

/** Fetch semua categories untuk filter dropdown. */
export async function getCategories(): Promise<Category[]> {
  const res = await odooFetch<{ success: boolean; data: Category[] }>(
    '/api/categories',
    {
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ['categories'],
      },
    },
  );
  return res.data;
}

/** Submit feedback/rating untuk sebuah module. */
export async function submitModuleFeedback(body: {
  module_id: number;
  author_name: string;
  email?: string;
  rating: number;
  comment: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  const res = await fetch(`${ODOO_BASE_URL}/api/module-feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  return res.json();
}

/** Submit contact form ke Odoo. Tidak pakai cache. */
export async function submitContactForm(body: {
  name: string;
  email: string;
  company?: string;
  message: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  const res = await fetch(`${ODOO_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store', // Form submission selalu fresh
  });
  return res.json();
}