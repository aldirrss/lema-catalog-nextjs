'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useLang } from '../layout/LangProvider';

const HERO_VIDEO = '/videos/veo3.mp4';
const HERO_POSTER = '/images/hero-bg.png';

const enterText = { opacity: 0, y: 26 };
const showText = { opacity: 1, y: 0 };
const textTransition = (delay: number) => ({
  duration: 0.6,
  delay,
  ease: [0.22, 1, 0.36, 1] as const,
});

export default function HeroSection() {
  const [averageRating, setAverageRating] = useState(0);
  const [publishedModulesCount, setPublishedModulesCount] = useState(0);
  const { t } = useLang();

  useEffect(() => {
    async function fetchAverageRating() {
      try {
        const response = await fetch('/api/average-rating');
        const data = await response.json();
        setAverageRating(data.average_rating || 0);
        setPublishedModulesCount(data.total_modules || 0);
      } catch (error) {
        console.error('Error fetching average rating:', error);
      }
    }
    fetchAverageRating();
  }, []);

  const stats = useMemo(
    () => [
      { value: `${publishedModulesCount || 0}+`, label: t.hero.published },
      { value: '10+', label: t.hero.clients },
      { value: '5+', label: t.hero.experience },
      { value: `${(averageRating || 0).toFixed(1)} ★`, label: t.hero.avgRating },
    ],
    [averageRating, publishedModulesCount, t.hero],
  );

  return (
    <section
      aria-label="Lema Core Technologies Hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        poster={HERO_POSTER}
        preload="metadata"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(circle at 18% 20%, rgba(79,123,232,0.32), transparent 40%), radial-gradient(circle at 80% 75%, rgba(30,54,112,0.45), transparent 45%), linear-gradient(110deg, rgba(10,18,48,0.82), rgba(10,18,48,0.65))',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.3), transparent)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 3, width: '100%' }}>
        <div style={{ maxWidth: '56rem' }}>
          <motion.div
            initial={enterText}
            animate={showText}
            transition={textTransition(0.05)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              borderRadius: '9999px',
              padding: '0.4rem 1rem',
              marginBottom: '1.1rem',
              border: '1px solid rgba(255,255,255,0.24)',
              backgroundColor: 'rgba(7,18,44,0.45)',
              color: '#cfe0ff',
              fontSize: '0.85rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: '0.45rem',
                height: '0.45rem',
                borderRadius: '50%',
                backgroundColor: 'var(--brand-accent)',
                boxShadow: '0 0 16px var(--brand-accent)',
              }}
            />
            {t.hero.trustBadge}
          </motion.div>

          <motion.h1
            initial={enterText}
            animate={showText}
            transition={textTransition(0.15)}
            style={{
              margin: 0,
              fontSize: 'clamp(2.1rem, 5vw, 4.1rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              fontWeight: 800,
              color: '#fff',
            }}
          >
            Lema Core Technologies
          </motion.h1>

          <motion.p
            initial={enterText}
            animate={showText}
            transition={textTransition(0.22)}
            style={{
              marginTop: '0.55rem',
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: 'var(--brand-accent)',
              fontWeight: 700,
            }}
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.p
            initial={enterText}
            animate={showText}
            transition={textTransition(0.28)}
            style={{
              marginTop: '1rem',
              maxWidth: '46rem',
              color: 'rgba(236,244,255,0.92)',
              fontSize: '1.05rem',
              lineHeight: 1.75,
            }}
          >
            {t.hero.cta}
          </motion.p>

          <motion.div
            initial={enterText}
            animate={showText}
            transition={textTransition(0.34)}
            style={{
              marginTop: '1.8rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.85rem',
            }}
          >
            <Link href="/catalog" className="hero-btn-primary" aria-label={t.hero.buttonBrowse}>
              {t.hero.buttonBrowse} →
            </Link>
            <Link href="/contact" className="hero-btn-secondary" aria-label={t.hero.buttonContact}>
              {t.hero.buttonContact}
            </Link>
          </motion.div>

          <motion.div
            initial={enterText}
            animate={showText}
            transition={textTransition(0.4)}
            className="hero-stats-grid"
            style={{ marginTop: '1.9rem' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="hero-stat-card">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '1.35rem',
          zIndex: 4,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.08em',
          fontSize: '0.72rem',
        }}
      >
        SCROLL
      </div>

      <style>{`
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-width: 12rem;
          border-radius: 0.72rem;
          padding: 0.78rem 1.3rem;
          font-weight: 700;
          text-decoration: none;
          color: #ffffff;
          background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
          box-shadow: 0 10px 30px rgba(30, 54, 112, 0.45);
          transition: transform .2s ease, box-shadow .2s ease;
        }
        .hero-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 34px rgba(30, 54, 112, 0.56);
        }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 12rem;
          border-radius: 0.72rem;
          padding: 0.75rem 1.3rem;
          text-decoration: none;
          font-weight: 700;
          color: #ecf4ff;
          border: 1px solid rgba(236, 244, 255, 0.55);
          background: rgba(236, 244, 255, 0.08);
          backdrop-filter: blur(8px);
          transition: all .2s ease;
        }
        .hero-btn-secondary:hover {
          transform: translateY(-2px);
          border-color: rgba(236, 244, 255, 0.85);
          background: rgba(236, 244, 255, 0.16);
        }
        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }
        .hero-stat-card {
          border: 1px solid rgba(255,255,255,0.22);
          background: linear-gradient(145deg, rgba(14,31,71,0.58), rgba(10,18,48,0.4));
          border-radius: 0.85rem;
          padding: 0.85rem 0.7rem;
          backdrop-filter: blur(8px);
        }
        .hero-stat-value {
          color: #ffffff;
          font-weight: 700;
          font-size: 1.25rem;
        }
        .hero-stat-label {
          margin-top: 0.2rem;
          color: #c1d5ff;
          font-size: 0.8rem;
        }
        @media (min-width: 768px) {
          .hero-stats-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
      `}</style>
    </section>
  );
}
