'use client';

import Link from 'next/link';
import TeamAvatar from '@/components/about/TeamAvatar';
import CTASection from '@/components/home/CTASection';
import AboutStats from '@/components/about/AboutStats';
import { useLang } from '@/components/layout/LangProvider';
import type { TeamMember } from '@/components/about/TeamAvatar';

const LinkedInIcon = () => (
  <svg className="w-5 h-5 text-[#0077b5]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5 text-[#e4405f]" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function AboutPage() {
  const { t } = useLang();

  const SERVICES = [
    { icon: '⚙️', title: t.services.items.development.title, desc: t.services.items.development.description },
    { icon: '🎨', title: t.services.items.customization.title, desc: t.services.items.customization.description },
    { icon: '🔗', title: t.services.items.integration.title, desc: t.services.items.integration.description },
    { icon: '🚀', title: t.services.items.implementation.title, desc: t.services.items.implementation.description },
  ];

  // Consolidate team to 1 member (flexible grid for future additions)
  const TEAM: TeamMember[] = [
    { 
      name: 'Aldi',  
      role: 'Odoo Software Developer',
      photo: '/images/team/al.png', 
      initials: 'AL',
      expertise: ['Odoo Backend', 'System Architecture', 'API Integration'],
      linkedin: 'https://linkedin.com/in/aldirosidsaputra',
      instagram: 'https://instagram.com/aldirrss',
      portfolio: 'https://aldi.lemacore.com',
      contact: 'mailto:aldirosidsaputra@gmail.com',
      projects: '15+'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 text-white" style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)' }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl tracking-tight">{t.about.title}</h1>
          <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-title">{t.about.ourMission}</h2>
              <div className="space-y-6 mt-8">
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.about.missionDescription1}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.about.missionDescription2}
                </p>
                <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {t.about.missionDescription3}
                </p>
              </div>
              <div className="mt-10">
                <Link href="/contact" className="btn-primary px-8 py-3 text-lg">{t.about.workWithUs}</Link>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-surface-2 rounded-3xl p-8 lg:p-12 shadow-sm border" style={{ borderColor: 'var(--border-card)' }}>
              <AboutStats />
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: 'var(--bg-surface)' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title">{t.about.meetTeam}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--text-secondary)' }}>
              Working as a specialized freelance developer while building a vision for the future of ERP solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center">
            {TEAM.map((member) => (
              <div key={member.name} className="card overflow-hidden group hover:border-brand-500 transition-all duration-300 mx-auto w-full max-w-md sm:col-span-1 lg:col-start-2 lg:col-span-1 xl:col-start-2 xl:col-span-2">
                <div className="p-8">
                  <TeamAvatar member={member} />
                  
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium mt-1 text-brand-600">
                      {member.role}
                    </p>
                    
                    {/* Expertise */}
                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                      {member.expertise?.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-surface-2 border rounded-full text-[10px] font-bold uppercase tracking-wider" 
                          style={{ borderColor: 'var(--border-card)', color: 'var(--text-secondary)' }}>
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-4" style={{ borderColor: 'var(--border-card)' }}>
                      <div>
                        <div className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{member.projects}</div>
                        <div className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">{t.about.happyClients}</div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        {member.linkedin && (
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface-2 hover:bg-brand-50 transition-colors border" title="LinkedIn" style={{ borderColor: 'var(--border-card)' }}>
                            <LinkedInIcon />
                          </a>
                        )}
                        {member.instagram && (
                          <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-surface-2 hover:bg-rose-50 transition-colors border" title="Instagram" style={{ borderColor: 'var(--border-card)' }}>
                            <InstagramIcon />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* New Buttons: Portfolio & Contact */}
                    <div className="mt-6 grid grid-cols-1 gap-3">
                      {member.portfolio && (
                        <a href={member.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 bg-brand-600 text-white rounded-xl font-bold text-sm hover:bg-brand-700 transition-colors shadow-sm">
                          <ExternalIcon />
                          View Portfolio
                        </a>
                      )}
                      {member.contact && (
                        <Link href={member.contact} className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-2 border text-primary rounded-xl font-bold text-sm hover:bg-surface-3 transition-colors" style={{ borderColor: 'var(--border-card)' }}>
                          Contact Me
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">{t.about.whatWeDo}</h2>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="card p-8 text-center hover:bg-surface-2 transition-colors">
                <div className="mb-6 text-5xl">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
