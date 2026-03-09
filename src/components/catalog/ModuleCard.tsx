'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Module } from '@/types';
import { formatPrice } from '@/lib/utils';
import BadgeRow from './BadgeRow';
import { useState } from 'react';

export default function ModuleCard({ module }: { module: Module }) {
  const odooUrl = process.env.NEXT_PUBLIC_ODOO_BASE_URL ?? 'http://localhost:6018';
  const imageUrl = module.cover_image_url
    ? (module.cover_image_url.startsWith('http') ? module.cover_image_url : `${odooUrl}${module.cover_image_url}`)
    : null;

  const selectedVersion = module.versions ? module.versions[0] : null;
  const [downloadCount] = useState(module.count_download ?? 0);
  
  const isFree = module.price === 0;
  const hasDownloadUrl = !!selectedVersion?.download_url;

  const displayCount = isFree ? downloadCount : (module.count_purchase ?? 0);
  const countLabel = isFree ? 'Downloads' : 'Purchases';
  const countIcon = isFree ? '⬇️' : '🛒';

  return (
    <Link href={`/modules/${module.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div className="card" style={{ overflow: 'hidden', cursor: 'pointer' }}>

        {/* Cover — grey-blue padded container */}
        <div style={{
          position: 'relative',
          height: '180px',
          width: '100%',
          backgroundColor: 'var(--bg-inline-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.25rem',
          boxSizing: 'border-box',
        }}>
          {imageUrl ? (
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}>
              <Image
                src={imageUrl}
                alt={`${module.name} cover`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : (
            /* Placeholder when no image */
            <div style={{
              width: '100%', height: '100%',
              borderRadius: '0.5rem',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.2)' }}>
                {module.name.charAt(0)}
              </span>
            </div>
          )}

          {/* Featured badge */}
          {module.featured && (
            <span style={{
              position: 'absolute', top: '10px', right: '10px',
              backgroundColor: '#facc15', color: '#713f12',
              borderRadius: '9999px', padding: '2px 10px',
              fontSize: '0.75rem', fontWeight: 600,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              zIndex: 1,
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '1.125rem' }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <BadgeRow
              category={module.category}
              versions={module.versions ?? []}
            />
          </div>

          <h3 style={{
            fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9375rem',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
          }}>
            {module.name}
          </h3>
          <p style={{
            marginTop: '0.25rem', fontSize: '0.875rem', color: 'var(--text-secondary)',
            display: '-webkit-box', WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2, overflow: 'hidden', lineHeight: 1.5,
          }}>
            {module.short_description}
          </p>

          <div style={{
            marginTop: '0.875rem', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '0.75rem',
          }}>
            {/* Price */}
            <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {formatPrice(module.price)}
            </span>

            {/* Rating | Count — grouped together */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              {/* Download / Purchase count */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <span style={{ fontSize: '0.8125rem' }}>{countIcon}</span>
                <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{displayCount}</span>
              </div>

              {/* Separator */}
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: 1 }}>|</span>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <svg style={{ height: '0.9rem', width: '0.9rem', fill: '#f59e0b' }} viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {module.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}