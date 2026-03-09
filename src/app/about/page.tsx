'use client';

import Link from 'next/link';
import TeamAvatar from '@/components/about/TeamAvatar';
import CTASection from '@/components/home/CTASection';
import AboutStats from '@/components/about/AboutStats';
import { useLang } from '@/components/layout/LangProvider';

export default function AboutPage() {
  const { t } = useLang();

  const SERVICES = [
    { icon: '⚙️', title: t.services.items.development.title, desc: t.services.items.development.description },
    { icon: '🎨', title: t.services.items.customization.title, desc: t.services.items.customization.description },
    { icon: '🔗', title: t.services.items.integration.title, desc: t.services.items.integration.description },
    { icon: '🚀', title: t.services.items.implementation.title, desc: t.services.items.implementation.description },
  ];

  const TEAM = [
    { name: 'Aldi',  role: t.about.team.aldi.role, photo: '/images/team/team-1.jpg', initials: 'AL' },
    { name: 'Herul', role: t.about.team.herul.role, photo: '/images/team/team-2.jpg', initials: 'HR' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)' }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">{t.about.title}</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-title">{t.about.ourMission}</h2>
              <p className="mt-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.about.missionDescription1}
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.about.missionDescription2}
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {t.about.missionDescription3}
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">{t.about.workWithUs}</Link>
              </div>
            </div>

            {/* Stats — Client Component (fetch average rating) */}
            <AboutStats />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20" style={{ background: 'var(--bg-surface)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">{t.about.whatWeDo}</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="card p-6 text-center">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">{t.about.meetTeam}</h2>
          <div className="mt-12 flex justify-center">
            <div className="grid grid-cols-2 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="card p-6 text-center">
                  <TeamAvatar member={member} />
                  <h3 className="mt-4 font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
