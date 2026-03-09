'use client';

import { useLang } from '../layout/LangProvider';

export default function ServicesSection() {
  const { t } = useLang();

  const SERVICES = [
    {
      icon: '⚙️',
      title: t.services.items.development.title,
      description: t.services.items.development.description,
    },
    {
      icon: '🎨',
      title: t.services.items.customization.title,
      description: t.services.items.customization.description,
    },
    {
      icon: '🔗',
      title: t.services.items.integration.title,
      description: t.services.items.integration.description,
    },
    {
      icon: '🚀',
      title: t.services.items.implementation.title,
      description: t.services.items.implementation.description,
    },
  ];

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-subtitle mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-6 shadow-card border hover:shadow-card-hover transition-shadow"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="mb-4 text-3xl">{service.icon}</div>
              <h3 className="font-semibold"
                style={{ color: 'var(--text-primary)' }}>
                {service.title}
                </h3>
              <p className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
