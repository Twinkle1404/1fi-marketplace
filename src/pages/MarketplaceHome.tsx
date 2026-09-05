export default function MarketplaceHome() {
  return (
    <div className="flex flex-col items-center py-12 text-center">
      {/* Icon */}
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
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
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      </div>

      <h2
        className="text-[18px] font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        1Fi Marketplace
      </h2>

      <p
        className="mt-2 max-w-[280px] text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Browse curated products with flexible EMI plans. Marketplace products are coming soon.
      </p>

      {/* Placeholder skeleton area */}
      <div className="mt-8 grid w-full max-w-[320px] grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="aspect-[3/4] animate-pulse rounded-[var(--radius-md)]"
            style={{ backgroundColor: 'var(--color-bg-subtle)' }}
          />
        ))}
      </div>
    </div>
  );
}
