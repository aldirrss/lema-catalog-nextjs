'use client';

import Link from 'next/link';
import { useLang } from './LangProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-card)',
      backgroundColor: 'var(--bg-surface-2)',
      transition: 'background-color 0.25s',
    }}>
      <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2rem' }}
          className="footer-grid">

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <div style={{
                display: 'flex', height: '2rem', width: '2rem',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: '0.5rem', backgroundColor: 'var(--brand-primary)',
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>L</span>
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Lema<span style={{ color: 'var(--brand-primary)' }}> Core Technologies</span>
              </span>
            </div>
            <p style={{ marginTop: '0.75rem', maxWidth: '20rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.footer.tagline}
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.footer.products}</h3>
            <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
              <li><Link href="/catalog" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {t.footer.moduleCatalog}
              </Link></li>
              <li><Link href="/catalog?odoo_version=18" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                Odoo 18
              </Link></li>
              <li><Link href="/catalog?odoo_version=17" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                Odoo 17
              </Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{t.footer.company}</h3>
            <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'none', padding: 0 }}>
              <li><Link href="/about" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {t.footer.aboutUs}
              </Link></li>
              <li><Link href="/contact" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                {t.nav.contact}
              </Link></li>
            </ul>
          </div>
        </div>

        <div style={{
          marginTop: '2.5rem', paddingTop: '2rem',
          borderTop: '1px solid var(--border-card)',
          textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)',
        }}>
          © {new Date().getFullYear()} Lema Core Technologies. {t.footer.allRightsReserved}
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
