'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  function buildHref(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-1" aria-label="Pagination">
      <Link
        href={buildHref(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === 1
            ? 'pointer-events-none text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        ← Prev
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-brand-600 text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={buildHref(currentPage + 1)}
        aria-disabled={currentPage === totalPages}
        className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          currentPage === totalPages
            ? 'pointer-events-none text-gray-300'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}
