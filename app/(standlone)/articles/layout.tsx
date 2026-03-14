/**
 * Layout for standalone pages (article detail reader).
 * No Navbar, no Footer — opens in a new tab as a clean reading page.
 * Inherits <html>/<body>/providers from the root layout.
 */
export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
