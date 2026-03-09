import type { Metadata } from 'next';
import Link from 'next/link';
import TeamAvatar from '@/components/about/TeamAvatar';
import CTASection from '@/components/home/CTASection';
import AboutStats from '@/components/about/AboutStats';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Lema Core Technologies — your trusted Odoo development partner in Indonesia.',
};

const SERVICES = [
  { icon: '⚙️', title: 'Odoo Development', desc: 'Custom modules and addons built to fit your business.' },
  { icon: '🎨', title: 'Odoo Customization', desc: 'Tailoring existing Odoo features to match your workflows.' },
  { icon: '🔗', title: 'Odoo Integration', desc: 'Connecting Odoo to your ecosystem of tools.' },
  { icon: '🚀', title: 'ERP Implementation', desc: 'Full-cycle Odoo deployments with training and support.' },
];

const TEAM = [
  { name: 'Aldi',  role: 'Odoo Software Engineer', photo: '/images/team/team-1.jpg', initials: 'AL' },
  { name: 'Herul', role: 'Odoo Software Engineer', photo: '/images/team/team-2.jpg', initials: 'HR' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 text-white" style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)', color: 'var(--text-inverse)' }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold sm:text-5xl">About Lema Core Technologies</h1>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
            We are a technology company specializing in Odoo ERP solutions for Indonesian and global businesses.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="mt-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Lema Core Technologies was founded with a clear mission: to make powerful ERP technology
                accessible and practical for businesses of all sizes in Indonesia and beyond.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We believe that Odoo, when properly implemented and customized, can transform how businesses
                operate. Our team of certified Odoo developers brings years of hands-on experience across
                industries including retail, manufacturing, logistics, and professional services.
              </p>
              <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Every module we publish in this catalog is the result of real client feedback and battle-tested
                in production environments — so you can deploy with confidence.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">Work With Us</Link>
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
          <h2 className="section-title text-center">What We Do</h2>
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
          <h2 className="section-title text-center">Our Team</h2>
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