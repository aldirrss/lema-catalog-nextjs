# Copilot Instructions — Lema Catalog

## Quick Commands

### Development
- **Dev server**: `npm run dev` — Starts on http://localhost:3000
- **Build**: `npm run build`
- **Production start**: `npm start`
- **Lint**: `next lint` — ESLint configured via Next.js

### Project Setup
- **Node version**: ^16 (uses modern ES2017 target)
- **Package manager**: npm
- **Type checking**: Built-in via `next build` (no separate TypeScript compilation needed)

## Architecture & Key Concepts

### Data Flow: Server Components + API Proxies
This is an **all-server-side** data architecture:
1. **Server Components** (in `src/app/`) fetch directly from Odoo backend during SSR
2. **Client Components** (marked with `'use client'`) only render UI and never make direct API calls to Odoo
3. **API Routes** (`src/app/api/`) act as proxies that forward requests to Odoo backend

**Why**: Odoo URL and credentials stay server-side; they're never exposed to the browser.

### Caching Strategy (ISR + On-Demand Revalidation)
- **Default ISR**: All Odoo data fetches use `revalidate: 300` (5-minute fallback)
- **Cache tags**: Each fetch is tagged for granular invalidation
- **On-demand**: `POST /api/revalidate` with correct `REVALIDATE_SECRET` triggers immediate cache clear
- **Use case**: Odoo webhook posts to this endpoint when module data changes

### Project Structure
```
src/
  app/              # Next.js 13+ App Router (server + client pages)
  components/       # UI components organized by feature (catalog, home, etc.)
  lib/              # Utilities:
                    #   - odoo.ts: Odoo API client with server-side fetching
                    #   - utils.ts: Helpers (formatPrice, etc.)
  types/            # TypeScript interfaces (Module, Category, etc.)
  hooks/            # Custom React hooks (like useLang for i18n)
```

### Styling
- **Tailwind CSS** v3.4+ with dark mode support (`darkMode: 'class'`)
- **Custom CSS vars**: Components use `var(--text-primary)`, `var(--bg-page)`, etc.
- **Brand colors**: Extended theme in `tailwind.config.js` (brand palette + surface variants)
- **CSS Modules**: Not used; prefer inline Tailwind or CSS variables

### API Routes Pattern
Routes in `src/app/api/` follow this pattern:
1. Use `NextRequest` and `NextResponse` from Next.js
2. Forward requests to Odoo backend (environment variable `ODOO_BASE_URL`)
3. Return JSON responses with appropriate status codes
4. Always use `cache: 'no-store'` for mutations or time-sensitive data

### Environment Variables
**Server-side only** (never leak to browser):
- `ODOO_BASE_URL` — Odoo backend URL (http://localhost:8069 by default)
- `REVALIDATE_SECRET` — Token for on-demand revalidation webhook

**Public to browser** (prefixed with `NEXT_PUBLIC_`):
- `NEXT_PUBLIC_ODOO_BASE_URL` — For image URLs in `next.config.js`
- `NEXT_PUBLIC_SITE_URL` — Current site URL for metadata

## Key Conventions

### Naming & Imports
- **Path alias**: Use `@/` to import from `src/` root (e.g., `@/types`, `@/lib/odoo`)
- **Component filenames**: PascalCase (e.g., `ModuleCard.tsx`, `CatalogFiltersBar.tsx`)
- **Utility filenames**: camelCase (e.g., `odoo.ts`, `utils.ts`)

### Component Organization
- **'use client' boundary**: Keep at leaf level; parent server components can compose client children
- **Props typing**: Always define explicit types (avoid `any`); use TypeScript interfaces from `@/types`
- **Image handling**: Use Next.js `Image` component with `fill` + `sizes` for responsive images
- **Error handling**: Server components `.catch(() => fallback)` for resilience; wrap async fetches in try-catch

### Fetch Patterns
**In Server Components:**
```typescript
const data = await someFunction().catch(() => defaultValue);
```

**In API Routes:**
```typescript
const res = await fetch(url, { cache: 'no-store' });
if (!res.ok) throw new Error(`${res.status}`);
```

### Type Safety
- All API responses are strictly typed (see `@/types/index.ts`)
- Module type includes: `id`, `slug`, `name`, `price`, `rating`, `versions`, `cover_image_url`, etc.
- Use `ApiListResponse<T>` for paginated lists, `ApiSingleResponse<T>` for single items

## Linting & Type Checking

- **ESLint**: Configured by Next.js; run `next lint`
- **TypeScript**: Strict mode enabled (`strict: true`); errors caught at build time
- **No dedicated test framework**: Currently no Jest/Vitest configuration
- **Build validation**: Always run `npm run build` before committing to catch TS errors early

## Common Tasks

### Adding a New API Route
1. Create file in `src/app/api/<feature>/route.ts`
2. Export async function (`GET`, `POST`, etc.)
3. Use `NextRequest` / `NextResponse`
4. Forward to Odoo if needed; handle errors gracefully

### Adding a New Component
1. Create in `src/components/<feature>/ComponentName.tsx`
2. If interactive: add `'use client'` at top
3. Type props explicitly; import types from `@/types`
4. Use inline styles or Tailwind; avoid CSS files
5. Import images/utilities from `@/lib`

### Modifying Odoo Integration
1. Edit `src/lib/odoo.ts` for new data fetches
2. Add types to `src/types/index.ts` first
3. Add cache tags for new endpoints
4. Document revalidation path in comments (for webhook integration)

## Metadata & SEO

- Server components export `Metadata` from `next/metadata`
- Static metadata in `layout.tsx`; dynamic in page components
- Also define `manifest.ts`, `sitemap.ts`, `robots.ts` in `src/app/`

## Important Context

**This is a module catalog**:
- Displays Odoo modules with pricing, ratings, descriptions
- Supports featured modules, category filters, search
- Free download + paid purchase workflows
- Discussion/forum section for module interactions
- About & contact pages

**External API dependency**: All data comes from Odoo backend (env `ODOO_BASE_URL`); test locally with Odoo running on port 8069 by default.

**Theme variables**: The UI responds to CSS custom properties for light/dark mode. Check `src/app/globals.css` for the complete variable list.
