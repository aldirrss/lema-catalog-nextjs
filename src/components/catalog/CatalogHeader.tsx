'use client';

import { useLang } from '../layout/LangProvider';

export default function CatalogHeader({ total }: { total: number }) {
  const { t } = useLang();

  return (
    <>
      <h1 className="text-3xl font-bold">
        {t.catalog.title}
      </h1>
      <p className="mt-2">
        {total} {total === 1 ? t.catalog.module : t.catalog.modules} {t.catalog.modulesAvailable}
      </p>
    </>
  );
}
