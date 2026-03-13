import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-brand-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-gray-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/catalog" className="btn-outline">Browse Catalog</Link>
        </div>
      </div>
    </div>
  );
}
