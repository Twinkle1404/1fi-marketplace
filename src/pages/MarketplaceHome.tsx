import { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/marketplace/ProductGrid';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';

export default function MarketplaceHome() {
  const { products, loading, error, refetch } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q),
    );
  }, [products, search]);

  return (
    <div className="w-full">
      {/* ── Header with Section Marker & Responsive Search ── */}
      <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="h-3.5 w-1 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
              aria-hidden="true"
            />
            <span
              className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.05em]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Curated Electronics &amp; Appliances
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            1Fi Marketplace
          </h2>
          <p
            className="mt-1 text-sm sm:text-base leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Shop your favourite products with flexible EMI options.
          </p>
        </div>

        {/* ── Search Bar ── */}
        <div className="relative w-full md:w-80 lg:w-96">
          <svg
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-icon-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products or brands..."
            aria-label="Search products"
            className="w-full rounded-[var(--radius-pill)] border border-[#E5E7EB] bg-white py-3 pl-11 pr-10 text-[14px] shadow-sm transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
            style={{ color: 'var(--color-text-primary)' }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear search query"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors text-[11px] font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div>
        {loading && <Skeleton />}

        {!loading && error && <ErrorState onRetry={refetch} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            title="No products found"
            description="Try searching with a different product or brand name."
            action={
              <button
                type="button"
                onClick={() => setSearch('')}
                className="rounded-[var(--radius-pill)] px-6 py-2.5 text-[13px] font-bold text-white shadow-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Clear search
              </button>
            }
            icon={
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
                <path d="M8 11h6" />
              </svg>
            }
          />
        )}

        {!loading && !error && filtered.length > 0 && (
          <ProductGrid products={filtered} />
        )}
      </div>
    </div>
  );
}
