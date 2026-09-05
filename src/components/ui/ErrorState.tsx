interface ErrorStateProps {
  onRetry: () => void;
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      {/* Error icon */}
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: '#FDE8E8' }}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-error)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4" />
          <path d="M12 16h.01" />
        </svg>
      </div>

      <h3
        className="text-[17px] font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Couldn&apos;t load products
      </h3>

      <p
        className="mt-1.5 max-w-[260px] text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        Check your connection and try again.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-[var(--radius-pill)] px-8 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 active:opacity-80"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        Retry
      </button>
    </div>
  );
}
