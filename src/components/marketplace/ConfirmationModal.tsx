import { useEffect } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  productName: string;
  variantLabel: string;
  tenureMonths: number;
  monthlyAmount: number;
  totalPayable: number;
  onClose: () => void;
  onDone: () => void;
}

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function ConfirmationModal({
  isOpen,
  productName,
  variantLabel,
  tenureMonths,
  monthlyAmount,
  totalPayable,
  onClose,
  onDone,
}: ConfirmationModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-title"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
    >
      {/* Backdrop click */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal / Sheet Container */}
      <div
        className="relative z-10 w-full max-w-[430px] rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)] bg-[var(--color-bg)] p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
        style={{
          backgroundColor: 'var(--color-bg)',
        }}
      >
        {/* Close icon button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3
            id="confirmation-title"
            className="text-[20px] font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Your plan is confirmed
          </h3>

          <p
            className="mt-1 text-[13px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Here is a summary of your selected purchase plan
          </p>
        </div>

        {/* Summary Card */}
        <div
          className="mt-5 rounded-[var(--radius-md)] p-4"
          style={{ backgroundColor: 'var(--color-bg-subtle)' }}
        >
          <div className="border-b border-gray-200/80 pb-3">
            <span
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Product
            </span>
            <div className="mt-0.5 flex items-baseline justify-between gap-2">
              <h4
                className="text-[15px] font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {productName}
              </h4>
              <span
                className="shrink-0 rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px] font-medium"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                }}
              >
                {variantLabel}
              </span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Monthly EMI
              </span>
              <p
                className="text-[16px] font-bold"
                style={{ color: 'var(--color-primary)' }}
              >
                {formatPrice(monthlyAmount)}/mo
              </p>
            </div>
            <div>
              <span
                className="text-[11px] font-medium"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                Tenure
              </span>
              <p
                className="text-[16px] font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {tenureMonths} months
              </p>
            </div>
          </div>

          <div className="mt-3 border-t border-gray-200/80 pt-3 flex items-center justify-between">
            <span
              className="text-[13px] font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Total payable
            </span>
            <span
              className="text-[16px] font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {formatPrice(totalPayable)}
            </span>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onDone}
            className="w-full rounded-[var(--radius-pill)] py-3.5 text-[15px] font-semibold text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
