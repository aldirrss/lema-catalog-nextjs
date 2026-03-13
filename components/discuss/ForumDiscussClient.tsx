'use client';

import dynamic from 'next/dynamic';

const ForumDiscuss = dynamic(() => import('@/components/discuss/ForumDiscuss'), {
  ssr: false,
  loading: () => (
    <div className="text-center py-10 text-sm" style={{ color: 'var(--text-muted)' }}>
      Loading forum…
    </div>
  ),
});

export default function ForumDiscussClient() {
  return <ForumDiscuss />;
}