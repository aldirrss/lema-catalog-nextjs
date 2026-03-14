import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Community Forum',
  description: 'Join the Lema Core Technologies community forum. Ask questions, share knowledge, and discuss Odoo modules and ERP solutions with developers and users.',
  openGraph: {
    title: 'Community Forum | Lema Core Technologies',
    description: 'Discuss Odoo modules, ask questions, and share knowledge with the Lema Core community.',
  },
};
export default function ForumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
