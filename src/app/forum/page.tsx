import type { Metadata } from 'next';
import ForumDiscussClient from '@/components/discuss/ForumDiscussClient';

export const metadata: Metadata = {
  title: 'Community Forum',
  description: 'Ask questions, share ideas, and discuss Lema Core Odoo modules. No account required.',
};

export default function ForumPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="py-16"
        style={{ background: 'var(--brand-primary)', borderColor: 'var(--border-card)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl font-bold sm:text-5xl">Community Forum</h1>
          <p className="mt-4 text-lg max-w-xl mx-auto">
            Ask questions, share ideas, and discuss Lema Core Odoo modules.
          </p>
        </div>
      </section>

      {/* Forum */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ForumDiscussClient />
        </div>
      </section>
    </div>
  );
}