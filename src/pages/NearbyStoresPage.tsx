export default function NearbyStoresPage() {
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
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>

      <h2
        className="text-[18px] font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Nearby Stores
      </h2>

      <p
        className="mt-2 max-w-[260px] text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Stores near your location will be listed here. Stay tuned for updates.
      </p>
    </div>
  );
}
