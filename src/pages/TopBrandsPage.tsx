export default function TopBrandsPage() {
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
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>

      <h2
        className="text-[18px] font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Top Brands
      </h2>

      <p
        className="mt-2 max-w-[260px] text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Your favourite brands and exclusive deals will appear here soon.
      </p>
    </div>
  );
}
