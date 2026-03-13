import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getModuleBySlug, getModules } from '@/lib/odoo';
import ModuleDetailClient from '@/components/catalog/ModuleDetailClient';
import ModuleSidebar from '@/components/catalog/ModuleSidebar';
import ModuleNavigation from '@/components/catalog/ModuleNavigation';
import ModuleDetailHeader from '@/components/catalog/ModuleDetailHeader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) return { title: 'Module Not Found' };
  return {
    title: mod.name,
    description: mod.short_description,
    openGraph: {
      title: mod.name,
      description: mod.short_description,
      images: mod.cover_image_url ? [{ url: mod.cover_image_url }] : [],
    },
  };
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch module detail + semua slugs secara parallel
  const [mod, allModulesData] = await Promise.all([
    getModuleBySlug(slug),
    getModules({ page: 1 }).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 999, pages: 0 } })),
  ]);
  if (!mod) notFound();

  // Temukan posisi current module → prev & next
  const allModules = allModulesData.data ?? [];
  const currentIndex = allModules.findIndex((m) => m.slug === slug);
  const prevModule = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextModule = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  const odooUrl = process.env.NEXT_PUBLIC_ODOO_BASE_URL ?? 'http://localhost:8069';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Localized Header (Breadcrumb + Back Button) */}
      <ModuleDetailHeader moduleName={mod.name} />

      <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="detail-grid">

          {/* Main Content */}
          <div style={{ minWidth: 0 }}>
            {/* Localized Metadata (Category, Rating, Date) */}
            <ModuleDetailClient mod={mod} odooUrl={odooUrl} />

            {/* Localized Prev / Next navigation */}
            <ModuleNavigation
              prev={prevModule ? { slug: prevModule.slug, name: prevModule.name } : null}
              next={nextModule ? { slug: nextModule.slug, name: nextModule.name } : null}
            />
          </div>

          {/* Sidebar */}
          <div>
            <ModuleSidebar mod={mod} />
          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .detail-grid { grid-template-columns: 2fr 1fr !important; }
        }
      `}</style>
    </div>
  );
}
