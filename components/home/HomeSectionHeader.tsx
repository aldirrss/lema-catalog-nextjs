'use client';

import Link from 'next/link';
import { useLang } from '../layout/LangProvider';
import RevealOnScroll from '@/components/motion/RevealOnScroll';

type HomeSectionHeaderProps = {
  type: 'featured' | 'latest';
};

export default function HomeSectionHeader({ type }: HomeSectionHeaderProps) {
  const { t } = useLang();

  const config = {
    featured: {
      title: t.home.featuredModules,
      subtitle: t.home.featuredSubtitle,
      link: '/catalog?featured=1',
      linkText: t.home.viewAll,
    },
    latest: {
      title: t.home.latestModules,
      subtitle: t.home.latestSubtitle,
      link: '/catalog',
      linkText: t.home.browseAll,
    },
  };

  const { title, subtitle, link, linkText } = config[type];

  return (
    <RevealOnScroll className="flex items-end justify-between">
      <div>
        <h2 className="section-title">{title}</h2>
        <p className="section-subtitle">{subtitle}</p>
      </div>
      <Link href={link} className="hidden text-sm font-medium hover:text-brand-700 sm:block"
        style={{ color: 'var(--text-primary)' }}>
        {linkText}
      </Link>
    </RevealOnScroll>
  );
}
