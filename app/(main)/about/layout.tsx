import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the Lema Core Technologies team — passionate Odoo developers and ERP consultants dedicated to building world-class modules for Indonesian and global businesses.',
  openGraph: {
    title: 'About Us | Lema Core Technologies',
    description: 'Meet our team of Odoo developers and ERP consultants.',
  },
};
export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
