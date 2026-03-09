'use client';

import Link from 'next/link';
import { useLang } from '../layout/LangProvider';

export default function ModuleDetailHeader({ moduleName }: { moduleName: string }) {
  const { t, currentLang } = useLang();
  const isRtl = currentLang.dir === 'rtl';

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-card)' }}>
      <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.nav.home}</Link>
          <span>/</span>
          <Link href="/catalog" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.catalog.title}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{moduleName}</span>
        </nav>
        <Link href="/catalog" className="btn-back btn-back-desktop">
          {isRtl ? '←' : '←'} {t.module.backToCatalog}
        </Link>
      </div>

      <style>{`
        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1.5px solid var(--border-card);
          background: var(--bg-card);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.15s;
        }
        .btn-back:hover {
          border-color: var(--brand-primary);
          color: var(--brand-primary);
          background: var(--bg-surface);
        }
        .btn-back-desktop {
          display: none;
        }
        @media (min-width: 640px) {
          .btn-back-desktop {
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
}
