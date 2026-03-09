'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import type { Category } from '@/types';
import { ODOO_VERSIONS } from '@/types';
import { useLang } from '../layout/LangProvider';

interface CatalogFiltersBarProps {
  categories: Category[];
  currentSearch: string;
  currentCategory: string;
  currentVersion: string;
  currentPrice: string;
  currentSort: string;
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
  currentPrice,
  currentSort,
}: CatalogFiltersBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLang();

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

  const activeStyle = (value: string): React.CSSProperties => value
    ? { ...inputStyle, border: '1.5px solid var(--brand-primary)', color: 'var(--brand-primary)', fontWeight: 600 }
    : inputStyle;

  const SORT_OPTIONS = [
    { value: '',              label: t.catalog.filterLabels.sortBy },
    { value: 'newest',        label: t.catalog.sortOptions.newest },
    { value: 'oldest',        label: t.catalog.sortOptions.oldest },
    { value: 'name_asc',      label: t.catalog.sortOptions.nameAsc },
    { value: 'name_desc',     label: t.catalog.sortOptions.nameDesc },
    { value: 'price_asc',     label: t.catalog.sortOptions.priceAsc },
    { value: 'price_desc',    label: t.catalog.sortOptions.priceDesc },
    { value: 'rating_desc',   label: t.catalog.sortOptions.ratingDesc },
    { value: 'top_purchase',  label: t.catalog.sortOptions.topPurchase },
  ];

  const PRICE_OPTIONS = [
    { value: '',      label: t.catalog.priceOptions.all },
    { value: 'free',  label: t.catalog.priceOptions.free },
    { value: 'paid',  label: t.catalog.priceOptions.paid },
  ];

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
          placeholder={t.catalog.filterLabels.search}
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

      {/* Filter row */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>

        {/* Category */}
        <select
          value={currentCategory}
          onChange={(e) => updateFilter('category_id', e.target.value)}
          style={activeStyle(currentCategory)}
        >
          <option value="">{t.catalog.filterLabels.category}</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.name} ({cat.module_count})
            </option>
          ))}
        </select>

        {/* Odoo version */}
        <select
          value={currentVersion}
          onChange={(e) => updateFilter('odoo_version', e.target.value)}
          style={activeStyle(currentVersion)}
        >
          <option value="">{t.catalog.filterLabels.version}</option>
          {ODOO_VERSIONS.map((v) => (
            <option key={v.value} value={v.value}>
              {v.label}
            </option>
          ))}
        </select>

        {/* Price filter */}
        <select
          value={currentPrice}
          onChange={(e) => updateFilter('price', e.target.value)}
          style={activeStyle(currentPrice)}
        >
          {PRICE_OPTIONS.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        {/* Divider */}
        <div style={{ width: '1px', height: '1.5rem', background: 'var(--border-card)', flexShrink: 0 }} />

        {/* Sort by */}
        <select
          value={currentSort}
          onChange={(e) => updateFilter('sort_by', e.target.value)}
          style={activeStyle(currentSort)}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
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