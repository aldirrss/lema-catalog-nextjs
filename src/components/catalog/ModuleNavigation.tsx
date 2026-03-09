'use client';

import Link from 'next/link';

interface NavModule {
  slug: string;
  name: string;
}

interface Props {
  prev: NavModule | null;
  next: NavModule | null;
}

export default function ModuleNavigation({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <div className="mod-nav-wrapper">
      {/* Prev */}
      {prev ? (
        <Link href={`/modules/${prev.slug}`} className="mod-nav-btn mod-nav-prev">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="mod-nav-arrow">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <div className="mod-nav-text">
            <span className="mod-nav-label">Previous</span>
            <span className="mod-nav-name">{prev.name}</span>
          </div>
        </Link>
      ) : <div className="mod-nav-spacer" />}

      {/* Next */}
      {next ? (
        <Link href={`/modules/${next.slug}`} className="mod-nav-btn mod-nav-next">
          <div className="mod-nav-text mod-nav-text-right">
            <span className="mod-nav-label">Next</span>
            <span className="mod-nav-name">{next.name}</span>
          </div>
          <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" className="mod-nav-arrow">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      ) : <div className="mod-nav-spacer" />}

      <style>{`
        .mod-nav-wrapper {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 0.75rem;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-card);
        }
        .mod-nav-btn {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.625rem;
          padding: 0.75rem 1rem;
          border-radius: 0.625rem;
          border: 1.5px solid var(--border-card);
          background: var(--bg-card);
          color: var(--text-secondary);
          text-decoration: none;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
          min-width: 0;
        }
        .mod-nav-btn:hover {
          border-color: var(--brand-primary);
          background: var(--bg-surface);
          color: var(--brand-primary);
        }
        .mod-nav-next {
          justify-content: flex-end;
        }
        .mod-nav-arrow {
          flex-shrink: 0;
          opacity: 0.6;
        }
        .mod-nav-btn:hover .mod-nav-arrow {
          opacity: 1;
        }
        .mod-nav-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .mod-nav-text-right {
          text-align: right;
        }
        .mod-nav-label {
          font-size: 0.6875rem;
          color: var(--text-muted);
          line-height: 1;
          margin-bottom: 0.2rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .mod-nav-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .mod-nav-spacer {
          flex: 1;
        }
      `}</style>
    </div>
  );
}