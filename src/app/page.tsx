import type { Metadata } from 'next';
import Link from 'next/link';
import { getFeaturedModules, getModules } from '@/lib/odoo';
import ModuleCard from '@/components/catalog/ModuleCard';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import CTASection from '@/components/home/CTASection';
import HomeSectionHeader from '@/components/home/HomeSectionHeader';
import SeeAllModulesButton from '@/components/home/SeeAllModulesButton';

export const metadata: Metadata = {
  title: 'Lema Core Technologies — Odoo Development Experts',
};

export default async function HomePage() {
  // Fetch in parallel
  const [featuredModules, latestData] = await Promise.all([
    getFeaturedModules(3).catch(() => []),
    getModules({ page: 1 }).catch(() => ({ data: [], meta: { total: 0, page: 1, limit: 12, pages: 0 } })),
  ]);

  const latestModules = latestData.data.slice(0, 6);

  return (
    <>
      <HeroSection />

      {/* Featured Modules */}
      {featuredModules.length > 0 && (
        <section className="py-20" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-page)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HomeSectionHeader type="featured" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
              {featuredModules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Modules */}
      {latestModules.length > 0 && (
        <section className="bg-surface py-20" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-surface)' }}>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <HomeSectionHeader type="latest" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2">
              {latestModules.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>
            <SeeAllModulesButton />
          </div>
        </section>
      )}

      <ServicesSection />
      <CTASection />
    </>
  );
}
