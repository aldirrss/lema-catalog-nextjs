import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getModuleBySlug } from '@/lib/odoo';
import { formatPrice, odooVersionLabel, formatDate } from '@/lib/utils';

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
  const mod = await getModuleBySlug(slug);
  if (!mod) notFound();

  const odooUrl = process.env.NEXT_PUBLIC_ODOO_BASE_URL ?? 'http://localhost:8018';

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
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Header */}
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {mod.category && (
                  <span className="badge badge-blue">{mod.category.name}</span>
                )}
                <span className="badge" style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)' }}>
                  {odooVersionLabel(mod.odoo_version)}
                </span>
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>{mod.name}</h1>
              <p style={{ marginTop: '0.5rem', fontSize: '1.125rem', color: 'var(--text-secondary)' }}>{mod.short_description}</p>
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <svg style={{ height: '1rem', width: '1rem', fill: 'var(--text-secondary)' }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.8１.588-1.8１h3.46１a1 １ 0 00.95１-.6９l１.０７-3.２９２z"/>
                  </svg>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{mod.rating.toFixed(1)}</span>
                </span>
                {mod.created_date && <span>Published {formatDate(mod.created_date)}</span>}
              </div>
            </div>

            {/* Screenshots */}
            {mod.screenshots.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Screenshots</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                  {mod.screenshots.map((ss) => {
                    const url = ss.image_url.startsWith('http') ? ss.image_url : `${odooUrl}${ss.image_url}`;
                    return (
                      <div key={ss.id} style={{ position: 'relative', aspectRatio: '16/9', borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'var(--bg-surface)' }}>
                        <Image src={url} alt={`Screenshot ${ss.sequence}`} fill style={{ objectFit: 'cover' }} sizes="50vw" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            {mod.description && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Description</h2>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: mod.description }} />
              </div>
            )}

            {/* Features */}
            {mod.features.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>Features</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                  {mod.features.map((feat) => (
                    <div key={feat.id} className="card" style={{ display: 'flex', gap: '0.75rem', padding: '1rem' }}>
                      <div style={{
                        flexShrink: 0, marginTop: '2px',
                        height: '1.25rem', width: '1.25rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '9999px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-inline-card)',
                      }}>
                        <svg style={{ height: '0.75rem', width: '0.75rem', color: 'var(--text-primary)' }} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontWeight: 500, color: 'var(--text-primary)', fontSize: '0.875rem' }}>{feat.name}</p>
                        {feat.description && <p style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{feat.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#2e4f8e' }}>{formatPrice(mod.price)}</div>
              {mod.price > 0 && <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: '#6b7280' }}>One-time purchase</p>}

              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {mod.demo_url && (
                  <a href={mod.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ justifyContent: 'center' }}>
                    🎯 Request Demo
                  </a>
                )}
                <Link href="/contact" className="btn-outline" style={{ justifyContent: 'center' }}>
                  💬 Contact Us
                </Link>
                {mod.documentation_url && (
                  <a href={mod.documentation_url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ justifyContent: 'center' }}>
                    📚 Documentation
                  </a>
                )}
                {mod.github_url && (
                    <a href={mod.github_url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ justifyContent: 'center' }}>
                      GitHub
                  </a>
                )}
              </div>

              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-inline-card)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                {[
                  { label: 'Odoo Version', value: odooVersionLabel(mod.odoo_version) },
                  { label: 'Category', value: mod.category?.name ?? '—' },
                  { label: 'Features', value: String(mod.feature_count) },
                  { label: 'Screenshots', value: String(mod.screenshot_count) },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontWeight: 500 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
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