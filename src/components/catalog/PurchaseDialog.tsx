'use client';
import type { ModuleDetail, ModuleVersion } from '@/types';
import { formatPrice, WA_NUMBER, BUSINESS_EMAIL } from './ModuleSidebar';

// ─── Purchase Dialog ──────────────────────────────────────────
export function PurchaseDialog({
  mod, selectedVersion, onClose,
}: {
  mod: ModuleDetail;
  selectedVersion: ModuleVersion | null;
  onClose: () => void;
}) {
  const waMessage = encodeURIComponent(
    `Hi, I'm interested in purchasing the module *${mod.name}*` +
    (selectedVersion ? ` (Odoo ${selectedVersion.odoo_version})` : '') +
    `.\nPrice: ${formatPrice(mod.price)}\nPlease assist me with the purchase.`
  );
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${waMessage}`;

  const emailSubject = encodeURIComponent(
    `Purchase Inquiry: ${mod.name}` + (selectedVersion ? ` (Odoo ${selectedVersion.odoo_version})` : '')
  );
  const emailBody = encodeURIComponent(
    `Hello,\n\nI'm interested in purchasing the following module:\n\n` +
    `Module: ${mod.name}\n` +
    (selectedVersion ? `Odoo Version: ${selectedVersion.odoo_version}\n` : '') +
    `Price: ${formatPrice(mod.price)}\n\n` +
    `Please provide more information on how to proceed.\n\nThank you.`
  );
  const emailUrl = `mailto:${BUSINESS_EMAIL}?subject=${emailSubject}&body=${emailBody}`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 999,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(3px)',
        }} />

      {/* Dialog */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
        pointerEvents: 'none',
      }}>
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: '1rem',
          border: '1px solid var(--border-card)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          width: '100%',
          maxWidth: 420,
          padding: '2rem',
          pointerEvents: 'all',
          position: 'relative',
        }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: 'var(--bg-surface)', border: 'none', borderRadius: '50%',
              width: 32, height: 32, cursor: 'pointer', fontSize: '1rem',
              color: 'var(--text-secondary)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>

          {/* Icon */}
          <div style={{
            width: 52, height: 52, borderRadius: '0.75rem',
            background: 'var(--brand-primary)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', marginBottom: '1.25rem',
          }}>🛒</div>

          {/* Title */}
          <h3 style={{
            margin: '0 0 0.5rem', fontSize: '1.125rem',
            fontWeight: 700, color: 'var(--text-primary)',
          }}>
            Purchase this module?
          </h3>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            You are about to purchase <strong style={{ color: 'var(--text-primary)' }}>{mod.name}</strong>
            {selectedVersion && (
              <> for <strong style={{ color: 'var(--text-primary)' }}>Odoo {selectedVersion.odoo_version}</strong></>
            )}.
          </p>

          {/* Price box */}
          <div style={{
            padding: '0.875rem 1rem',
            borderRadius: '0.625rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-card)',
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Total</span>
            <span style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--brand-primary)' }}>
              {formatPrice(mod.price)}
            </span>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              style={{
                width: '100%', padding: '0.7rem 1rem', borderRadius: '0.5rem',
                background: '#25D366', color: '#fff', fontWeight: 700,
                fontSize: '0.875rem', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxSizing: 'border-box',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Email */}
            <a
              href={emailUrl}
              onClick={onClose}
              style={{
                width: '100%', padding: '0.7rem 1rem', borderRadius: '0.5rem',
                background: 'var(--brand-primary)', color: '#fff', fontWeight: 700,
                fontSize: '0.875rem', textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                boxSizing: 'border-box',
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Send Email
            </a>

            {/* Cancel */}
            <button
              onClick={onClose}
              style={{
                width: '100%', padding: '0.575rem 1rem', borderRadius: '0.5rem',
                border: '1.5px solid var(--border-card)', background: 'transparent',
                color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.8125rem',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
