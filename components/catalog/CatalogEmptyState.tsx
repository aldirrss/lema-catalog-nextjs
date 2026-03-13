'use client';

import { useLang } from '../layout/LangProvider';

export default function CatalogEmptyState() {
  const { t } = useLang();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="text-5xl">🔍</div>
      <h3 className="mt-4 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
        {t.catalog.noModulesFound}
      </h3>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        {t.catalog.noModulesDesc}
      </p>
    </div>
  );
}
