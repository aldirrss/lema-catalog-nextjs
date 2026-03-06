const SERVICES = [
  {
    icon: '⚙️',
    title: 'Odoo Development',
    description:
      'Custom module development tailored to your business processes. From simple tweaks to complex integrations.',
  },
  {
    icon: '🎨',
    title: 'Odoo Customization',
    description:
      'Modify existing Odoo modules to perfectly match your workflow without breaking core functionality.',
  },
  {
    icon: '🔗',
    title: 'Odoo Integration',
    description:
      'Connect Odoo with external systems — e-commerce, payment gateways, government APIs, and more.',
  },
  {
    icon: '🚀',
    title: 'ERP Implementation',
    description:
      'End-to-end Odoo implementation with data migration, training, and ongoing support.',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-page)' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle mx-auto">
            Comprehensive Odoo services to help your business grow and operate efficiently.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-xl p-6 shadow-card border hover:shadow-card-hover transition-shadow"
              style={{ borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-card)' }}
            >
              <div className="mb-4 text-3xl">{service.icon}</div>
              <h3 className="font-semibold"
                style={{ color: 'var(--text-primary)' }}>
                {service.title}
                </h3>
              <p className="mt-2 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
