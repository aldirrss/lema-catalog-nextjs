'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArticleSummary, ArticleViewMode } from '@/types/article';
import { useLang } from '@/components/layout/LangProvider';

const ease = [0.22, 1, 0.36, 1] as const;

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days < 1) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

// ── Card View ─────────────────────────────────────────────────────────────────

function ArticleCard({ article, index, onNavigate }: { article: ArticleSummary; index: number; onNavigate: (slug: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, delay: index * 0.055, ease } }}
      whileHover={{ y: -3, transition: { duration: 0.18, ease } }}
      onClick={() => onNavigate(article.slug)}
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { duration: 0.3, delay: index * 0.055 + 0.1, ease } }}
          style={{ fontSize: '1.5rem', lineHeight: 1, flexShrink: 0 }}
        >
          {article.icon || '📄'}
        </motion.span>
        <h3 style={{
          fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)',
          lineHeight: '1.4', margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.name}
        </h3>
      </div>

      {article.body_preview && (
        <p style={{
          fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: '1.55',
          margin: '0 0 1rem 0',
          display: '-webkit-box', WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {article.body_preview}
        </p>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {article.parent_name && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 500,
              padding: '0.2rem 0.5rem', borderRadius: '9999px',
              backgroundColor: 'var(--bg-surface)', color: 'var(--brand-primary)',
              border: '1px solid var(--border-card)',
            }}>
              {article.parent_name}
            </span>
          )}
          {article.child_count > 0 && (
            <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
              {article.child_count}
            </span>
          )}
        </div>
        {article.write_date && (
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)' }}>
            {timeAgo(article.write_date)}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── List Row ──────────────────────────────────────────────────────────────────

function ArticleRow({ article, index, onNavigate }: { article: ArticleSummary; index: number; onNavigate: (slug: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -18, filter: 'blur(4px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.35, delay: index * 0.05, ease } }}
      whileHover={{ x: 4, transition: { duration: 0.15, ease } }}
      onClick={() => onNavigate(article.slug)}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: '0.625rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s, background-color 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)';
        (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-card)';
      }}
    >
      <span style={{ fontSize: '1.25rem', flexShrink: 0, width: '2rem', textAlign: 'center' }}>
        {article.icon || '📄'}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
            {article.name}
          </span>
          {article.parent_name && (
            <span style={{
              fontSize: '0.6875rem', fontWeight: 500, flexShrink: 0,
              padding: '0.15rem 0.5rem', borderRadius: '9999px',
              backgroundColor: 'var(--bg-surface)', color: 'var(--brand-primary)',
              border: '1px solid var(--border-card)',
            }}>
              {article.parent_name}
            </span>
          )}
        </div>
        {article.body_preview && (
          <p style={{
            fontSize: '0.8125rem', color: 'var(--text-secondary)',
            margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {article.body_preview}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', flexShrink: 0 }}>
        {article.write_date && (
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
            {timeAgo(article.write_date)}
          </span>
        )}
        {article.child_count > 0 && (
          <span style={{ fontSize: '0.6875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            {article.child_count}
          </span>
        )}
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: 'var(--text-muted)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </motion.div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ view }: { view: ArticleViewMode }) {
  if (view === 'card') {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} style={{
            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)',
            borderRadius: '0.75rem', padding: '1.25rem', height: '160px',
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ width: '2rem', height: '2rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-surface)', animation: `pulse 1.5s ${i * 0.1}s infinite` }} />
              <div style={{ flex: 1, height: '1rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-surface)', animation: `pulse 1.5s ${i * 0.1}s infinite` }} />
            </div>
            <div style={{ height: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-surface)', marginBottom: '0.5rem', animation: `pulse 1.5s ${i * 0.1}s infinite` }} />
            <div style={{ height: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-surface)', width: '70%', animation: `pulse 1.5s ${i * 0.1}s infinite` }} />
          </div>
        ))}
      </motion.div>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{
          backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)',
          borderRadius: '0.625rem', padding: '1rem 1.25rem', height: '64px',
          display: 'flex', alignItems: 'center', gap: '1rem',
        }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', animation: `pulse 1.5s ${i * 0.08}s infinite`, flexShrink: 0 }} />
          <div style={{ flex: 1, height: '0.875rem', borderRadius: '0.375rem', backgroundColor: 'var(--bg-surface)', animation: `pulse 1.5s ${i * 0.08}s infinite` }} />
        </div>
      ))}
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ArticleListClient() {
  const { t } = useLang();
  const router = useRouter();
  const [view, setView] = useState<ArticleViewMode>('list');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async (q: string, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '12' });
      if (q) params.set('search', q);
      const res = await fetch(`/api/articles?${params}`);
      const data = await res.json();
      if (data.success) {
        setArticles(data.data);
        setMeta(data.meta);
      } else {
        setError(data.error || t.common.error);
      }
    } catch {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => { fetchArticles(search); }, [search, fetchArticles]);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Navigate to article detail in same tab (it's a standalone route via [slug])
  const handleNavigate = useCallback((slug: string) => {
    router.push(`/articles/${slug}`);
  }, [router]);

  const handlePage = (p: number) => fetchArticles(search, p);

  return (
    <div>
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease } }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
      >
        {/* Search */}
        <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder={t.article.searchPlaceholder}
            style={{
              width: '100%', boxSizing: 'border-box',
              padding: '0.5rem 0.75rem 0.5rem 2.25rem',
              borderRadius: '0.5rem', fontSize: '0.875rem',
              border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)',
              outline: 'none', transition: 'border-color 0.15s',
            }}
            onFocus={e => e.target.style.borderColor = 'var(--brand-primary)'}
            onBlur={e => e.target.style.borderColor = 'var(--border-card)'}
          />
        </div>

        {/* View toggle */}
        <div style={{ display: 'flex', gap: '0.25rem', backgroundColor: 'var(--bg-surface)', borderRadius: '0.5rem', padding: '0.25rem' }}>
          {(['card', 'list'] as ArticleViewMode[]).map(v => (
            <motion.button
              key={v}
              onClick={() => setView(v)}
              title={v === 'card' ? t.article.cardView : t.article.listView}
              whileTap={{ scale: 0.9 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '2rem', height: '2rem', borderRadius: '0.375rem',
                border: 'none', cursor: 'pointer', transition: 'all 0.15s',
                backgroundColor: view === v ? 'var(--bg-card)' : 'transparent',
                color: view === v ? 'var(--brand-primary)' : 'var(--text-muted)',
                boxShadow: view === v ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {v === 'card'
                ? <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
                : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
              }
            </motion.button>
          ))}
        </div>

        {/* Count */}
        <AnimatePresence mode="wait">
          {!loading && (
            <motion.span
              key={meta.total}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
            >
              {meta.total} article{meta.total !== 1 ? 's' : ''}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}
          >
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚠️</p>
            <p>{error}</p>
          </motion.div>
        )}

        {loading && <Skeleton key={`skeleton-${view}`} view={view} />}

        {!loading && !error && articles.length === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '4rem 2rem' }}
          >
            <motion.p
              initial={{ scale: 0.7 }} animate={{ scale: 1, transition: { duration: 0.4, ease } }}
              style={{ fontSize: '2.5rem', marginBottom: '1rem' }}
            >📭</motion.p>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{t.article.noArticles}</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{t.article.noArticlesDesc}</p>
          </motion.div>
        )}

        {!loading && !error && articles.length > 0 && (
          <motion.div key={`content-${view}-${search}-${meta.page}`}>
            {view === 'card' ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
                {articles.map((a, i) => (
                  <ArticleCard key={a.id} article={a} index={i} onNavigate={handleNavigate} />
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {articles.map((a, i) => (
                  <ArticleRow key={a.id} article={a} index={i} onNavigate={handleNavigate} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {meta.pages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } }}
                style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}
              >
                {Array.from({ length: meta.pages }, (_, i) => i + 1).map(p => (
                  <motion.button
                    key={p}
                    onClick={() => handlePage(p)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: '2.25rem', height: '2.25rem', borderRadius: '0.5rem',
                      border: '1px solid var(--border-card)', cursor: 'pointer', fontSize: '0.875rem',
                      backgroundColor: meta.page === p ? 'var(--brand-primary)' : 'var(--bg-card)',
                      color: meta.page === p ? '#fff' : 'var(--text-primary)',
                      fontWeight: meta.page === p ? 600 : 400,
                      transition: 'background-color 0.15s, color 0.15s',
                    }}
                  >
                    {p}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  );
}
