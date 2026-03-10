'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLang } from './LangProvider';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer style={{
      borderTop: '1px solid var(--border-card)',
      backgroundColor: 'var(--bg-surface)',
      transition: 'background-color 0.25s',
    }}>
      <div style={{ margin: '0 auto', maxWidth: '80rem', padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '2rem' }}
          className="footer-grid">

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
              <Image src="/icon.png" alt="Lema Core Logo" width={56} height={56} />
              <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Lema<span style={{ color: 'var(--brand-primary)' }}>Core Technologies</span>
              </span>
            </div>
            <p style={{ marginTop: '0.75rem', maxWidth: '20rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {t.footer.tagline}
            </p>
            
            {/* Social Media */}
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com/lema.technologies" target="_blank" rel="noopener noreferrer" 
                aria-label="Instagram"
                style={{ color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#e4405f')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
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
              <li><a href="https://apps.odoo.com/apps/modules/browse?author=Lema%20Core%20Technologies" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                Odoo Apps Store
              </a></li>
              <li><Link href="/catalog?odoo_version=18" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                Odoo 18 Modules
              </Link></li>
              <li><Link href="/catalog?odoo_version=17" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--brand-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                Odoo 17 Modules
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
