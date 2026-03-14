import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageTransitionProvider from '@/components/layout/PageTransitionProvider';

/**
 * Layout for all regular pages (home, catalog, about, forum, articles list, contact).
 * Wraps content with Navbar + Footer.
 * Route group (main) has no effect on URLs.
 */
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <PageTransitionProvider>
          {children}
        </PageTransitionProvider>
      </main>
      <Footer />
    </>
  );
}
