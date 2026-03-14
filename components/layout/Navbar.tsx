'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import ThemePicker from './ThemePicker';
import LangSwitcher from './LangSwitcher';
import { useLang } from './LangProvider';
import Image from 'next/image';

function ThreadsDropdown({ t, pathname }: { t: any; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = pathname.startsWith('/forum') || pathname.startsWith('/articles');

  const items = [
    { href: '/forum', label: t.nav.forum,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg> },
    { href: '/articles', label: t.nav.article,
      icon: <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg> },
  ];

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)} style={{
        display: 'flex', alignItems: 'center', gap: '0.25rem',
        borderRadius: '0.375rem', padding: '0.375rem 0.75rem',
        fontSize: '0.875rem', fontWeight: 500, border: 'none', cursor: 'pointer',
        transition: 'background-color 0.15s, color 0.15s',
        backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
        color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
        whiteSpace: 'nowrap',
      }}>
        {t.nav.threads}
        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div style={{
        position: 'absolute', top: 'calc(100% + 0.5rem)', left: '50%',
        minWidth: '170px',
        backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)',
        borderRadius: '0.625rem', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        padding: '0.375rem', zIndex: 100,
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transform: open ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-6px)',
        transition: 'opacity 0.15s, transform 0.15s',
      }}>
        {items.map(item => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.5rem 0.75rem', borderRadius: '0.375rem',
              fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
              transition: 'background-color 0.12s',
              backgroundColor: active ? 'var(--bg-surface)' : 'transparent',
              color: active ? 'var(--brand-primary)' : 'var(--text-primary)',
            }}>
              <span style={{ opacity: 0.65 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileThreadsOpen, setMobileThreadsOpen] = useState(false);

  const BEFORE = [
    { href: '/', label: t.nav.home },
    { href: '/catalog', label: t.nav.catalog },
    { href: '/about', label: t.nav.about },
  ];
  const AFTER = [{ href: '/contact', label: t.nav.contact }];
  const THREADS_ITEMS = [
    { href: '/forum', label: t.nav.forum, icon: '💬' },
    { href: '/articles', label: t.nav.article, icon: '📄' },
  ];
  const isThreadsActive = pathname.startsWith('/forum') || pathname.startsWith('/articles');

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50, width: '100%',
      backgroundColor: 'var(--bg-navbar)', borderBottom: '1px solid var(--border-navbar)',
      backdropFilter: 'blur(8px)', transition: 'background-color 0.25s, border-color 0.25s',
    }}>
      <div style={{
        margin: '0 auto', maxWidth: '80rem', display: 'flex', height: '4rem',
        alignItems: 'center', justifyContent: 'space-between', padding: '0 1rem', gap: '1rem',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ display: 'flex', padding: '0.1rem', width: '2.5rem', height: '2.5rem', alignItems: 'center', justifyContent: 'center', borderRadius: '0.5rem', backgroundColor: 'var(--bg-card)' }}>
            <Image src="/icon.png" alt="Lema Core Logo" width={32} height={32} />
          </div>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
            Lema<span style={{ color: 'var(--brand-primary)' }}>Core</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1, justifyContent: 'center' }} className="hidden-mobile">
          {BEFORE.map(link => (
            <Link key={link.href} href={link.href} style={{
              borderRadius: '0.375rem', padding: '0.375rem 0.75rem',
              fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
              transition: 'background-color 0.15s, color 0.15s',
              backgroundColor: pathname === link.href ? 'var(--bg-surface)' : 'transparent',
              color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>{link.label}</Link>
          ))}
          <ThreadsDropdown t={t} pathname={pathname} />
          {AFTER.map(link => (
            <Link key={link.href} href={link.href} style={{
              borderRadius: '0.375rem', padding: '0.375rem 0.75rem',
              fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
              transition: 'background-color 0.15s, color 0.15s',
              backgroundColor: pathname === link.href ? 'var(--bg-surface)' : 'transparent',
              color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-secondary)',
              whiteSpace: 'nowrap',
            }}>{link.label}</Link>
          ))}
        </nav>

        {/* Desktop right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }} className="hidden-mobile">
          <LangSwitcher /><ThemePicker />
          <Link href="/contact" className="btn-primary" style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{t.nav.getInTouch}</Link>
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }} className="show-mobile">
          <LangSwitcher /><ThemePicker />
          <button onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem',
            border: '1.5px solid var(--border-card)', backgroundColor: 'var(--bg-card)',
            color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0,
          }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div style={{ overflow: 'hidden', maxHeight: mobileOpen ? '520px' : '0', transition: 'max-height 0.3s ease' }}>
        <div style={{
          borderTop: '1px solid var(--border-card)', backgroundColor: 'var(--bg-card)',
          padding: mobileOpen ? '0.75rem 1rem 1.25rem' : '0 1rem', transition: 'padding 0.3s ease',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
            {BEFORE.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 0.875rem', borderRadius: '0.5rem',
                textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500,
                transition: 'background-color 0.12s',
                backgroundColor: pathname === link.href ? 'var(--bg-surface-2)' : 'transparent',
                color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-primary)',
              }}>
                {pathname === link.href && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', flexShrink: 0 }} />}
                {link.label}
              </Link>
            ))}

            {/* Mobile Threads accordion */}
            <div>
              <button onClick={() => setMobileThreadsOpen(v => !v)} style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.75rem 0.875rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer',
                fontSize: '0.9375rem', fontWeight: 500, transition: 'background-color 0.12s',
                backgroundColor: isThreadsActive ? 'var(--bg-surface-2)' : 'transparent',
                color: isThreadsActive ? 'var(--brand-primary)' : 'var(--text-primary)',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isThreadsActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', flexShrink: 0 }} />}
                  {t.nav.threads}
                </span>
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                  style={{ transition: 'transform 0.2s', transform: mobileThreadsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div style={{ overflow: 'hidden', maxHeight: mobileThreadsOpen ? '150px' : '0', transition: 'max-height 0.2s ease' }}>
                <div style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', paddingBottom: '0.25rem' }}>
                  {THREADS_ITEMS.map(item => {
                    const active = pathname === item.href || pathname.startsWith(item.href + '/');
                    return (
                      <Link key={item.href} href={item.href} onClick={() => { setMobileOpen(false); setMobileThreadsOpen(false); }} style={{
                        display: 'flex', alignItems: 'center', gap: '0.625rem',
                        padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
                        textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
                        transition: 'background-color 0.12s',
                        backgroundColor: active ? 'var(--bg-surface-2)' : 'transparent',
                        color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
                      }}>
                        <span>{item.icon}</span>{item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {AFTER.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.75rem 0.875rem', borderRadius: '0.5rem',
                textDecoration: 'none', fontSize: '0.9375rem', fontWeight: 500,
                transition: 'background-color 0.12s',
                backgroundColor: pathname === link.href ? 'var(--bg-surface-2)' : 'transparent',
                color: pathname === link.href ? 'var(--brand-primary)' : 'var(--text-primary)',
              }}>
                {pathname === link.href && <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--brand-primary)', flexShrink: 0 }} />}
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '0.875rem', paddingTop: '0.875rem', borderTop: '1px solid var(--border-card)' }}>
            <Link href="/contact" className="btn-primary" onClick={() => setMobileOpen(false)} style={{ width: '100%', justifyContent: 'center' }}>
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
