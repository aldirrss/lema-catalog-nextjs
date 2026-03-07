'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { Category } from '@/types';
import { ODOO_VERSIONS } from '@/types';

interface CatalogFiltersBarProps {
  categories: Category[];
  currentSearch: string;
  currentCategory: string;
  currentVersion: string;
}

const inputStyle: React.CSSProperties = {
  padding: '0.625rem 0.875rem',
  borderRadius: '0.5rem',
  border: '1.5px solid var(--border-card)',
  background: 'var(--bg-card)',
  color: 'var(--text-primary)',
  fontSize: '0.875rem',
  outline: 'none',
  fontFamily: 'inherit',
  cursor: 'pointer',
};

export default function CatalogFiltersBar({
  categories,
  currentSearch,
  currentCategory,
  currentVersion,
}: CatalogFiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete('page');
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
         className="catalog-filters-bar">
      {/* Search */}
      <div style={{ position: 'relative', flex: 1 }}>
        <svg
          style={{
            position: 'absolute', left: '0.75rem', top: '50%',
            transform: 'translateY(-50%)', width: 16, height: 16,
            color: 'var(--text-muted)', pointerEvents: 'none',
          }}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="search"
          placeholder="Search modules..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilter('search', e.target.value)}
          style={{
            ...inputStyle,
            width: '100%',
            paddingLeft: '2.5rem',
            boxSizing: 'border-box',
            cursor: 'text',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        {/* Category filter */}
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('category_id', e.target.value)}
          style={inputStyle}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.name} ({cat.module_count})
            </option>
          ))}
        </select>

        {/* Odoo version filter */}
        <select
          value={currentVersion}
          onChange={(e) => updateFilter('odoo_version', e.target.value)}
          style={{
            ...inputStyle,
            borderColor: currentVersion ? 'var(--brand-primary)' : 'var(--border-card)',
            color: currentVersion ? 'var(--brand-primary)' : 'var(--text-primary)',
            fontWeight: currentVersion ? 600 : 400,
          }}
        >
          <option value="">All Versions</option>
          {ODOO_VERSIONS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <style>{`
        @media (min-width: 640px) {
          .catalog-filters-bar { flex-direction: row !important; align-items: center; }
          .catalog-filters-bar > div:first-child { flex: 1; }
        }
      `}</style>
    </div>
  );
}