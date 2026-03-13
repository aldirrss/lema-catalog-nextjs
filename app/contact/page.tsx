'use client';

import ContactForm from '@/components/contact/ContactForm';
import { useLang } from '@/components/layout/LangProvider';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

export default function ContactPage() {
  const { t } = useLang();

  const contactInfo = [
    {
      icon: '📧',
      label: t.contact.email,
      value: 'lemacoreofficial@gmail.com',
      href: 'mailto:lemacoreofficial@gmail.com',
    },
    {
      icon: '💬',
      label: t.contact.whatsapp,
      value: '+62 815-2976-3081',
      href: 'https://wa.me/6281529763081',
    },
    {
      icon: '📍',
      label: t.contact.location,
      value: t.contact.locationValue,
      href: null,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-16 text-white" style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)' }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h1 className="text-4xl font-bold sm:text-5xl">{t.contact.title}</h1>
            <p className="mt-3 text-lg">{t.contact.subtitle}</p>
          </RevealOnScroll>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <RevealOnScroll>
              <div>
              <h2 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{t.contact.getInTouch}</h2>
              <p className="mt-3" style={{ color: 'var(--text-muted)' }}>
                {t.contact.getInTouchDesc}
              </p>
              </div>
            </RevealOnScroll>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <RevealOnScroll key={item.label} delay={index * 0.06}>
                  <div className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-brand-600 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={0.2}>
              <div className="rounded-xl bg-brand-50 p-5 border border-brand-100">
              <p className="text-sm font-semibold text-brand-700">⏱ {t.contact.responseTime}</p>
              <p className="mt-1 text-sm text-brand-600">
                {t.contact.responseTimeDesc}
              </p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <RevealOnScroll delay={0.1}>
              <div className="card p-8">
              <h2 className="text-xl font-semibold mb-6">{t.contact.sendMessage}</h2>
              <ContactForm />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </div>
  );
}
