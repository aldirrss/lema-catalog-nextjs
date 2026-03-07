'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import ThemePicker from './ThemePicker';
import LangSwitcher from './LangSwitcher';
import { useLang } from './LangProvider';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);

  const NAV_LINKS = [
    { href: '/', label: t.nav.home },
    { href: '/catalog', label: t.nav.catalog },
    { href: '/about', label: t.nav.about },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      backgroundColor: 'var(--bg-navbar)',
      borderBottom: '1px solid var(--border-navbar)',
      backdropFilter: 'blur(8px)',
      transition: 'background-color 0.25s, border-color 0.25s',
    }}>
      <div style={{
        margin: '0 auto', maxWidth: '80rem',
        display: 'flex', height: '4rem',
        alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem',
        gap: '1rem',
      }}>

        {/* ── Logo ── */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: '0.625rem',
          textDecoration: 'none', flexShrink: 0,
        }}>
          <div style={{
            display: 'flex', padding: '0.1rem', width: '2.5rem', height: '2.5rem',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '0.5rem', backgroundColor: 'var(--bg-card)',
          }}>
            <Image src="/icon.png" alt="Lema Core Logo" width={32} height={32} />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            Lema<span style={{ color: 'var(--brand-primary)' }}>Core</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'center' }}
          className="hidden-mobile">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} style={{
              borderRadius: '0.375rem',
              padding: '0.375rem 0.75rem',
              fontSize: '0.875rem', fontWeight: 500,
              textDecoration: 'none',
              transition: 'background-color 0.15s, color 0.15s',
              backgroundColor: pathname === link.href ? 'var(--bg-surface)' : 'transparent',
              color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* ── Desktop Right Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
          className="hidden-mobile">
          <LangSwitcher />
          <ThemePicker />
          <Link href="/contact" className="btn-primary" style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
            {t.nav.getInTouch}
          </Link>
        </div>

        {/* ── Mobile Right Controls ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}
          className="show-mobile">
          <LangSwitcher />
          <ThemePicker />
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.25rem', height: '2.25rem',
              borderRadius: '0.5rem',
              border: '1.5px solid var(--border-card)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div style={{
        overflow: 'hidden',
        maxHeight: mobileOpen ? '400px' : '0',
        transition: 'max-height 0.3s ease',
      }}>
        <div style={{
          borderTop: '1px solid var(--border-card)',
          backgroundColor: 'var(--bg-card)',
          padding: mobileOpen ? '0.75rem 1rem 1.25rem' : '0 1rem',
          transition: 'padding 0.3s ease',
        }}>
          {/* Nav links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  padding: '0.75rem 0.875rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500,
                  transition: 'background-color 0.12s',
                  backgroundColor: pathname === link.href ? 'var(--bg-surface-2)' : 'transparent',
                  color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-primary)',
                }}
              >
                {/* Active dot */}
                {pathname === link.href && (
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: 'var(--brand-primary)', flexShrink: 0,
                  }} />
                )}
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-card)' }}>
            <Link href="/contact" className="btn-primary"
              onClick={() => setMobileOpen(false)}
              style={{ width: '100%', justifyContent: 'center' }}>
              {t.nav.getInTouch}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .hidden-mobile { display: flex !important; }
        .show-mobile   { display: none  !important; }

        @media (max-width: 767px) {
          .hidden-mobile { display: none  !important; }
          .show-mobile   { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
