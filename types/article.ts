// ============================================================
// Knowledge Article Types
// ============================================================

export interface ArticleSummary {
  id: number;
  slug: string;         // 100-char HMAC hash — use this for all URLs
  name: string;
  icon: string;
  body_preview: string;
  parent_id: number | null;
  parent_slug: string | null;
  parent_name: string | null;
  child_count: number;
  sequence: number;
  write_date: string | null;
  create_date: string | null;
  is_published: boolean;
}

export interface ArticleBreadcrumb {
  id: number;
  slug: string;
  name: string;
}

export interface ArticleDetail extends ArticleSummary {
  body: string;
  breadcrumbs: ArticleBreadcrumb[];
  children: ArticleSummary[];
}

/** Recursive tree node (used for sidebar) */
export interface ArticleTreeNode extends ArticleSummary {
  children: ArticleTreeNode[];
}

export interface ArticleListResponse {
  success: boolean;
  data: ArticleSummary[];
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export interface ArticleTreeResponse {
  success: boolean;
  data: ArticleTreeNode[];
}

export interface ArticleDetailResponse {
  success: boolean;
  data: ArticleDetail;
}

export type ArticleViewMode = 'card' | 'list';
