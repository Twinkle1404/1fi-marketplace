interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function ErrorState({
  title = 'Unable to load products',
  message = 'Please check your connection and try again.',
  onRetry,
  retryLabel = 'Retry',
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center py-14 text-center">
      {/* Error icon */}
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
        style={{ backgroundColor: 'rgba(235, 87, 87, 0.12)' }}
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
        className="text-[18px] font-bold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </h3>

      <p
        className="mt-1.5 max-w-sm text-[14px] leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-[var(--radius-pill)] px-8 py-2.5 text-[14px] font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
