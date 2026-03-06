import type { Metadata } from 'next';
import Link from 'next/link';
import TeamAvatar from '@/components/about/TeamAvatar';

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
  { name: 'Aldi',   role: 'Odoo Software Engineer', photo: '/images/team/team-1.jpg',   initials: 'AL' },
  { name: 'Herul',  role: 'Odoo Software Engineer',    photo: '/images/team/team-2.jpg',  initials: 'HR' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 to-brand-600 py-20 text-white">
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
              <p className="mt-6 text-gray-600 leading-relaxed">
                Lema Core Technologies was founded with a clear mission: to make powerful ERP technology
                accessible and practical for businesses of all sizes in Indonesia and beyond.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We believe that Odoo, when properly implemented and customized, can transform how businesses
                operate. Our team of certified Odoo developers brings years of hands-on experience across
                industries including retail, manufacturing, logistics, and professional services.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Every module we publish in this catalog is the result of real client feedback and battle-tested
                in production environments — so you can deploy with confidence.
              </p>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">Work With Us</Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '5+',   label: 'Years of Experience' },
                { value: '100+', label: 'Happy Clients' },
                { value: '50+',  label: 'Modules Published' },
                { value: '4.8★', label: 'Average Rating' },
              ].map((s) => (
                <div key={s.label} className="rounded-xl bg-surface-2 p-6 text-center">
                  <div className="text-3xl font-bold text-brand-600">{s.value}</div>
                  <div className="mt-1 text-sm font-medium text-gray-600">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gradient-to-br from-brand-50 to-brand-100 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">What We Do</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.title} className="card p-6 text-center">
                <div className="mb-4 text-4xl">{s.icon}</div>
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
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
                  <h3 className="mt-4 font-semibold text-gray-900 text-sm">{member.name}</h3>
                  <p className="mt-1 text-xs text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-3 text-blue-200">Explore our module catalog or reach out to our team.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/catalog" className="btn-primary bg-white text-brand-700 hover:bg-white-50">Browse Catalog</Link>
            <Link href="/contact" className="btn-primary bg-white text-brand-700 hover:bg-white-50">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}