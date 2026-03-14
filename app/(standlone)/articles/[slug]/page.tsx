'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { ArticleDetail, ArticleTreeNode } from '@/types/article';

// ── Animation Variants ────────────────────────────────────────────────────────

const ease = [0.22, 1, 0.36, 1] as const;

const contentVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)', transition: { duration: 0.42, ease } },
  exit:    { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } },
};

const sidebarItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { duration: 0.3, delay: i * 0.04, ease },
  }),
};

const skeletonVariants = {
  initial: { opacity: 0 },
  enter:   { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.15 } },
};

// ── Sidebar Tree Node ─────────────────────────────────────────────────────────

function SidebarNode({
  node,
  currentSlug,
  collapsed,
  onNavigate,
  index,
}: {
  node: ArticleTreeNode;
  currentSlug: string;
  collapsed: boolean;
  onNavigate: (slug: string) => void;
  index: number;
}) {
  const isActive = node.slug === currentSlug;
  const hasActiveChild = (n: ArticleTreeNode): boolean =>
    n.slug === currentSlug || n.children.some(hasActiveChild);
  const [expanded, setExpanded] = useState(() => hasActiveChild(node));

  useEffect(() => {
    if (hasActiveChild(node)) setExpanded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlug]);

  if (collapsed) {
    return (
      <motion.div
        custom={index}
        variants={sidebarItemVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}
      >
        <button
          onClick={() => onNavigate(node.slug)}
          title={node.name}
          style={{
            width: '2rem', height: '2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '0.375rem', border: 'none', cursor: 'pointer',
            backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
            fontSize: '1rem', transition: 'background-color 0.12s, transform 0.12s',
            outline: isActive ? '2px solid var(--brand-primary)' : 'none',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1.12)';
          }}
          onMouseLeave={e => {
            if (!isActive) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
          }}
        >
          {node.icon || '📄'}
        </button>
        {node.children.map((child, ci) => (
          <SidebarNode key={child.id} node={child} currentSlug={currentSlug} collapsed={collapsed} onNavigate={onNavigate} index={ci} />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      custom={index}
      variants={sidebarItemVariants}
      initial="hidden"
      animate="visible"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
        {node.children.length > 0 ? (
          <button
            onClick={() => setExpanded(v => !v)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.125rem', color: 'var(--text-muted)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '0.25rem', transition: 'color 0.12s', width: '20px', height: '20px',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <motion.svg
              width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.2, ease }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </motion.svg>
          </button>
        ) : (
          <span style={{ width: '20px', flexShrink: 0 }} />
        )}

        <button
          onClick={() => onNavigate(node.slug)}
          style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '0.375rem',
            padding: '0.3125rem 0.5rem', borderRadius: '0.375rem',
            fontSize: '0.8125rem', fontWeight: isActive ? 600 : 400,
            textAlign: 'left', border: 'none', cursor: 'pointer',
            transition: 'background-color 0.12s, color 0.12s',
            backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
            color: isActive ? 'var(--brand-primary)' : 'var(--text-secondary)',
            borderLeft: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
            width: '100%',
          }}
          onMouseEnter={e => {
            if (!isActive) {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
            }
          }}
          onMouseLeave={e => {
            if (!isActive) {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
              (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
            }
          }}
        >
          <span style={{ fontSize: '0.875rem', flexShrink: 0 }}>{node.icon || '📄'}</span>
          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {node.name}
          </span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && node.children.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1, transition: { duration: 0.22, ease } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: [0.4,0,1,1] } }}
            style={{ overflow: 'hidden', paddingLeft: '0.75rem' }}
          >
            {node.children.map((child, ci) => (
              <SidebarNode key={child.id} node={child} currentSlug={currentSlug} collapsed={collapsed} onNavigate={onNavigate} index={ci} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

function ArticleSidebar({
  tree,
  currentSlug,
  collapsed,
  onCollapse,
  width,
  onWidthChange,
  mobileOpen,
  onMobileClose,
  onNavigate,
}: {
  tree: ArticleTreeNode[];
  currentSlug: string;
  collapsed: boolean;
  onCollapse: (v: boolean) => void;
  width: number;
  onWidthChange: (w: number) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onNavigate: (slug: string) => void;
}) {
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(width);

  // Min / max sidebar width
  const MIN_WIDTH = 180;
  const MAX_WIDTH = 480;
  const COLLAPSED_WIDTH = 52;

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    if (collapsed) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = width;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const delta = ev.clientX - startX.current;
      const next = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidth.current + delta));
      onWidthChange(next);
    };

    const onUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [collapsed, width, onWidthChange]);

  const currentWidth = collapsed ? COLLAPSED_WIDTH : width;

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="overlay"
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onMobileClose}
            style={{
              position: 'fixed', inset: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
              zIndex: 40, display: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar + drag handle wrapper */}
      <div
        className={`article-sidebar-wrapper ${mobileOpen ? 'sidebar-open' : ''}`}
        style={{
          position: 'sticky', top: 0,
          height: '100vh', flexShrink: 0,
          display: 'flex',
          width: currentWidth,
          transition: isDragging.current ? 'none' : 'width 0.25s ease',
        }}
      >
        <motion.aside
          className="article-sidebar"
          animate={{ width: currentWidth }}
          transition={{ duration: isDragging.current ? 0 : 0.25, ease }}
          style={{
            flex: 1, minWidth: 0,
            backgroundColor: 'var(--bg-card)',
            borderRight: '1px solid var(--border-card)',
            height: '100%',
            overflowY: 'auto', overflowX: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Header */}
          <div style={{
            padding: collapsed ? '0.875rem 0' : '0.875rem 0.75rem',
            borderBottom: '1px solid var(--border-card)',
            display: 'flex', alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            position: 'sticky', top: 0, zIndex: 5,
            backgroundColor: 'var(--bg-card)',
            gap: '0.5rem', flexShrink: 0,
            transition: 'padding 0.25s ease',
          }}>
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.a
                  key="back-link"
                  href="/articles"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.2, ease } }}
                  exit={{ opacity: 0, x: -8, transition: { duration: 0.15 } }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 600,
                    color: 'var(--brand-primary)', whiteSpace: 'nowrap', overflow: 'hidden',
                  }}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  All Articles
                </motion.a>
              )}
            </AnimatePresence>

            {/* Collapse toggle */}
            <button
              onClick={() => onCollapse(!collapsed)}
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              className="sidebar-toggle-btn"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '1.75rem', height: '1.75rem', flexShrink: 0,
                borderRadius: '0.375rem', border: '1px solid var(--border-card)',
                backgroundColor: 'var(--bg-surface)', color: 'var(--text-muted)',
                cursor: 'pointer', transition: 'all 0.12s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--brand-primary)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--brand-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-card)'; }}
            >
              <motion.svg
                width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"
                animate={{ rotate: collapsed ? 0 : 180 }}
                transition={{ duration: 0.25, ease }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7M19 19l-7-7 7-7"/>
              </motion.svg>
            </button>

            {/* Mobile close */}
            <button
              onClick={onMobileClose}
              className="sidebar-close-btn"
              style={{
                display: 'none', alignItems: 'center', justifyContent: 'center',
                width: '1.75rem', height: '1.75rem', flexShrink: 0,
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', borderRadius: '0.25rem',
              }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Tree nav */}
          <nav style={{
            padding: collapsed ? '0.625rem 0.5rem' : '0.75rem 0.625rem',
            flex: 1,
            display: 'flex', flexDirection: 'column', gap: collapsed ? '0.125rem' : '0',
            transition: 'padding 0.25s ease',
          }}>
            {tree.map((node, i) => (
              <SidebarNode
                key={node.id}
                node={node}
                currentSlug={currentSlug}
                collapsed={collapsed}
                onNavigate={onNavigate}
                index={i}
              />
            ))}
          </nav>

          {/* Collapsed bottom back link */}
          <AnimatePresence>
            {collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.15, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                style={{ padding: '0.625rem 0.5rem', borderTop: '1px solid var(--border-card)', display: 'flex', justifyContent: 'center' }}
              >
                <a href="/articles" title="All Articles" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: '2rem', height: '2rem', borderRadius: '0.375rem',
                  color: 'var(--brand-primary)', textDecoration: 'none',
                  transition: 'background-color 0.12s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.aside>

        {/* ── Drag handle ── */}
        {!collapsed && (
          <div
            onMouseDown={handleDragStart}
            className="sidebar-drag-handle"
            title="Drag to resize"
            style={{
              width: '6px',
              flexShrink: 0,
              cursor: 'col-resize',
              position: 'relative',
              zIndex: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Visual indicator */}
            <div className="drag-handle-bar" style={{
              width: '3px', height: '40px',
              borderRadius: '2px',
              backgroundColor: 'var(--border-card)',
              transition: 'background-color 0.15s, transform 0.15s',
            }} />
          </div>
        )}
      </div>
    </>
  );
}

// ── Article Body ──────────────────────────────────────────────────────────────

function ArticleBody({ html }: { html: string }) {
  return <div className="odoo-article-body" dangerouslySetInnerHTML={{ __html: html }} />;
}

function Breadcrumbs({
  crumbs,
  onNavigate,
}: {
  crumbs: { id: number; slug: string; name: string }[];
  onNavigate: (slug: string) => void;
}) {
  if (crumbs.length <= 1) return null;
  return (
    <motion.nav
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease } }}
      style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
    >
      {crumbs.map((c, i) => (
        <span key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {i > 0 && (
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          )}
          {i < crumbs.length - 1 ? (
            <button
              onClick={() => onNavigate(c.slug)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                fontSize: '0.8125rem', color: 'var(--text-muted)', transition: 'color 0.12s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--brand-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {c.name}
            </button>
          ) : (
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{c.name}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}

function PageSkeleton() {
  return (
    <motion.div
      variants={skeletonVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ flex: 1, padding: '2rem', maxWidth: '800px' }}
    >
      {[30, 70, 100, 85, 90, 60, 95, 75].map((w, i) => (
        <div key={i} style={{
          height: i === 1 ? '2rem' : '0.875rem',
          width: `${w}%`,
          backgroundColor: 'var(--bg-surface)',
          borderRadius: '0.375rem',
          marginBottom: i === 0 ? '1.5rem' : i === 1 ? '1rem' : '0.75rem',
          animation: 'pulse 1.5s infinite',
          animationDelay: `${i * 0.07}s`,
        }} />
      ))}
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  // slug is the 100-char hash — used directly for API calls and URL navigation

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [tree, setTree] = useState<ArticleTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Load tree once
  useEffect(() => {
    fetch('/api/articles/tree')
      .then(r => r.json())
      .then(d => { if (d.success) setTree(d.data); })
      .catch(() => {});
  }, []);

  // Load article when slug changes
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError(null);
    if (contentRef.current) contentRef.current.scrollTop = 0;

    fetch(`/api/articles/${slug}`)
      .then(r => r.json())
      .then(d => {
        if (d.success) setArticle(d.data);
        else setError(d.error || 'Article not found');
      })
      .catch(() => setError('Failed to load article'))
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (article) document.title = `${article.name} | LemaCore`;
  }, [article]);

  // Navigate using the article's slug (100-char hash)
  const handleNavigate = useCallback((targetSlug: string) => {
    router.push(`/articles/${targetSlug}`);
    setMobileSidebarOpen(false);
  }, [router]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>

      <ArticleSidebar
        tree={tree}
        currentSlug={slug}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        width={sidebarWidth}
        onWidthChange={setSidebarWidth}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
        onNavigate={handleNavigate}
      />

      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Mobile top bar */}
        <div className="mobile-topbar" style={{
          display: 'none', alignItems: 'center', gap: '0.75rem',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid var(--border-card)',
          backgroundColor: 'var(--bg-card)',
          position: 'sticky', top: 0, zIndex: 30, flexShrink: 0,
        }}>
          <button
            onClick={() => setMobileSidebarOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '2.25rem', height: '2.25rem',
              borderRadius: '0.5rem', border: '1px solid var(--border-card)',
              backgroundColor: 'var(--bg-surface)', color: 'var(--text-secondary)',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={article?.name ?? 'loading'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
              style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            >
              {article?.name ?? 'Loading...'}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ flex: 1, overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {loading && (
              <PageSkeleton key="skeleton" />
            )}

            {error && !loading && (
              <motion.div
                key="error"
                variants={contentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{ padding: '4rem 2rem', textAlign: 'center' }}
              >
                <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>😞</p>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Article not found
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{error}</p>
                <a href="/articles" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--brand-primary)', textDecoration: 'none' }}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
                  </svg>
                  Back to Articles
                </a>
              </motion.div>
            )}

            {!loading && article && (
              <motion.article
                key={slug}
                variants={contentVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 2rem 4rem' }}
              >
                <Breadcrumbs crumbs={article.breadcrumbs} onNavigate={handleNavigate} />

                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.38, delay: 0.05, ease } }}
                  style={{ marginBottom: '2rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, transition: { duration: 0.35, delay: 0.08, ease } }}
                      style={{ fontSize: '2rem', display: 'inline-block' }}
                    >
                      {article.icon || '📄'}
                    </motion.span>
                    <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>
                      {article.name}
                    </h1>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {article.write_date && (
                      <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        {new Date(article.write_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                    {article.parent_name && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.25, delay: 0.12, ease } }}
                        style={{
                          fontSize: '0.75rem', fontWeight: 500,
                          padding: '0.2rem 0.625rem', borderRadius: '9999px',
                          backgroundColor: 'var(--bg-surface)', color: 'var(--brand-primary)',
                          border: '1px solid var(--border-card)',
                          display: 'inline-block',
                        }}
                      >
                        {article.parent_name}
                      </motion.span>
                    )}
                  </div>
                </motion.div>

                <motion.hr
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1, transition: { duration: 0.4, delay: 0.1, ease } }}
                  style={{ border: 'none', borderTop: '1px solid var(--border-card)', marginBottom: '2rem' }}
                />

                {/* Body */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.15, ease } }}
                >
                  {article.body
                    ? <ArticleBody html={article.body} />
                    : <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>This article has no content yet.</p>
                  }
                </motion.div>

                {/* Sub-articles */}
                {article.children.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.22, ease } }}
                    style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-card)' }}
                  >
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem' }}>
                      Sub-articles
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {article.children.map((child, i) => (
                        <motion.button
                          key={child.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.25 + i * 0.05, ease } }}
                          whileHover={{ x: 4, transition: { duration: 0.15 } }}
                          onClick={() => handleNavigate(child.slug)}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.875rem 1rem', width: '100%', textAlign: 'left',
                            backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-card)',
                            borderRadius: '0.625rem', cursor: 'pointer',
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
                          <span style={{ fontSize: '1.125rem', flexShrink: 0 }}>{child.icon || '📄'}</span>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)', display: 'block' }}>{child.name}</span>
                            {child.body_preview && (
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {child.body_preview}
                              </span>
                            )}
                          </div>
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                          </svg>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .odoo-article-body { font-size:0.9375rem; line-height:1.75; color:var(--text-primary); word-break:break-word; }
        .odoo-article-body h1,.odoo-article-body h2,.odoo-article-body h3,
        .odoo-article-body h4,.odoo-article-body h5,.odoo-article-body h6
          { color:var(--text-primary); font-weight:700; line-height:1.35; margin:1.75rem 0 0.75rem; }
        .odoo-article-body h1 { font-size:1.75rem; }
        .odoo-article-body h2 { font-size:1.375rem; border-bottom:1px solid var(--border-card); padding-bottom:0.375rem; }
        .odoo-article-body h3 { font-size:1.125rem; }
        .odoo-article-body h4 { font-size:1rem; }
        .odoo-article-body p  { margin:0 0 1rem 0; }
        .odoo-article-body a  { color:var(--brand-primary); text-decoration:underline; text-underline-offset:2px; }
        .odoo-article-body a:hover { opacity:0.8; }
        .odoo-article-body ul,.odoo-article-body ol { padding-left:1.5rem; margin:0 0 1rem 0; }
        .odoo-article-body li { margin-bottom:0.375rem; }
        .odoo-article-body blockquote {
          border-left:4px solid var(--brand-primary); padding:0.75rem 1rem; margin:1rem 0;
          background:var(--bg-surface); border-radius:0 0.5rem 0.5rem 0;
          color:var(--text-secondary); font-style:italic;
        }
        .odoo-article-body pre {
          background:var(--bg-surface); border:1px solid var(--border-card);
          border-radius:0.5rem; padding:1rem; overflow-x:auto; font-size:0.85rem; margin:1rem 0;
        }
        .odoo-article-body code {
          background:var(--bg-surface); border:1px solid var(--border-card);
          border-radius:0.25rem; padding:0.125rem 0.375rem; font-size:0.85em;
          font-family:'Fira Mono','Consolas','Monaco',monospace;
        }
        .odoo-article-body pre code { background:none; border:none; padding:0; }
        .odoo-article-body table {
          width:100%; border-collapse:collapse; margin:1.25rem 0; font-size:0.875rem;
          overflow:hidden; border-radius:0.5rem; border:1px solid var(--border-card);
        }
        .odoo-article-body th { background:var(--bg-surface); color:var(--text-primary); font-weight:600; padding:0.625rem 0.875rem; text-align:left; border-bottom:2px solid var(--border-card); }
        .odoo-article-body td { padding:0.5rem 0.875rem; border-bottom:1px solid var(--border-card); color:var(--text-secondary); }
        .odoo-article-body tr:last-child td { border-bottom:none; }
        .odoo-article-body tr:hover td  { background:var(--bg-surface); }
        .odoo-article-body img { max-width:100%; border-radius:0.5rem; margin:0.75rem 0; border:1px solid var(--border-card); }
        .odoo-article-body hr  { border:none; border-top:1px solid var(--border-card); margin:2rem 0; }
        .odoo-article-body .o_editor_banner,.odoo-article-body .alert,.odoo-article-body .note
          { padding:0.75rem 1rem; border-radius:0.5rem; margin:1rem 0; border-left:4px solid var(--brand-primary); background:var(--bg-surface); }
        .odoo-article-body .alert-info    { border-left-color:#3b82f6; background:rgba(59,130,246,0.07); }
        .odoo-article-body .alert-warning { border-left-color:#f59e0b; background:rgba(245,158,11,0.07); }
        .odoo-article-body .alert-danger  { border-left-color:#ef4444; background:rgba(239,68,68,0.07); }
        .odoo-article-body .alert-success { border-left-color:#22c55e; background:rgba(34,197,94,0.07); }
        .odoo-article-body .o_checklist { list-style:none; padding-left:0; }
        .odoo-article-body .o_checklist li { display:flex; align-items:flex-start; gap:0.5rem; padding:0.2rem 0; }
        .odoo-article-body .o_checklist li::before { content:'☐'; color:var(--text-muted); flex-shrink:0; margin-top:0.1rem; }
        .odoo-article-body .o_checklist li.o_checked::before { content:'☑'; color:var(--brand-primary); }
        .odoo-article-body .o_text_columns { display:flex; gap:1.5rem; flex-wrap:wrap; }
        .odoo-article-body .o_text_columns .o_text_column { flex:1; min-width:200px; }

        .article-sidebar::-webkit-scrollbar { width:3px; }
        .article-sidebar::-webkit-scrollbar-track { background:transparent; }
        .article-sidebar::-webkit-scrollbar-thumb { background:var(--border-card); border-radius:2px; }

        /* ── Drag handle hover ─────────────────────────────── */
        .sidebar-drag-handle:hover .drag-handle-bar {
          background-color: var(--brand-primary) !important;
          transform: scaleY(1.4);
        }
        .sidebar-drag-handle:active .drag-handle-bar {
          background-color: var(--brand-primary) !important;
          transform: scaleY(1.6);
        }

        /* ── Animations ────────────────────────────────────── */
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

        /* ── Mobile ────────────────────────────────────────── */
        @media (max-width:768px) {
          .article-sidebar-wrapper {
            position: fixed !important;
            left: 0; top: 0; bottom: 0; z-index: 45;
            transform: translateX(-100%);
            transition: transform 0.28s ease !important;
            box-shadow: 4px 0 24px rgba(0,0,0,0.18);
            width: 260px !important;
            height: 100vh;
          }
          .article-sidebar-wrapper.sidebar-open {
            transform: translateX(0);
          }
          .sidebar-drag-handle { display: none !important; }
          .mobile-overlay { display: block !important; }
          .sidebar-close-btn { display: flex !important; }
          .sidebar-toggle-btn { display: none !important; }
          .mobile-topbar { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
