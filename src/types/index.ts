// ============================================================
// Domain Types — matches the Odoo REST API response shapes
// ============================================================

export interface Category {
  id: number;
  name: string;
  description: string;
  module_count: number;
}

export interface Feature {
  id: number;
  name: string;
  description: string;
}

export interface Screenshot {
  id: number;
  image_url: string;
  sequence: number;
}

export interface Module {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  odoo_version: '16' | '17' | '18' | '19';
  price: number;
  rating: number;
  featured: boolean;
  cover_image_url: string | null;
  github_url: string;
  documentation_url: string;
  demo_url: string;
  created_date: string | null;
  category: Pick<Category, 'id' | 'name'> | null;
  feature_count: number;
  screenshot_count: number;
}

export interface ModuleDetail extends Module {
  description: string;
  features: Feature[];
  screenshots: Screenshot[];
}

// ============================================================
// API Response wrappers
// ============================================================

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ApiSingleResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

// ============================================================
// UI / filter types
// ============================================================

export interface CatalogFilters {
  search: string;
  category_id: string;
  odoo_version: string;
  page: number;
}

export type OdooVersion = '16' | '17' | '18' | '19';

export const ODOO_VERSIONS: { value: OdooVersion; label: string }[] = [
  { value: '16', label: 'Odoo 16' },
  { value: '17', label: 'Odoo 17' },
  { value: '18', label: 'Odoo 18' },
  { value: '19', label: 'Odoo 19' },
];
