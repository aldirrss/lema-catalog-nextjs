'use client';

import { useState, useEffect } from 'react';
import { useLang } from '../layout/LangProvider';

export default function AboutStats() {
  const [averageRating, setAverageRating] = useState(0);
  const [publishedModulesCount, setPublishedModulesCount] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/average-rating');
        const data = await res.json();
        setAverageRating(data.average_rating ?? 0);
        setPublishedModulesCount(data.total_modules ?? 0);
      } catch {
        // silent fallback
      }
    }
    fetchStats();
  }, []);

  const stats = [
    { value: `${publishedModulesCount}+`, label: t.about.modulesPublished },
    { value: '10+',                        label: t.about.happyClients },
    { value: '5+',                         label: t.about.yearsExp },
    { value: `${averageRating.toFixed(1)}★`, label: t.about.avgRating },
  ];

  return (
    <div className="grid grid-cols-2 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl bg-surface-2 p-6 text-center">
          <div className="text-3xl font-bold text-brand-600">{s.value}</div>
          <div className="mt-1 text-sm font-medium text-gray-600">{s.label}</div>
        </div>
      ))}
    </div>
  );
}