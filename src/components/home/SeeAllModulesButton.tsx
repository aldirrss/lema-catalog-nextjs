'use client';

import Link from 'next/link';
import { useLang } from '../layout/LangProvider';

export default function SeeAllModulesButton() {
  const { t } = useLang();

  return (
    <div className="mt-10 text-center">
      <Link href="/catalog" className="btn-outline" style={{ color: 'var(--text-primary)' }}>
        {t.home.seeAllModules}
      </Link>
    </div>
  );
}
