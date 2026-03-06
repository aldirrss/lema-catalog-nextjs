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
      params.delete('page'); // reset pagination on filter change
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
        <input
          type="search"
          placeholder="Search modules..."
          defaultValue={currentSearch}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-9 pr-3 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
        />
      </div>

      {/* Category filter */}
      <select
        value={currentCategory}
        onChange={(e) => updateFilter('category_id', e.target.value)}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
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
        className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
      >
        <option value="">All Versions</option>
        {ODOO_VERSIONS.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
    </div>
  );
}
