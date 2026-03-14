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
        {/* Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Lema Core Technologies',
              url: siteUrl,
              logo: {
                '@type': 'ImageObject',
                url: `${siteUrl}/icon.png`,
                width: 512,
                height: 512,
              },
              sameAs: [siteUrl],
              description: 'Odoo development studio providing premium modules, implementation, and customization services.',
              knowsLanguage: ['en', 'id', 'ar', 'fr', 'zh', 'es'],
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer support',
                availableLanguage: ['English', 'Indonesian'],
              },
            }),
          }}
        />

        {/* WebSite + SiteLinksSearchBox — enables Google search box & sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lema Core Technologies',
              alternateName: 'LemaCore',
              url: siteUrl,
              inLanguage: ['en', 'id', 'ar', 'fr', 'zh', 'es'],
              description: 'Premium Odoo modules and expert ERP solutions.',
              potentialAction: [
                {
                  '@type': 'SearchAction',
                  target: {
                    '@type': 'EntryPoint',
                    urlTemplate: `${siteUrl}/catalog?search={search_term_string}`,
                  },
                  'query-input': 'required name=search_term_string',
                },
              ],
            }),
          }}
        />

        {/* SiteLinksSearchBox — dedicated structured data for sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lema Core Technologies',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/catalog?search={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* ItemList — all main nav pages, signals sitelinks to Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Lema Core Technologies — Main Navigation',
              itemListElement: [
                {
                  '@type': 'SiteLinksSearchBox',
                  url: siteUrl,
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: `${siteUrl}/catalog?search={search_term_string}`,
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  description: 'Lema Core Technologies — Odoo Module Catalog & ERP Solutions',
                  url: siteUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Module Catalog',
                  description: 'Browse all premium Odoo modules developed by Lema Core Technologies',
                  url: `${siteUrl}/catalog`,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'About Us',
                  description: 'Learn about our team, mission, and Odoo expertise',
                  url: `${siteUrl}/about`,
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Forum',
                  description: 'Community discussion forum for Odoo developers and users',
                  url: `${siteUrl}/forum`,
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Articles',
                  description: 'Knowledge base — guides, tutorials, and Odoo documentation',
                  url: `${siteUrl}/articles`,
                },
                {
                  '@type': 'ListItem',
                  position: 6,
                  name: 'Contact',
                  description: 'Get in touch with our Odoo development team',
                  url: `${siteUrl}/contact`,
                },
              ],
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
