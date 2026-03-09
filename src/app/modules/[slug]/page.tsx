import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModuleBySlug } from '@/lib/odoo';
import { formatDate } from '@/lib/utils';
import ModuleDetailClient from '@/components/catalog/ModuleDetailClient';
import ModuleSidebar from '@/components/catalog/ModuleSidebar';

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

/** Render versi sebagai badge-badge kecil, ambil dari versions array */
function VersionBadges({ versions }: { versions: { id: number; odoo_version: string }[] }) {
  if (!versions || versions.length === 0) return null;
  return (
    <>
      {versions.map((v) => (
        <span
          key={v.id}
          className="badge"
          style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)' }}
        >
          Odoo {v.odoo_version}
        </span>
      ))}
    </>
  );
}

export default async function ModuleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const mod = await getModuleBySlug(slug);
  if (!mod) notFound();

  const odooUrl = process.env.NEXT_PUBLIC_ODOO_BASE_URL ?? 'http://localhost:8069';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-card)' }}>
        <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '0.75rem 1.5rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Catalog</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{mod.name}</span>
          </nav>
        </div>
      </div>

      <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="detail-grid">

          {/* Main Content */}
          <div style={{ minWidth: 0 }}>
            {/* Header: badges + meta when no cover */}
            {!mod.cover_image_url && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  {mod.category && <span className="badge badge-blue">{mod.category.name}</span>}
                  {/* <VersionBadges versions={mod.versions ?? []} /> */}
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{mod.name}</h1>
                <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>{mod.short_description}</p>
                <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <svg style={{ height: '1rem', width: '1rem', fill: '#f59e0b' }} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{mod.rating.toFixed(1)}</span>
                  </span>
                  {mod.created_date && <span>Published {formatDate(mod.created_date)}</span>}
                </div>
              </div>
            )}

            {/* Badges row when cover image exists */}
            {mod.cover_image_url && (
              <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                {mod.category && <span className="badge badge-blue">{mod.category.name}</span>}
                {/* <VersionBadges versions={mod.versions ?? []} /> */}
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <svg style={{ height: '1rem', width: '1rem', fill: '#f59e0b' }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{mod.rating.toFixed(1)}</span>
                  {mod.created_date && <span>· Published {formatDate(mod.created_date)}</span>}
                </span>
              </div>
            )}

            {/* Client-side interactive content */}
            <ModuleDetailClient mod={mod} odooUrl={odooUrl} />
          </div>

          {/* Sidebar — client component (needs useState for version selector) */}
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