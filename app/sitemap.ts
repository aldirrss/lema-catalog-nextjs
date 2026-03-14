import { MetadataRoute } from 'next';
import { getModules } from '@/lib/odoo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // ── Static pages — all main nav routes with high priority ──────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,                // Homepage — highest
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,               // Catalog — main product page
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,               // Knowledge base
    },
    {
      url: `${BASE_URL}/forum`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.80,               // Community forum
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.70,
    },
  ];

  // ── Dynamic module pages ───────────────────────────────────────────────────
  try {
    const modulesData = await getModules({ page: 1 });
    const moduleRoutes: MetadataRoute.Sitemap = modulesData.data.map((mod) => ({
      url: `${BASE_URL}/modules/${mod.slug}`,
      lastModified: mod.created_date ? new Date(mod.created_date) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...moduleRoutes];
  } catch {
    return staticRoutes;
  }
}
