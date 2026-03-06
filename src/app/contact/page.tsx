import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Lema Core Technologies team.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-700 to-brand-600 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="mt-3 text-lg text-blue-100">
            Have a question or project in mind? We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Get in Touch</h2>
              <p className="mt-3 text-gray-600">
                Whether you need a custom Odoo module, have questions about our catalog,
                or want to discuss a full ERP implementation — our team is here to help.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: '📧',
                  label: 'Email',
                  value: 'hello@lemacore.tech',
                  href: 'mailto:hello@lemacore.tech',
                },
                {
                  icon: '💬',
                  label: 'WhatsApp',
                  value: '+62 812-3456-7890',
                  href: 'https://wa.me/6281234567890',
                },
                {
                  icon: '📍',
                  label: 'Location',
                  value: 'Jakarta, Indonesia',
                  href: null,
                },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-brand-600 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-brand-50 p-5 border border-brand-100">
              <p className="text-sm font-semibold text-brand-700">⏱ Response Time</p>
              <p className="mt-1 text-sm text-brand-600">
                We typically respond within 1 business day.
                For urgent inquiries, please reach us via WhatsApp.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="card p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
