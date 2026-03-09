'use client';

import ForumDiscussClient from '@/components/discuss/ForumDiscussClient';
import { useLang } from '@/components/layout/LangProvider';

export default function ForumPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16"
        style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">{t.forum.title}</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            {t.forum.subtitle}
          </p>
        </div>
      </section>

      {/* Forum */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ForumDiscussClient />
        </div>
      </section>
    </div>
  );
}
