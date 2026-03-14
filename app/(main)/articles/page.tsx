'use client';

import ArticleListClient from '@/components/articles/ArticleListClient';
import { useLang } from '@/components/layout/LangProvider';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

export default function ArticlesPage() {
  const { t } = useLang();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16"
        style={{ background: 'var(--brand-primary)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <RevealOnScroll>
            <h1 className="text-4xl font-bold sm:text-5xl">{t.article.title}</h1>
            <p className="mt-4 text-lg max-w-xl mx-auto" style={{ opacity: 0.85 }}>
              {t.article.subtitle}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Article list */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <ArticleListClient />
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
