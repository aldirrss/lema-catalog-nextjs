import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ArticleDetailClient from '@/components/articles/ArticleDetailClient';
import type { ArticleDetail } from '@/types/article';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lemacore.com';
const ODOO_BASE_URL = process.env.ODOO_BASE_URL ?? 'http://localhost:8069';

// ── Server-side data fetch ────────────────────────────────────────────────────

async function fetchArticle(slug: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`${ODOO_BASE_URL}/api/articles/${slug}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}

// ── Dynamic Metadata ──────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  const title = article.name;
  const description = article.body_preview
    ? article.body_preview.slice(0, 155).trim() + (article.body_preview.length > 155 ? '...' : '')
    : `Read ${article.name} in the Lema Core Technologies knowledge base.`;

  const canonicalUrl = `${BASE_URL}/articles/${slug}`;

  const breadcrumbTitle = article.breadcrumbs.length > 1
    ? article.breadcrumbs.map(b => b.name).join(' › ')
    : title;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: `${title} | Lema Core Technologies`,
      description,
      url: canonicalUrl,
      siteName: 'Lema Core Technologies',
      publishedTime: article.create_date ?? undefined,
      modifiedTime: article.write_date ?? undefined,
      authors: ['Lema Core Technologies'],
      tags: article.parent_name ? [article.parent_name, 'Odoo', 'Knowledge Base'] : ['Odoo', 'Knowledge Base'],
    },
    twitter: {
      card: 'summary',
      title: `${title} | LemaCore`,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    other: {
      // Breadcrumb hint for Google
      'article:section': article.parent_name ?? 'Knowledge Base',
    },
  };
}

// ── Structured Data helpers ───────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function ArticleJsonLd({ article, slug }: { article: ArticleDetail; slug: string }) {
  const canonicalUrl = `${BASE_URL}/articles/${slug}`;

  // Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.name,
    description: article.body_preview
      ? article.body_preview.slice(0, 155).trim()
      : `Read ${article.name} in the Lema Core Technologies knowledge base.`,
    url: canonicalUrl,
    datePublished: article.create_date ?? undefined,
    dateModified: article.write_date ?? undefined,
    author: {
      '@type': 'Organization',
      name: 'Lema Core Technologies',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lema Core Technologies',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: article.parent_name ?? 'Knowledge Base',
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Lema Core Technologies',
      url: BASE_URL,
    },
    ...(article.body ? { articleBody: stripHtml(article.body).slice(0, 500) } : {}),
  };

  // BreadcrumbList structured data
  const breadcrumbSchema = article.breadcrumbs.length > 1 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Articles',
        item: `${BASE_URL}/articles`,
      },
      ...article.breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${BASE_URL}/articles/${crumb.slug}`,
      })),
    ],
  } : null;

  // TechArticle for technical/Odoo content
  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.name,
    url: canonicalUrl,
    dateModified: article.write_date ?? undefined,
    author: { '@type': 'Organization', name: 'Lema Core Technologies', url: BASE_URL },
    proficiencyLevel: 'Beginner',
    about: {
      '@type': 'SoftwareApplication',
      name: 'Odoo',
      operatingSystem: 'Any',
      applicationCategory: 'BusinessApplication',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }}
      />
    </>
  );
}

// ── SEO-visible static content ────────────────────────────────────────────────
// This renders in the HTML that Google crawls — no JavaScript required

function ArticleStaticContent({ article }: { article: ArticleDetail }) {
  return (
    <div
      id="article-seo-content"
      style={{
        position: 'absolute',
        width: '1px', height: '1px',
        overflow: 'hidden', clip: 'rect(0,0,0,0)',
        whiteSpace: 'nowrap', pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      {/* Breadcrumb — static, crawlable */}
      {article.breadcrumbs.length > 1 && (
        <nav aria-label="breadcrumb">
          <ol>
            <li><a href="/articles">Articles</a></li>
            {article.breadcrumbs.map(c => (
              <li key={c.id}><a href={`/articles/${c.slug}`}>{c.name}</a></li>
            ))}
          </ol>
        </nav>
      )}

      {/* Article content — static, crawlable */}
      <article>
        <h1>{article.name}</h1>
        {article.write_date && (
          <time dateTime={article.write_date}>
            {new Date(article.write_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        )}
        {article.parent_name && <span>{article.parent_name}</span>}

        {/* Body HTML — rendered server-side, fully crawlable */}
        {article.body && (
          <div dangerouslySetInnerHTML={{ __html: article.body }} />
        )}

        {/* Sub-articles — crawlable links */}
        {article.children.length > 0 && (
          <section>
            <h2>Sub-articles</h2>
            <ul>
              {article.children.map(child => (
                <li key={child.id}>
                  <a href={`/articles/${child.slug}`}>
                    {child.name}
                    {child.body_preview && ` — ${child.body_preview.slice(0, 100)}`}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ArticleDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const article = await fetchArticle(slug);

  if (!article) notFound();

  return (
    <>
      {/* Structured data — injected in <head> via Next.js */}
      <ArticleJsonLd article={article} slug={slug} />

      {/* Static SEO content — visible to crawlers, hidden from users */}
      <ArticleStaticContent article={article} />

      {/* Interactive client component — sidebar, navigation, animations */}
      <ArticleDetailClient initialArticle={article} initialSlug={slug} />
    </>
  );
}
