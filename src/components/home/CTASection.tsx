import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-16" style={{ backgroundColor: 'var(--brand-primary)' }}>
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold sm:text-4xl"
          style={{ color: 'var(--text-inverse)' }}>
          Ready to supercharge your Odoo?
        </h2>
        <p className="mt-4 text-lg text-muted"
          style={{ color: 'var(--text-inverse)' }}>
          Let our experts build the perfect Odoo solution for your business.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <Link href="/catalog" className="btn-primary-brand px-8 py-3 text-base">
            Explore Modules
          </Link>

          <Link href="/contact" className="btn-outline px-8 py-3 text-base"
            style={{ borderColor: 'var(--text-inverse)', color: 'var(--text-inverse)' }}>
            Contact Us
          </Link>

        </div>
      </div>
    </section>
  );
}