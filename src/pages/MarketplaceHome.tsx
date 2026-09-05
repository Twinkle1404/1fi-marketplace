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
    <div>
      {/* ── Header ── */}
      <h2
        className="text-[22px] font-bold leading-tight"
        style={{ color: 'var(--color-text-primary)' }}
      >
        1Fi Marketplace
      </h2>
      <p
        className="mt-1 text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Shop your favourite products with flexible EMI options.
      </p>

      {/* ── Search ── */}
      <div className="relative mt-4">
        <svg
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
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
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full rounded-[var(--radius-pill)] py-3 pl-10 pr-4 text-[14px] transition-shadow focus:shadow-md"
          style={{
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-primary)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="mt-5">
        {loading && <Skeleton />}

        {!loading && error && <ErrorState onRetry={refetch} />}

        {!loading && !error && filtered.length === 0 && (
          <EmptyState
            title="No products found"
            description="Try searching with a different product or brand."
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
