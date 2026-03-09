'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ModuleDetail, ModuleVersion } from '@/types';
import { PurchaseDialog } from './PurchaseDialog';

interface Props {
  mod: ModuleDetail;
}

// Nomor WhatsApp & Email bisnis — ganti sesuai kontak kamu
export const WA_NUMBER = '6281529763081';
export const BUSINESS_EMAIL = 'aldialputra@gmail.com';

const VERSION_COLORS: Record<string, string> = {
  '19': '#6d28d9',
  '18': '#0891b2',
  '17': '#059669',
  '16': '#d97706',
  '15': '#b91c1c',
  '14': '#0f766e',
  '13': '#1e40af',
  '12': '#047857',
  '11': '#c2410c',
  '10': '#7c3aed',
  '9':  '#dc2626',
  '8':  '#ea580c',
};

export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return `$${price.toFixed(2)}`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Main Sidebar ─────────────────────────────────────────────
export default function ModuleSidebar({ mod }: Props) {
  const versions: ModuleVersion[] = mod.versions ?? [];
  const defaultVersion = versions.length > 0 ? versions[versions.length - 1] : null;
  const [selectedVersion, setSelectedVersion] = useState<ModuleVersion | null>(defaultVersion);
  const [showDialog, setShowDialog] = useState(false);
  const [downloadCount, setDownloadCount] = useState(mod.count_download ?? 0);

  const selectedColor = selectedVersion
    ? (VERSION_COLORS[selectedVersion.odoo_version] ?? 'var(--brand-primary)')
    : 'var(--brand-primary)';

  const isFree = mod.price === 0;
  const hasDownloadUrl = !!selectedVersion?.download_url;

  // Tampilkan count yang relevan
  const displayCount = isFree ? downloadCount : (mod.count_purchase ?? 0);
  const countLabel = isFree ? 'Downloads' : 'Purchases';
  const countIcon = isFree ? '⬇️' : '🛒';

  function handleFreeDownload() {
    // Buka download di tab baru langsung (tidak ada delay)
    window.open(selectedVersion?.download_url, '_blank', 'noopener,noreferrer');

    // Fire-and-forget: increment counter di background
    fetch(`/api/modules/${mod.slug}/download`, { method: 'POST' })
      .then((res) => res.json())
      .then((data) => { if (data.success) setDownloadCount(data.count_download); })
      .catch(() => { /* silent */ });
  }

  return (
    <>
      <div className="card" style={{ padding: '1.5rem', position: 'sticky', top: '6rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '0.563rem' }}>
          {/* Price */}
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--brand-primary)' }}>
            {formatPrice(mod.price)}
          </div>

          {/* Download / Purchase count badge */}
          <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              padding: '0.3rem 0.7rem',
              borderRadius: '9999px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-card)',
              fontSize: '0.8125rem',
              color: 'var(--text-secondary)',
              fontWeight: 500,
              }}>
            <span>{countIcon}</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>{formatCount(displayCount)}</strong> {countLabel}</span>
          </div>
        </div>
        
        {mod.price > 0 && (
          <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            One-time purchase
          </p>
        )}

        {/* Action buttons */}
        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {mod.demo_url && (
            <a href={mod.demo_url} target="_blank" rel="noopener noreferrer"
              className="btn-primary" style={{ justifyContent: 'center' }}>
              🎯 Request Demo
            </a>
          )}
          <Link href="/contact" className="btn-outline" style={{ justifyContent: 'center' }}>
            💬 Contact Us
          </Link>
          {mod.documentation_url && (
            <a href={mod.documentation_url} target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ justifyContent: 'center' }}>
              📚 Documentation
            </a>
          )}
          {mod.github_url && (
            <a href={mod.github_url} target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ justifyContent: 'center' }}>
              GitHub
            </a>
          )}
        </div>

        {/* Separator */}
        <div style={{ margin: '1.5rem 0', borderTop: '1px solid var(--border-card)' }} />

        {/* Meta info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>

          {/* Version selector */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>Version</span>
            {versions.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', justifyContent: 'flex-end' }}>
                {versions.map((v) => {
                  const isActive = selectedVersion?.id === v.id;
                  const color = VERSION_COLORS[v.odoo_version] ?? 'var(--brand-primary)';
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVersion(v)}
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '0.375rem',
                        border: `1.5px solid ${color}`,
                        background: isActive ? color : 'transparent',
                        color: isActive ? '#fff' : color,
                        fontSize: '0.75rem', fontWeight: 700,
                        cursor: 'pointer', transition: 'all 0.15s',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {v.odoo_version}
                    </button>
                  );
                })}
              </div>
            ) : (
              <span style={{ fontWeight: 500 }}>—</span>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Category</span>
            <span style={{ fontWeight: 500 }}>{mod.category?.name ?? '—'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Technical Name</span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              style={{ fontWeight: 500 }}>{mod.technical_name}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Features</span>
            <span style={{ fontWeight: 500 }}>{mod.feature_count}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Screenshots</span>
            <span style={{ fontWeight: 500 }}>{mod.screenshot_count}</span>
          </div>
          {mod.feedback_count != null && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Reviews</span>
              <span style={{ fontWeight: 500 }}>{mod.feedback_count}</span>
            </div>
          )}

          {/* ── Download / Purchase button ── */}
          {selectedVersion && (
            <div style={{ paddingTop: '0.25rem' }}>
              {/* Kasus 1: Coming soon (tidak ada link, free) */}
              {!hasDownloadUrl && isFree && (
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '0.5rem', width: '100%', padding: '0.625rem 1rem',
                  borderRadius: '0.5rem', border: '1.5px dashed var(--border-card)',
                  color: 'var(--text-muted)', fontSize: '0.8125rem',
                  marginTop: '0.5rem', boxSizing: 'border-box',
                }}>
                  ⏳ Download coming soon for Odoo {selectedVersion.odoo_version}
                </div>
              )}

              {/* Kasus 2: Ada link + Free → langsung download + increment counter */}
              {hasDownloadUrl && isFree && (
                <button
                  onClick={handleFreeDownload}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', width: '100%', padding: '0.625rem 1rem',
                    borderRadius: '0.5rem', background: selectedColor,
                    color: '#fff', fontWeight: 600, fontSize: '0.875rem',
                    border: 'none', cursor: 'pointer', transition: 'opacity 0.15s',
                    marginTop: '0.5rem', boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                >
                  <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Odoo {selectedVersion.odoo_version}
                </button>
              )}

              {/* Kasus 3 & 4: Berbayar → buka dialog purchase */}
              {!isFree && (
                <button
                  onClick={() => setShowDialog(true)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', width: '100%', padding: '0.625rem 1rem',
                    borderRadius: '0.5rem', background: selectedColor,
                    color: '#fff', fontWeight: 600, fontSize: '0.875rem',
                    border: 'none', cursor: 'pointer', transition: 'opacity 0.15s',
                    marginTop: '0.5rem', boxSizing: 'border-box',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
                >
                  🛒 Buy Odoo {selectedVersion.odoo_version}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Purchase Dialog */}
      {showDialog && (
        <PurchaseDialog
          mod={mod}
          selectedVersion={selectedVersion}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
}