'use client';

import { useEffect, useRef, useState } from 'react';
import { THEMES, useTheme } from './ThemeProvider';
import type { ThemeDef } from './ThemeProvider';

export default function ThemePicker() {
  const { theme, setTheme, currentDef } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const lightThemes = THEMES.filter((t) => t.mode === 'light');
  const darkThemes  = THEMES.filter((t) => t.mode === 'dark');

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change theme"
        title="Change theme"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.375rem',
          height: '2.25rem', padding: '0 0.625rem',
          borderRadius: '0.5rem',
          border: '1.5px solid var(--border-card)',
          backgroundColor: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500,
          transition: 'all 0.15s',
        }}
      >
        {/* Color dots — selalu tampil */}
        <span style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: currentDef.preview.accent,
          }} />
          <span style={{
            width: '10px', height: '10px', borderRadius: '50%',
            backgroundColor: currentDef.preview.bg,
            border: '1px solid var(--border-card)',
          }} />
        </span>

        {/* Label + chevron — disembunyikan di mobile via CSS */}
        <span className="theme-label">{currentDef.label}</span>
        <svg className="theme-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none"
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
          width: '220px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: '0.875rem',
          boxShadow: 'var(--shadow-card-hover)',
          padding: '0.625rem',
          zIndex: 200,
          animation: 'fadeInDown 0.15s ease',
        }}>
          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            padding: '0.25rem 0.5rem 0.375rem',
          }}>☀️ Light</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem', marginBottom: '0.5rem' }}>
            {lightThemes.map((t) => (
              <ThemeOption key={t.id} def={t} active={theme === t.id} onSelect={() => { setTheme(t.id); setOpen(false); }} />
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--border-card)', margin: '0.25rem 0 0.5rem' }} />

          <p style={{
            fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--text-muted)',
            padding: '0.25rem 0.5rem 0.375rem',
          }}>🌙 Dark</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.375rem' }}>
            {darkThemes.map((t) => (
              <ThemeOption key={t.id} def={t} active={theme === t.id} onSelect={() => { setTheme(t.id); setOpen(false); }} />
            ))}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Mobile: sembunyikan label & chevron */
        @media (max-width: 767px) {
          .theme-label   { display: none; }
          .theme-chevron { display: none; }
        }
      `}</style>
    </div>
  );
}

function ThemeOption({ def, active, onSelect }: { def: ThemeDef; active: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
        gap: '0.375rem', padding: '0.5rem', borderRadius: '0.5rem',
        border: active ? `2px solid ${def.preview.accent}` : '2px solid transparent',
        backgroundColor: active ? def.preview.bg : 'transparent',
        cursor: 'pointer', transition: 'all 0.15s', width: '100%', textAlign: 'left',
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--bg-surface-2)';
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
      }}
    >
      <div style={{
        width: '100%', height: '28px', borderRadius: '0.375rem',
        backgroundColor: def.preview.bg, border: '1px solid rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px',
        overflow: 'hidden', position: 'relative',
      }}>
        <div style={{ position: 'absolute', left: '4px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: def.preview.accent }} />
        <div style={{ width: '30px', height: '4px', borderRadius: '2px', backgroundColor: def.preview.accent, opacity: 0.8 }} />
        <div style={{ width: '20px', height: '4px', borderRadius: '2px', backgroundColor: def.preview.text, opacity: 0.3 }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', width: '100%' }}>
        <span style={{
          fontSize: '0.75rem', fontWeight: active ? 600 : 500,
          color: active ? def.preview.accent : 'var(--text-secondary)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {def.label}
        </span>
        {active && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill={def.preview.accent} style={{ flexShrink: 0, marginLeft: 'auto' }}>
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )}
      </div>
    </button>
  );
}