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
  caption?: string;
}

export type OdooVersion = '8' | '9' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19';

export const ODOO_VERSIONS: { value: OdooVersion; label: string }[] = [
  { value: '8', label: 'Odoo 8' },
  { value: '9', label: 'Odoo 9' },
  { value: '10', label: 'Odoo 10' },
  { value: '11', label: 'Odoo 11' },
  { value: '12', label: 'Odoo 12' },
  { value: '13', label: 'Odoo 13' },
  { value: '14', label: 'Odoo 14' },
  { value: '15', label: 'Odoo 15' },
  { value: '16', label: 'Odoo 16' },
  { value: '17', label: 'Odoo 17' },
  { value: '18', label: 'Odoo 18' },
  { value: '19', label: 'Odoo 19' },
];

export interface ModuleVersion {
  id: number;
  odoo_version: OdooVersion;
  download_url: string;
  notes: string;
}

export interface Module {
  id: number;
  name: string;
  slug: string;
  technical_name: string;
  short_description: string;
  /** Array of supported versions with download links */
  versions: ModuleVersion[];
  /** Flat array of version numbers e.g. ['17', '18'] — for filtering */
  odoo_versions: OdooVersion[];
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

export interface ReleaseNote {
  id: number;
  version: string;
  release_date: string | null;
  notes: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  sequence: number;
}

export interface ModuleFeedback {
  id: number;
  author_name: string;
  rating: number;
  comment: string;
  created_date: string;
}

export interface ModuleDetail extends Module {
  description: string;
  license: string;
  features: Feature[];
  screenshots: Screenshot[];
  release_notes: ReleaseNote[];
  faqs: FAQ[];
  feedbacks: ModuleFeedback[];
  feedback_count: number;
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