'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLang } from '../layout/LangProvider';

// ─── Add more image paths here to add more slides ───
const SLIDES = [
  '/images/hero-bg.png',
  '/images/hero-bg-2.png',
  '/images/hero-bg-3.png',
];

const SLIDE_INTERVAL = 3000;

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = SLIDES.length;

  const { t } = useLang();

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % total);
        setAnimating(false);
      }, 3000);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [total]);
  
  const goTo = (index: number) => {
    if (index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 3000);
  };
  
  const next = () => goTo((current + 1) % total);
  const prev = () => goTo((current - 1 + total) % total);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>

      {/* ── Slides ── */}
      {SLIDES.map((src, i) => (
        <div key={src} style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: i === current ? (animating ? 0 : 1) : 0,
          transition: 'opacity 0.8s ease-in-out',
          zIndex: 0,
        }} />
      ))}

      {/* ── Dark overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(10,18,48,0.75) 0%, rgba(30,54,112,0.60) 50%, rgba(10,18,48,0.75) 100%)',
      }} />

      {/* ── Content ── */}
      <div style={{
        position: 'relative', zIndex: 2,
        margin: '0 auto', maxWidth: '52rem',
        textAlign: 'center', padding: '0 1.5rem', width: '100%',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          borderRadius: '9999px', backgroundColor: 'rgba(255,255,255,0.12)',
          padding: '0.375rem 1rem', fontSize: '0.875rem', fontWeight: 500,
          color: '#bfdbfe', marginBottom: '1.5rem', backdropFilter: 'blur(6px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ height: '0.5rem', width: '0.5rem', borderRadius: '9999px', backgroundColor: '#4ade80' }} />
          Trust your business system to us ❤️
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 800, color: 'white',
          letterSpacing: '-0.025em', lineHeight: 1.1,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}>
          {t.hero.title.split(' ').map((word, i) => (
            <span key={i} style={{ color: i % 2 === 0 ? 'white' : 'var(--brand-accent)' }}>
              {word}
            </span>
          ))}
        </h1>
        <p style={{ marginTop: '1rem', fontSize: '1.35rem', fontWeight: 800, color: 'var(--brand-accent)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
          {t.hero.subtitle}
        </p>
        <p style={{ marginTop: '1.5rem', fontSize: '1.125rem', color: 'var(--text-inverse)', lineHeight: 1.8, textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}>
          {t.hero.cta}
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          <Link href="/catalog" className="hero-btn-primary">Browse Catalog →</Link>
          <Link href="/contact" className="hero-btn-secondary">Talk to an Expert</Link>
        </div>

        {/* Stats */}
        <div style={{
          marginTop: '4rem',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem',
        }}>
          {[
            { value: '50+', label: 'Modules Published' },
            { value: '100+', label: 'Happy Clients' },
            { value: '5+', label: 'Years Experience' },
            { value: '4.8★', label: 'Average Rating' },
          ].map((stat) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              borderRadius: '0.75rem', padding: '1rem 0.5rem',
              border: '1px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(6px)',
            }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                {stat.value}
              </div>
              <div style={{ marginTop: '0.25rem', fontSize: '0.8125rem', color: '#93c5fd' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Prev / Next arrows (only show if >1 slide) ── */}
      {total > 1 && (
        <>
          <button onClick={prev} className="slide-arrow" style={{ left: '1.5rem' }} aria-label="Previous slide">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button onClick={next} className="slide-arrow" style={{ right: '1.5rem' }} aria-label="Next slide">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </>
      )}

      {/* ── Dot indicators (only show if >1 slide) ── */}
      {total > 1 && (
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)', zIndex: 3,
          display: 'flex', gap: '0.5rem', alignItems: 'center',
        }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === current ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '9999px',
                backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'width 0.3s, background-color 0.3s',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Scroll down indicator ── */}
      <div style={{
        position: 'absolute', bottom: '1.75rem', right: '2rem', zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
      }}>
        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>SCROLL</span>
        <div className="scroll-arrow">
          <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
        </div>
      </div>

      <style>{`
        .hero-btn-primary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background-color: white; color: #1e3670;
          border-radius: 0.5rem; padding: 0.75rem 2rem;
          font-size: 1rem; font-weight: 700; text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .hero-btn-primary:hover {
          background-color: #e8edf5;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }
        .hero-btn-primary:active { transform: translateY(0); }

        .hero-btn-secondary {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background-color: rgba(255,255,255,0.12); color: white;
          border: 2px solid rgba(255,255,255,0.75);
          border-radius: 0.5rem; padding: 0.75rem 2rem;
          font-size: 1rem; font-weight: 700; text-decoration: none;
          backdrop-filter: blur(6px);
          transition: background-color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
        }
        .hero-btn-secondary:hover {
          background-color: rgba(255,255,255,0.25);
          border-color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .hero-btn-secondary:active { transform: translateY(0); }

        .slide-arrow {
          position: absolute; top: 50%; transform: translateY(-50%);
          z-index: 3; background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.3);
          color: white; border-radius: 9999px;
          width: 2.75rem; height: 2.75rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; backdrop-filter: blur(6px);
          transition: background-color 0.2s, transform 0.2s;
        }
        .slide-arrow:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-50%) scale(1.1);
        }

        .scroll-arrow {
          animation: bounce 1.8s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        @media (max-width: 640px) {
          .slide-arrow { display: none; }
        }
      `}</style>
    </section>
  );
}