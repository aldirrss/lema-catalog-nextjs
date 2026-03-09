// ============================================================
// Forum Discuss Types
// ============================================================

export interface DiscussModule {
  id: number;
  name: string;
  slug: string;
  technical_name?: string;
}

export interface DiscussReply {
  id: number;
  thread_id: number;
  parent_reply_id: number | null;
  body: string;
  author_name: string;
  created_date: string;
}

export interface DiscussThread {
  id: number;
  title: string;
  body: string;
  author_name: string;
  state: 'open' | 'closed';
  pinned: boolean;
  reply_count: number;
  created_date: string;
  tagged_modules: DiscussModule[];
  replies: DiscussReply[];
}

export interface DiscussThreadsMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface DiscussListResponse {
  success: boolean;
  data: DiscussThread[];
  meta: DiscussThreadsMeta;
}

// Session-stored user identity (no login needed)
export interface DiscussUserSession {
  name: string;
  email: string;
}
