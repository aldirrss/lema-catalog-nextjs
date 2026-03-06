'use client';

import { useEffect, useRef, useState } from 'react';
import { LANGUAGES } from '@/lib/translations';
import { useLang } from './LangProvider';

export default function LangSwitcher() {
  const { lang, setLang, currentLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch language"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          height: '2.25rem', padding: '0 0.625rem',
          borderRadius: '0.5rem',
          border: '1.5px solid var(--border-card)',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
          transition: 'all 0.15s',
          whiteSpace: 'nowrap',
        }}
      >
        {/* Flag — selalu tampil */}
        <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{currentLang.flag}</span>

        {/* Label + chevron — disembunyikan di mobile via CSS */}
        <span className="lang-label">{currentLang.code.toUpperCase()}</span>
        <svg className="lang-chevron" width="11" height="11" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5}
          style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {/* Dropdown — selalu lengkap */}
      {open && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          minWidth: '160px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: '0.75rem',
          boxShadow: 'var(--shadow-card-hover)',
          padding: '0.375rem',
          zIndex: 200,
          animation: 'fadeInDown 0.15s ease',
        }}>
          {LANGUAGES.map((l) => {
            const isActive = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.625rem',
                  width: '100%', padding: '0.5rem 0.625rem',
                  borderRadius: '0.5rem', border: 'none',
                  backgroundColor: isActive ? 'var(--bg-surface-2)' : 'transparent',
                  color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.875rem', cursor: 'pointer',
                  transition: 'background-color 0.12s',
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                <span style={{ fontSize: '1.125rem', lineHeight: 1 }}>{l.flag}</span>
                <span style={{ flex: 1 }}>{l.label}</span>
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--brand-primary)">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Mobile: sembunyikan label & chevron */
        @media (max-width: 767px) {
          .lang-label   { display: none; }
          .lang-chevron { display: none; }
        }
      `}</style>
    </div>
  );
}