import { MetadataRoute } from 'next';
import { getModules } from '@/lib/odoo';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.com';
const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

async function fetchAllArticles(): Promise<{ slug: string; write_date: string | null }[]> {
  try {
    // Fetch up to 200 articles for sitemap
    const res = await fetch(`${ODOO_BASE_URL}/api/articles?limit=200`, { cache: 'no-store' });
    if (!res.ok) return [];
    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { 
      url: BASE_URL,
      lastModified: now, 
      changeFrequency: 'weekly',  
      priority: 1.0  
    },
    { 
      url: `${BASE_URL}/catalog`,
      lastModified: now, 
      changeFrequency: 'daily',   
      priority: 0.95 
    },
    { 
      url: `${BASE_URL}/articles`,        
      lastModified: now, 
      changeFrequency: 'weekly',  
      priority: 0.85
    },
    { 
      url: `${BASE_URL}/forum`,           
      lastModified: now, 
      changeFrequency: 'daily',   
      priority: 0.80 
    },
    { 
      url: `${BASE_URL}/about`,           
      lastModified: now, 
      changeFrequency: 'monthly', 
      priority: 0.75 
    },
    { 
      url: `${BASE_URL}/contact`,         
      lastModified: now, 
      changeFrequency: 'monthly', 
      priority: 0.70 },
  ];

  const [modulesData, articles] = await Promise.allSettled([
    getModules({ page: 1 }),
    fetchAllArticles(),
  ]);

  const moduleRoutes: MetadataRoute.Sitemap =
    modulesData.status === 'fulfilled'
      ? modulesData.value.data.map(mod => ({
          url: `${BASE_URL}/modules/${mod.slug}`,
          lastModified: mod.created_date ? new Date(mod.created_date) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        }))
      : [];

  const articleRoutes: MetadataRoute.Sitemap =
    articles.status === 'fulfilled'
      ? articles.value.map(a => ({
          url: `${BASE_URL}/articles/${a.slug}`,
          lastModified: a.write_date ? new Date(a.write_date) : now,
          changeFrequency: 'weekly' as const,
          priority: 0.75,
        }))
      : [];

  return [...staticRoutes, ...moduleRoutes, ...articleRoutes];
}
