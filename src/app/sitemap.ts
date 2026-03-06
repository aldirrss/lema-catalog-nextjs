import { MetadataRoute } from 'next';
import { getModules } from '@/lib/odoo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.tech';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/catalog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  try {
    const modulesData = await getModules({ page: 1 });
    const moduleRoutes: MetadataRoute.Sitemap = modulesData.data.map((mod) => ({
      url: `${BASE_URL}/modules/${mod.slug}`,
      lastModified: mod.created_date ? new Date(mod.created_date) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...moduleRoutes];
  } catch {
    return staticRoutes;
  }
}
