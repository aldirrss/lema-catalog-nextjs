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
    default: 'LemaCore Technologies | Odoo Module Catalog',
    template: '%s | LemaCore Technologies',
  },
  description:
    'Discover premium Odoo modules developed by LemaCore Technologies. Expert Odoo development, customization, and ERP implementation for Indonesian & global businesses.',
  keywords: ['Odoo', 'Odoo Indonesia', 'Odoo Modules', 'ERP Indonesia', 'Odoo ERP', 'Lema Core', 'Odoo Customization', 'Odoo Development'],
  authors: [{ name: 'LemaCore Technologies', url: siteUrl }],
  creator: 'LemaCore Technologies',
  publisher: 'LemaCore Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID', 'ar_SA', 'fr_FR', 'zh_CN', 'es_ES'],
    url: siteUrl,
    siteName: 'LemaCore Technologies',
    title: 'LemaCore Technologies | Odoo Module Catalog',
    description: 'Premium Odoo modules and expert ERP solutions for Indonesian & global businesses.',
    images: [
      {
        url: '/images/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'LemaCore Technologies Odoo Modules',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LemaCore Technologies | Odoo Module Catalog',
    description: 'Premium Odoo modules and expert ERP solutions for Indonesian & global businesses.',
    images: ['/images/hero-bg.png'],
    creator: '@lemacore',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-yd-content-ready="true" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'LemaCore Technologies',
              url: siteUrl,
              logo: `${siteUrl}/icon.png`,
              sameAs: [siteUrl],
              description:
                'Odoo development studio providing premium modules, implementation, and customization services.',
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
              name: 'LemaCore Technologies',
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
