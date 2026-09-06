import { useMemo, useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/marketplace/ProductGrid';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import SectionLabel from '../components/ui/SectionLabel';

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
          <SectionLabel
            as="span"
            title="Curated Electronics & Appliances"
            className="mb-1.5"
          />

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
            className="w-full rounded-[var(--radius-pill)] border border-gray-200 bg-[var(--color-bg)] py-3 pl-11 pr-10 text-[14px] shadow-sm transition-all focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)]"
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

        {!loading && !error && products.length === 0 && (
          <EmptyState
            title="No products available"
            description="We are currently stocking new products. Please check back soon or try again."
            action={
              <button
                type="button"
                onClick={refetch}
                className="rounded-[var(--radius-pill)] px-7 py-2.5 text-[14px] font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
                style={{ backgroundColor: 'var(--color-primary)' }}
              >
                Refresh
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

        {!loading && !error && products.length > 0 && filtered.length === 0 && (
          <EmptyState
            title="No products found"
            description={`No products match "${search}". Try searching with a different product or brand name.`}
            action={
              <button
                type="button"
                onClick={() => setSearch('')}
                className="rounded-[var(--radius-pill)] px-6 py-2.5 text-[13px] font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
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
                <line x1="8" y1="11" x2="14" y2="11" />
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
