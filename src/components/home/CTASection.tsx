'use client';

import Link from 'next/link';
import { useLang } from '../layout/LangProvider';

export default function CTASection() {
  const { t } = useLang();

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--brand-primary)' }}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl"
          style={{ color: 'var(--text-inverse)' }}>
          {t.cta.title}
        </h2>
        <p className="mt-4 text-lg text-muted"
          style={{ color: 'var(--text-inverse)' }}>
          {t.cta.subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link href="/catalog" className="btn-primary-brand px-8 py-3 text-base">
            {t.cta.buttonExplore}
          </Link>

          {/* link to mailto contact with prefilled subject and body */}
          <Link href="mailto:aldirrss@icloud.com?subject=Inquiry%20about%20Odoo%20Solution" className="btn-outline px-8 py-3 text-base"
            style={{ borderColor: 'var(--text-inverse)', color: 'var(--text-inverse)' }}>
            {t.cta.buttonContact}
          </Link>

        </div>
      </div>
    </section>
  );
}
