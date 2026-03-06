import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getModules, getCategories } from '@/lib/odoo';
import ModuleCard from '@/components/catalog/ModuleCard';
import CatalogFiltersBar from '@/components/catalog/CatalogFiltersBar';
import Pagination from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Module Catalog',
  description: 'Browse all Odoo modules developed by Lema Core Technologies.',
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category_id?: string;
    odoo_version?: string;
    page?: string;
  }>;
}

export default async function CatalogPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? '1', 10));
  const filters = {
    search: params.search ?? '',
    category_id: params.category_id ?? '',
    odoo_version: params.odoo_version ?? '',
    page,
  };

  const [modulesData, categories] = await Promise.all([
    getModules(filters).catch(() => ({
      data: [],
      meta: { total: 0, page: 1, limit: 12, pages: 0 },
    })),
    getCategories().catch(() => []),
  ]);

  return (
    <div className="min-h-screen bg-surface">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Module Catalog</h1>
          <p className="mt-2 text-gray-600">
            {modulesData.meta.total} module{modulesData.meta.total !== 1 ? 's' : ''} available
          </p>

          <div className="mt-6">
            <Suspense>
              <CatalogFiltersBar
                categories={categories}
                currentSearch={filters.search}
                currentCategory={filters.category_id}
                currentVersion={filters.odoo_version}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Module Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {modulesData.data.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {modulesData.data.map((mod) => (
                <ModuleCard key={mod.id} module={mod} />
              ))}
            </div>

            {/* Pagination */}
            {modulesData.meta.pages > 1 && (
              <div className="mt-12">
                <Suspense>
                  <Pagination
                    currentPage={modulesData.meta.page}
                    totalPages={modulesData.meta.pages}
                  />
                </Suspense>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl">🔍</div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No modules found</h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filters to find what you&apos;re looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
