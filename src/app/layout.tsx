import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ThemeProvider from '@/components/layout/ThemeProvider';
import LangProvider from '@/components/layout/LangProvider';
import PageTransitionProvider from '@/components/layout/PageTransitionProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.tech'),
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  title: {
    default: 'Lema Core Technologies — Odoo Module Catalog',
    template: '%s | Lema Core Technologies',
  },
  description:
    'Discover premium Odoo modules developed by Lema Core Technologies. Accounting, HR, Inventory, Integrations and more.',
  keywords: ['Odoo', 'modules', 'addons', 'ERP', 'Indonesia', 'Lema Core'],
  authors: [{ name: 'Lema Core Technologies', url: 'https://lemacore.tech' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lema Core Technologies',
    title: 'Lema Core Technologies — Odoo Module Catalog',
    description: 'Premium Odoo modules for Indonesian & global businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lema Core Technologies — Odoo Module Catalog',
    description: 'Premium Odoo modules for Indonesian & global businesses.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-yd-content-ready="true" suppressHydrationWarning>
      <head>
        {/*
          Script BLOCKING — apply tema sebelum browser render apapun.
          Prioritas:
          1. localStorage 'app-theme' → tema yang user pilih sebelumnya
          2. prefers-color-scheme → preferensi sistem
          Mencegah flash warna salah saat halaman pertama load.
        */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var ALL_THEMES = ['theme-default','theme-dark','theme-ocean-light','theme-ocean-dark','theme-midnight','theme-forest-light','theme-forest-dark','theme-rose-light'];
            var DARK_THEMES = ['theme-dark','theme-ocean-dark','theme-midnight','theme-forest-dark'];
            try {
              var stored = localStorage.getItem('app-theme');
              var theme;
              if (stored && ALL_THEMES.includes(stored)) {
                theme = stored;
              } else {
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                theme = prefersDark ? 'theme-dark' : 'theme-default';
              }
              document.documentElement.classList.add(theme);
              if (DARK_THEMES.includes(theme)) {
                document.documentElement.classList.add('dark');
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-screen font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider>
          <LangProvider>
            <Navbar />
              <main>
                <PageTransitionProvider>
                  {children}
                </PageTransitionProvider>
            </main>
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
