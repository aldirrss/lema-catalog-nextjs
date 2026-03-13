'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ModuleDetail, ModuleFeedback, DependModule } from '@/types';
import { useLang } from '../layout/LangProvider';

interface Props {
  mod: ModuleDetail;
  odooUrl: string;
}

const REVIEWS_PER_PAGE = 5;

// ─── Star Rating ──────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  size = 24,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readonly?: boolean;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          style={{
            cursor: readonly ? 'default' : 'pointer',
            fill: star <= (hovered || value) ? '#f59e0b' : 'var(--bg-surface)',
            stroke: '#f59e0b',
            strokeWidth: 1.5,
            transition: 'fill 0.1s',
          }}
          onMouseEnter={() => !readonly && setHovered(star)}
          onMouseLeave={() => !readonly && setHovered(0)}
          onClick={() => !readonly && onChange?.(star)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

// ─── Lightbox ────────────────────────────────────────────────
function Lightbox({
  images,
  current,
  onClose,
}: {
  images: { url: string; alt: string; caption?: string }[];
  current: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(current);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  const img = images[idx];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') {
        setIdx((i) => (i - 1 + images.length) % images.length);
      }
      if (event.key === 'ArrowRight') {
        setIdx((i) => (i + 1) % images.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        padding: '3.25rem 0.75rem 1.25rem',
        boxSizing: 'border-box',
      }}
    >
      <button
        className="lightbox-nav lightbox-nav-prev"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        style={{
          position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
          width: 44, height: 44, color: '#fff', fontSize: '1.25rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >‹</button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 'min(96vw, 1200px)',
          maxHeight: 'calc(100dvh - 180px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          src={img.url}
          alt={img.alt}
          width={1920}
          height={1080}
          unoptimized
          sizes="(max-width: 768px) 96vw, 80vw"
          style={{
            maxWidth: '100%',
            maxHeight: 'calc(100dvh - 220px)',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '0.5rem',
          }}
        />
      </div>

      {/* Caption + counter di bawah gambar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: 'center', marginTop: '1rem', padding: '0 2rem' }}
      >
        {img.caption && (
          <p style={{
            color: 'rgba(255,255,255,0.9)', fontSize: '0.9375rem',
            fontWeight: 500, margin: '0 0 0.375rem',
          }}>
            {img.caption}
          </p>
        )}
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', margin: 0 }}>
          {idx + 1} / {images.length}
        </p>
      </div>

      <button
        className="lightbox-nav lightbox-nav-next"
        onClick={(e) => { e.stopPropagation(); next(); }}
        style={{
          position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
          width: 44, height: 44, color: '#fff', fontSize: '1.25rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >›</button>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
          width: 36, height: 36, color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem',
        }}
      >✕</button>
      <style>{`
        @media (max-width: 640px) {
          .lightbox-nav {
            top: auto !important;
            bottom: 1rem;
            transform: none !important;
            width: 40px !important;
            height: 40px !important;
          }
          .lightbox-nav-prev {
            left: calc(50% - 52px) !important;
          }
          .lightbox-nav-next {
            right: calc(50% - 52px) !important;
          }
        }
      `}</style>
    </div>
  );
}

// ─── Review Card ─────────────────────────────────────────────
function ReviewCard({ fb }: { fb: ModuleFeedback }) {
  const initials = fb.author_name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const palette = ['#2e4f8e','#0891b2','#7c3aed','#b45309','#065f46','#9f1239','#1d4ed8','#0f766e'];
  const avatarColor = palette[
    fb.author_name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % palette.length
  ];

  const { lang } = useLang();

  return (
    <div className="card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem' }}>
      {/* Avatar */}
      <div style={{
        flexShrink: 0, width: 40, height: 40, borderRadius: '50%',
        backgroundColor: avatarColor, display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: '#fff', fontWeight: 700,
        fontSize: '0.875rem', userSelect: 'none',
      }}>
        {initials}
      </div>
      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)', margin: 0, fontSize: '0.9375rem' }}>
              {fb.author_name}
            </p>
            {fb.created_date && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.125rem' }}>
                {new Date(fb.created_date).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            )}
          </div>
          <StarRating value={fb.rating} readonly size={16} />
        </div>
        {fb.comment && (
          <p style={{ marginTop: '0.625rem', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65, marginBottom: 0 }}>
            {fb.comment}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Reviews List with Summary + Pagination ──────────────────
function ReviewsList({ feedbacks }: { feedbacks: ModuleFeedback[] }) {
  const [page, setPage] = useState(1);
  const { t } = useLang();

  if (feedbacks.length === 0) {
    return (
      <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.5rem' }}>
        {t.module.review.noReviews} {t.module.review.beFirst}
      </p>
    );
  }

  const totalPages = Math.ceil(feedbacks.length / REVIEWS_PER_PAGE);
  const start = (page - 1) * REVIEWS_PER_PAGE;
  const visible = feedbacks.slice(start, start + REVIEWS_PER_PAGE);
  const avgRating = feedbacks.reduce((acc, fb) => acc + fb.rating, 0) / feedbacks.length;
  const ratingDist = [5, 4, 3, 2, 1].map((star) => {
    const count = feedbacks.filter((fb) => fb.rating === star).length;
    return { star, count, pct: Math.round((count / feedbacks.length) * 100) };
  });

  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Rating summary card */}
      <div className="card" style={{
        padding: '1.25rem 1.5rem', marginBottom: '1.25rem',
        display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap',
      }}>
        {/* Big score */}
        <div style={{ textAlign: 'center', minWidth: 72 }}>
          <div style={{ fontSize: '2.75rem', fontWeight: 800, lineHeight: 1, color: 'var(--text-primary)' }}>
            {avgRating.toFixed(1)}
          </div>
          <StarRating value={Math.round(avgRating)} readonly size={16} />
          <p style={{ margin: '0.375rem 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {feedbacks.length} {feedbacks.length === 1 ? t.module.review.review : t.module.review.reviews}
          </p>
        </div>
        {/* Distribution bars */}
        <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {ratingDist.map(({ star, count, pct }) => (
            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem' }}>
              <span style={{ width: 10, color: 'var(--text-secondary)', textAlign: 'right', flexShrink: 0 }}>{star}</span>
              <svg style={{ flexShrink: 0, fill: '#f59e0b', width: 12, height: 12 }} viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <div style={{ flex: 1, height: 7, borderRadius: 9999, backgroundColor: 'var(--bg-surface)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${pct}%`, borderRadius: 9999, backgroundColor: '#f59e0b', transition: 'width 0.4s ease' }} />
              </div>
              <span style={{ width: 28, color: 'var(--text-muted)', fontSize: '0.75rem', flexShrink: 0 }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {visible.map((fb) => (
          <ReviewCard key={fb.id} fb={fb} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', gap: '0.5rem', flexWrap: 'wrap' }}>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
            {t.module.review.showing} {start + 1}–{Math.min(start + REVIEWS_PER_PAGE, feedbacks.length)} {t.module.review.of} {feedbacks.length} {t.module.review.reviews}
          </p>
          <div style={{ display: 'flex', gap: '0.375rem', alignItems: 'center' }}>
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={pgBtn(false, page === 1)}>‹</button>
            {buildPageNumbers(page, totalPages).map((item, idx) =>
              item === '...'
                ? <span key={`e${idx}`} style={{ padding: '0 0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>…</span>
                : <button key={item} onClick={() => setPage(item as number)} style={pgBtn(item === page, false)}>{item}</button>
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={pgBtn(false, page === totalPages)}>›</button>
          </div>
        </div>
      )}
    </div>
  );
}

function buildPageNumbers(current: number, total: number): (number | '...')[] {
  return Array.from({ length: total }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === total || Math.abs(p - current) <= 1)
    .reduce<(number | '...')[]>((acc, p, idx, arr) => {
      if (idx > 0 && typeof arr[idx - 1] === 'number' && (p as number) - (arr[idx - 1] as number) > 1) {
        acc.push('...');
      }
      acc.push(p);
      return acc;
    }, []);
}

function pgBtn(active: boolean, disabled: boolean): React.CSSProperties {
  return {
    minWidth: 32, height: 32, padding: '0 0.5rem',
    borderRadius: '0.375rem',
    border: active ? '1.5px solid var(--brand-primary)' : '1.5px solid var(--border-card)',
    background: active ? 'var(--brand-primary)' : 'var(--bg-card)',
    color: active ? '#fff' : disabled ? 'var(--text-muted)' : 'var(--text-primary)',
    fontWeight: active ? 700 : 500,
    fontSize: '0.875rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background 0.15s, color 0.15s, border-color 0.15s',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

// ─── FAQ Accordion ───────────────────────────────────────────
function FAQAccordion({ faqs }: { faqs: import('@/types').FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const { t } = useLang();
  if (faqs.length === 0) return <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.module.faq.noFaq}</p>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {faqs.map((faq) => (
        <div key={faq.id} className="card" style={{ overflow: 'hidden' }}>
          <button
            onClick={() => setOpen(open === faq.id ? null : faq.id)}
            style={{
              width: '100%', textAlign: 'left', padding: '1.125rem 1.25rem',
              background: 'transparent', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem' }}>{faq.question}</span>
            <span style={{
              flexShrink: 0, width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-surface)', borderRadius: '50%', fontSize: '0.75rem', color: 'var(--text-secondary)',
              transform: open === faq.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s',
            }}>▼</span>
          </button>
          {open === faq.id && (
            <div
              style={{ padding: '0 1.25rem 1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Depends Slider ──────────────────────────────────────────
function DependsSlider({ modules, odooUrl }: { modules: DependModule[]; odooUrl: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const VISIBLE = 3;
  const CARD_GAP = 16;
  const CARD_WIDTH = 200;

  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const amount = (CARD_WIDTH + CARD_GAP) * VISIBLE;
    trackRef.current.scrollBy({ left: dir === 'right' ? amount : -amount, behavior: 'smooth' });
  };

  if (modules.length === 0) return null;

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-card)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          {t.module.otherModules}
        </h2>
        {modules.length > VISIBLE && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => scroll('left')}
              aria-label="Scroll left"
              style={sliderBtnStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-primary)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--brand-primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-card)'; }}
            >‹</button>
            <button
              onClick={() => scroll('right')}
              aria-label="Scroll right"
              style={sliderBtnStyle}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--brand-primary)'; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--brand-primary)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-card)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-card)'; }}
            >›</button>
          </div>
        )}
      </div>

      {/* Scrollable track */}
      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          className="depends-track"
          style={{
            display: 'flex',
            gap: `${CARD_GAP}px`,
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '4px',
          }}
        >
          {modules.map((dep) => {
            const imgUrl = dep.cover_image_url
              ? (dep.cover_image_url.startsWith('http') ? dep.cover_image_url : `${odooUrl}${dep.cover_image_url}`)
              : null;

            return (
              <Link
                key={dep.id}
                href={`/modules/${dep.slug}`}
                style={{
                  flexShrink: 0,
                  width: `${CARD_WIDTH}px`,
                  scrollSnapAlign: 'start',
                  textDecoration: 'none',
                  display: 'block',
                  borderRadius: '0.875rem',
                  overflow: 'hidden',
                  border: '1.5px solid var(--border-card)',
                  background: 'var(--bg-card)',
                  transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = 'var(--shadow-card-hover)';
                  el.style.borderColor = 'var(--brand-primary)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '';
                  el.style.borderColor = 'var(--border-card)';
                }}
              >
                {/* Cover image */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  backgroundColor: 'var(--bg-surface)',
                  overflow: 'hidden',
                }}>
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={dep.name}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="200px"
                    />
                  ) : (
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'linear-gradient(135deg, var(--brand-primary) 0%, #7c3aed 100%)',
                    }}>
                      <span style={{ fontSize: '2rem' }}>📦</span>
                    </div>
                  )}
                </div>
                {/* Name */}
                <div style={{ padding: '0.625rem 0.75rem' }}>
                  <p style={{
                    margin: 0,
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.4,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {dep.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        {/* Hide scrollbar webkit */}
        <style>{`.depends-track::-webkit-scrollbar { display: none; }`}</style>
      </div>
    </div>
  );
}

const sliderBtnStyle: React.CSSProperties = {
  width: 36, height: 36,
  borderRadius: '50%',
  border: '1.5px solid var(--border-card)',
  background: 'var(--bg-card)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  fontSize: '1.125rem',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
  flexShrink: 0,
};

// ─── Main Component ──────────────────────────────────────────
export default function ModuleDetailClient({ mod, odooUrl }: Props) {
  const [mainTab, setMainTab] = useState<'description' | 'license'>('description');
  const [descTab, setDescTab] = useState<'overview' | 'features' | 'release_notes' | 'faq'>('overview');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const [fbRating, setFbRating] = useState(0);
  const [fbName, setFbName] = useState('');
  const [fbEmail, setFbEmail] = useState('');
  const [fbComment, setFbComment] = useState('');
  const [fbStatus, setFbStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [fbMsg, setFbMsg] = useState('');
  const [feedbacks, setFeedbacks] = useState<ModuleFeedback[]>(mod.feedbacks ?? []);

  const { t, lang } = useLang();

  const images = mod.screenshots.map((ss, i) => ({
    url: ss.image_url.startsWith('http') ? ss.image_url : `${odooUrl}${ss.image_url}`,
    alt: ss.caption || `Screenshot ${i + 1}`,
    caption: ss.caption || '',
  }));

  const coverUrl = mod.cover_image_url
    ? (mod.cover_image_url.startsWith('http') ? mod.cover_image_url : `${odooUrl}${mod.cover_image_url}`)
    : null;

  const handleFeedbackSubmit = async () => {
    if (!fbName.trim() || !fbComment.trim() || fbRating === 0) {
      setFbStatus('error');
      setFbMsg(t.module.review.errorFields);
      return;
    }
    setFbStatus('loading');
    try {
      const res = await fetch('/api/module-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module_id: mod.id, author_name: fbName, email: fbEmail, rating: fbRating, comment: fbComment }),
      });
      const data = await res.json();
      if (data.success) {
        setFbStatus('success');
        setFbMsg(t.module.review.success);
        setFeedbacks((prev) => [
          { id: Date.now(), author_name: fbName, rating: fbRating, comment: fbComment, created_date: new Date().toISOString() },
          ...prev,
        ]);
        setFbName(''); setFbEmail(''); setFbComment(''); setFbRating(0);
      } else {
        setFbStatus('error');
        setFbMsg(data.error ?? t.module.purchase.error);
      }
    } catch {
      setFbStatus('error');
      setFbMsg(t.module.purchase.error);
    }
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.625rem 1.25rem', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer',
    background: 'transparent', border: 'none',
    borderBottom: active ? '2.5px solid var(--brand-primary)' : '2.5px solid transparent',
    color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
    transition: 'color 0.15s, border-color 0.15s', whiteSpace: 'nowrap' as const,
  });

  const subTabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', fontWeight: 500, fontSize: '0.8125rem', cursor: 'pointer',
    background: active ? 'var(--brand-primary)' : 'var(--bg-surface)', border: 'none', borderRadius: '2rem',
    color: active ? '#fff' : 'var(--text-secondary)',
    transition: 'background 0.15s, color 0.15s', whiteSpace: 'nowrap' as const,
  });

  const formatDateLabel = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(lang === 'ar' ? 'ar-SA' : lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div>
      {/* ── Cover Image ─────────────────────────────────────── */}
      <div style={{
        position: 'relative', width: '100%', aspectRatio: '16/9', marginBottom: '1.5rem',
        borderRadius: '1rem', overflow: 'hidden', backgroundColor: 'var(--bg-surface)',
        boxShadow: 'var(--shadow-card-hover)',
      }}>
        {coverUrl ? (
          <>
            <Image src={coverUrl} alt={mod.name} fill priority style={{ objectFit: 'cover' }} sizes="100vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: '1.25rem', left: '1.5rem' }}>
              <h1 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.5)', margin: 0 }}>
                {mod.name}
              </h1>
            </div>
          </>
        ) : (
          /* Placeholder ketika tidak ada cover image */
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, var(--brand-primary) 0%, #7c3aed 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
          }}>
            <span style={{ fontSize: '4rem', opacity: 0.4 }}>📦</span>
            <h1 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.4)', margin: 0, textAlign: 'center', padding: '0 1.5rem' }}>
              {mod.name}
            </h1>
          </div>
        )}
      </div>

      {/* ── Short Description ────────────────────────────────── */}
      {mod.short_description && (
        <div style={{
          marginTop: coverUrl ? '1rem' : 0,
          marginBottom: '1.75rem',
          padding: '0.75rem 1rem',
          borderRadius: '0.75rem',
          background: 'var(--bg-surface)',
          borderLeft: '3px solid var(--brand-primary)',
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          lineHeight: 1.7,
        }}>
          {mod.short_description}
        </div>
      )}

      {/* ── Main Tabs ────────────────────────────────────────── */}
      <div style={{ borderBottom: '1px solid var(--border-card)', marginBottom: '1.5rem', display: 'flex', gap: 0, overflowX: 'auto' }}>
        <button style={tabStyle(mainTab === 'description')} onClick={() => setMainTab('description')}>📄 {t.module.description}</button>
        <button style={tabStyle(mainTab === 'license')} onClick={() => setMainTab('license')}>📋 {t.module.license}</button>
      </div>

      {/* ── License Tab ──────────────────────────────────────── */}
      {mainTab === 'license' && (
        <div className="card" style={{ padding: '2rem' }}>
          {mod.license ? (
            <>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', marginTop: 0 }}>{t.module.license}</h2>
              <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }} dangerouslySetInnerHTML={{ __html: mod.license }} />
            </>
          ) : (
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.module.noLicense}</p>
          )}
        </div>
      )}

      {/* ── Description Tab ──────────────────────────────────── */}
      {mainTab === 'description' && (
        <div>
          {/* Sub-tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button style={subTabStyle(descTab === 'overview')} onClick={() => setDescTab('overview')}>{t.module.overview}</button>
            <button style={subTabStyle(descTab === 'features')} onClick={() => setDescTab('features')}>
              {t.module.features} {mod.features.length > 0 && `(${mod.features.length})`}
            </button>
            <button style={subTabStyle(descTab === 'release_notes')} onClick={() => setDescTab('release_notes')}>
              {t.module.releaseNotes} {(mod.release_notes?.length ?? 0) > 0 && `(${mod.release_notes.length})`}
            </button>
            <button style={subTabStyle(descTab === 'faq')} onClick={() => setDescTab('faq')}>
              FAQ {(mod.faqs?.length ?? 0) > 0 && `(${mod.faqs.length})`}
            </button>
          </div>

          {/* Overview */}
          {descTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {mod.description && (
                <div className="card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', marginTop: 0 }}>{t.module.aboutModule}</h3>
                  <div style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9375rem' }} dangerouslySetInnerHTML={{ __html: mod.description }} />
                </div>
              )}
              {images.length > 0 && (
                <div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem', marginTop: 0 }}>{t.module.screenshots}</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {images.map((img, i) => (
                      <div
                        key={i}
                        className="card screenshot-card"
                        onClick={() => setLightbox(i)}
                        style={{
                          cursor: 'zoom-in',
                          overflow: 'hidden',
                          borderRadius: '0.875rem',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                          (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                          (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                        }}
                      >
                        {/* Image area */}
                        <div style={{ position: 'relative', aspectRatio: '16/9', backgroundColor: 'var(--bg-surface)', flexShrink: 0 }}>
                          <Image src={img.url} alt={img.alt} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                          {/* Hover overlay dengan zoom icon */}
                          <div
                            className="screenshot-overlay"
                            style={{
                              position: 'absolute', inset: 0,
                              background: 'rgba(0,0,0,0)',
                              transition: 'background 0.2s',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            <span
                              className="screenshot-zoom"
                              style={{
                                background: 'rgba(0,0,0,0.65)', color: '#fff',
                                borderRadius: '50%', width: 44, height: 44,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.125rem', opacity: 0, transition: 'opacity 0.2s',
                                backdropFilter: 'blur(4px)',
                              }}
                            >
                              🔍
                            </span>
                          </div>
                          {/* Nomor badge */}
                          <span style={{
                            position: 'absolute', top: '0.5rem', left: '0.5rem',
                            background: 'rgba(0,0,0,0.55)', color: '#fff',
                            borderRadius: '0.375rem', padding: '0.125rem 0.5rem',
                            fontSize: '0.75rem', fontWeight: 600,
                            backdropFilter: 'blur(4px)',
                          }}>
                            {i + 1}/{images.length}
                          </span>
                        </div>

                        {/* Caption area */}
                        <div style={{
                          padding: '0.75rem 1rem',
                          background: 'var(--bg-card)',
                          borderTop: '1px solid var(--border-card)',
                          minHeight: '2.75rem',
                          display: 'flex', alignItems: 'center',
                        }}>
                          {img.caption ? (
                            <p style={{
                              margin: 0, fontSize: '0.8125rem', color: 'var(--text-secondary)',
                              lineHeight: 1.5, fontStyle: 'italic',
                            }}>
                              {img.caption}
                            </p>
                          ) : (
                            <p style={{
                              margin: 0, fontSize: '0.8125rem',
                              color: 'var(--text-muted)', lineHeight: 1.5,
                            }}>
                              {t.module.screenshots} {i + 1}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Features */}
          {descTab === 'features' && (
            <div>
              {mod.features.length === 0 ? (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.module.noFeatures}</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                  {mod.features.map((feat) => (
                    <div key={feat.id} className="card" style={{ display: 'flex', gap: '0.75rem', padding: '1.25rem' }}>
                      <div style={{ flexShrink: 0, marginTop: '2px', height: '1.5rem', width: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9999px', backgroundColor: 'var(--brand-primary)' }}>
                        <svg style={{ height: '0.75rem', width: '0.75rem', color: '#fff' }} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem', margin: 0 }}>{feat.name}</p>
                        {feat.description && <p style={{ marginTop: '0.375rem', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Release Notes */}
          {descTab === 'release_notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(!mod.release_notes || mod.release_notes.length === 0) ? (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>{t.module.noReleaseNotes}</p>
              ) : (
                mod.release_notes.map((rn) => (
                  <div key={rn.id} className="card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--brand-primary)', color: '#fff', borderRadius: '0.375rem', padding: '0.2rem 0.6rem', fontSize: '0.8125rem', fontWeight: 700 }}>
                        v{rn.version}
                      </span>
                      {rn.release_date && (
                        <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                          {formatDateLabel(rn.release_date)}
                        </span>
                      )}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }} dangerouslySetInnerHTML={{ __html: rn.notes }} />
                  </div>
                ))
              )}
            </div>
          )}

          {/* FAQ */}
          {descTab === 'faq' && <FAQAccordion faqs={mod.faqs ?? []} />}
        </div>
      )}

      {/* ── Depends Modules Slider ───────────────────────────── */}
      {(mod.depends_modules?.length ?? 0) > 0 && (
        <DependsSlider modules={mod.depends_modules} odooUrl={odooUrl} />
      )}

      {/* ── Reviews & Feedback ───────────────────────────────── */}
      <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-card)' }}>
        <h2 style={{ fontSize: '1.375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.5rem', marginTop: 0 }}>
          ⭐ {t.module.review.title}
        </h2>

        {/* Riwayat reviewer — summary + paginated list */}
        <ReviewsList feedbacks={feedbacks} />

        {/* Form tambah review */}
        <div className="card" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', marginTop: 0 }}>
            {t.module.review.leaveReview}
          </h3>

          {fbStatus === 'success' ? (
            <div style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', color: '#16a34a', fontWeight: 500 }}>
              ✅ {fbMsg}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  {t.module.review.yourRating} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <StarRating value={fbRating} onChange={setFbRating} size={28} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                    {t.module.review.name} <span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input type="text" value={fbName} onChange={(e) => setFbName(e.target.value)} placeholder={t.module.review.name} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                    {t.module.review.emailOptional}
                  </label>
                  <input type="email" value={fbEmail} onChange={(e) => setFbEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.375rem' }}>
                  {t.module.review.comment} <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea value={fbComment} onChange={(e) => setFbComment(e.target.value)} placeholder={t.module.review.commentPlaceholder} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }} />
              </div>
              {fbStatus === 'error' && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', margin: 0 }}>⚠️ {fbMsg}</p>
              )}
              <div>
                <button onClick={handleFeedbackSubmit} disabled={fbStatus === 'loading'} className="btn-primary" style={{ opacity: fbStatus === 'loading' ? 0.7 : 1 }}>
                  {fbStatus === 'loading' ? t.module.review.submitting : t.module.review.submit}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && <Lightbox images={images} current={lightbox} onClose={() => setLightbox(null)} />}

      <style>{`
        .screenshot-card .screenshot-overlay:hover { background: rgba(0,0,0,0.25) !important; }
        .screenshot-card:hover .screenshot-overlay { background: rgba(0,0,0,0.25) !important; }
        .screenshot-card:hover .screenshot-zoom { opacity: 1 !important; }
      `}</style>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.625rem 0.875rem', borderRadius: '0.5rem',
  border: '1.5px solid var(--border-card)', background: 'var(--bg-page)',
  color: 'var(--text-primary)', fontSize: '0.9375rem', outline: 'none',
  boxSizing: 'border-box', fontFamily: 'inherit',
};
