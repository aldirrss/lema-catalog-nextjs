import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Articles & Knowledge Base',
  description: 'Browse Lema Core Technologies knowledge base — Odoo guides, tutorials, integration tips, and technical documentation for developers and implementors.',
  openGraph: {
    title: 'Articles & Knowledge Base | Lema Core Technologies',
    description: 'Guides, tutorials, and Odoo documentation from Lema Core Technologies.',
  },
};
export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
