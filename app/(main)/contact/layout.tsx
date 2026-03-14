import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Lema Core Technologies. Request a custom Odoo module, discuss ERP implementation, or ask about our services. We respond within 24 hours.',
  openGraph: {
    title: 'Contact Us | Lema Core Technologies',
    description: 'Reach out to our Odoo development team for modules, implementation, and consulting.',
  },
};
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
