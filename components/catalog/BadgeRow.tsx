'use client';

import { useRef, useState, useLayoutEffect } from 'react';

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

const GAP_PX = 3;

interface Version {
  id: number | string;
  odoo_version: string;
}

interface BadgeRowProps {
  category?: { name: string } | null;
  versions: Version[];
}

export default function BadgeRow({ category, versions }: BadgeRowProps) {
  const rowRef    = useRef<HTMLDivElement>(null);
  const hiddenRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  // Normalise "19.0" → "19", "17.0" → "17" so VERSION_COLORS lookup always hits
  const sorted = [...versions]
    .map((v) => ({ ...v, odoo_version: v.odoo_version.replace(/\.0$/, '') }))
    .sort((a, b) => parseFloat(b.odoo_version) - parseFloat(a.odoo_version));

  useLayoutEffect(() => {
    const calculate = () => {
      const row    = rowRef.current;
      const hidden = hiddenRef.current;
      if (!row || !hidden) return;

      const containerWidth = row.offsetWidth;

      // Measure category badge width (if present)
      let categoryWidth = 0;
      if (category) {
        const catEl = row.firstElementChild as HTMLElement | null;
        if (catEl) categoryWidth = catEl.offsetWidth + GAP_PX;
      }

      // Available width for version badges
      const available = containerWidth - categoryWidth;

      // Get widths of all version badges from the hidden row
      const vBadges = Array.from(hidden.children) as HTMLElement[];
      if (vBadges.length === 0) { setVisibleCount(0); return; }

      // Measure +N badge width from last hidden child (the overflow badge)
      const overflowEl = hidden.lastElementChild as HTMLElement;
      const overflowWidth = overflowEl.offsetWidth + GAP_PX;

      let usedWidth = 0;
      let count = 0;

      for (let i = 0; i < vBadges.length; i++) {
        const w = vBadges[i].offsetWidth;
        const spacer = count === 0 ? 0 : GAP_PX;
        const isLast = i === vBadges.length - 1;
        // If adding this badge means there are still more left, reserve overflow badge space
        const reserveOverflow = !isLast ? overflowWidth : 0;

        if (usedWidth + spacer + w + reserveOverflow <= available + 0.5) {
          usedWidth += spacer + w;
          count++;
        } else {
          break;
        }
      }

      setVisibleCount(Math.max(count, sorted.length > 0 ? 1 : 0));
    };

    const frame = requestAnimationFrame(calculate);
    const ro = new ResizeObserver(calculate);
    if (rowRef.current) ro.observe(rowRef.current);
    return () => { cancelAnimationFrame(frame); ro.disconnect(); };
  }, [category, versions, sorted.length]);

  const measured = visibleCount !== null;
  const overflow = measured ? sorted.length - visibleCount! : 0;
  const visible  = measured ? sorted.slice(0, visibleCount!) : sorted;

  const versionBadgeStyle = (ver: string): React.CSSProperties => ({
    backgroundColor: `${VERSION_COLORS[ver] ?? '#64748b'}18`,
    color: VERSION_COLORS[ver] ?? 'var(--text-secondary)',
    border: `1px solid ${VERSION_COLORS[ver] ?? '#64748b'}40`,
    fontWeight: 600,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ position: 'relative' }}>
      {/* ── Visible row ── */}
      <div
        ref={rowRef}
        style={{
          display: 'flex',
          flexWrap: 'nowrap',
          gap: '0.375rem',
          overflow: 'hidden',
          alignItems: 'center',
          visibility: measured ? 'visible' : 'hidden',
        }}
      >
        {category && (
          <span className="badge badge-blue" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
            {category.name}
          </span>
        )}

        {sorted.length === 0 ? (
          <span className="badge" style={{ backgroundColor: 'var(--bg-surface-2)', color: 'var(--text-secondary)', flexShrink: 0 }}>
            —
          </span>
        ) : (
          <>
            {visible.map((v) => (
              <span key={v.id} className="badge" style={versionBadgeStyle(v.odoo_version)}>
                v{v.odoo_version}
              </span>
            ))}
            {measured && overflow > 0 && (
              <span className="badge" style={{
                backgroundColor: 'var(--bg-surface-2)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-card)',
                fontWeight: 600,
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}>
                +{overflow}
              </span>
            )}
          </>
        )}
      </div>

      {/* ── Hidden measurement row ── */}
      {/* Renders ALL version badges + a sample "+99" badge to measure real widths */}
      <div
        ref={hiddenRef}
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0,
          visibility: 'hidden', pointerEvents: 'none',
          display: 'flex', flexWrap: 'nowrap',
          gap: '0.375rem', whiteSpace: 'nowrap',
        }}
      >
        {sorted.map((v) => (
          <span key={v.id} className="badge" style={versionBadgeStyle(v.odoo_version)}>
            v{v.odoo_version}
          </span>
        ))}
        {/* Overflow badge sample for width measurement */}
        <span className="badge" style={{
          backgroundColor: 'var(--bg-surface-2)',
          color: 'var(--text-secondary)',
          border: '1px solid var(--border-card)',
          fontWeight: 600,
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          +99
        </span>
      </div>
    </div>
  );
}