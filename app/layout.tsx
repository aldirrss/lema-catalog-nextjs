import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/layout/ThemeProvider';
import LangProvider from '@/components/layout/LangProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  weight: ['400', '500', '600', '700'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'x-default': '/',
      en: '/?lang=en',
      id: '/?lang=id',
      ar: '/?lang=ar',
      fr: '/?lang=fr',
      zh: '/?lang=zh',
      es: '/?lang=es',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png' },
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  title: {
    default: 'Lema Core Technologies | Odoo Module Catalog',
    template: '%s | Lema Core Technologies',
  },
  description:
    'Discover premium Odoo modules developed by Lema Core Technologies. Expert Odoo development, customization, and ERP implementation for Indonesian & global businesses.',
  keywords: ['Odoo', 'Odoo Indonesia', 'Odoo Modules', 'ERP Indonesia', 'Odoo ERP', 'Lema Core', 'Odoo Customization', 'Odoo Development'],
  authors: [{ name: 'Lema Core Technologies', url: siteUrl }],
  creator: 'Lema Core Technologies',
  publisher: 'Lema Core Technologies',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID', 'ar_SA', 'fr_FR', 'zh_CN', 'es_ES'],
    url: siteUrl,
    siteName: 'Lema Core Technologies',
    title: 'Lema Core Technologies | Odoo Module Catalog',
    description: 'Premium Odoo modules and expert ERP solutions for Indonesian & global businesses.',
    images: [{ url: '/images/hero-bg.png', width: 1200, height: 630, alt: 'Lema Core Technologies Odoo Modules' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lema Core Technologies | Odoo Module Catalog',
    description: 'Premium Odoo modules and expert ERP solutions for Indonesian & global businesses.',
    images: ['/images/hero-bg.png'],
    creator: '@lemacore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

/**
 * Root layout — only html/body/providers.
 * Navbar & Footer are added by (main)/layout.tsx.
 * (standalone) pages (e.g. article detail) skip Navbar/Footer entirely.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      data-yd-content-ready="true"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lema Core Technologies',
              url: siteUrl,
              logo: `${siteUrl}/icon.png`,
              sameAs: [siteUrl],
              description: 'Odoo development studio providing premium modules, implementation, and customization services.',
              knowsLanguage: ['en', 'id', 'ar', 'fr', 'zh', 'es'],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lema Core Technologies',
              url: siteUrl,
              inLanguage: ['en', 'id', 'ar', 'fr', 'zh', 'es'],
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/catalog?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        {/* Blocking theme script — prevents flash of wrong theme */}
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
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
