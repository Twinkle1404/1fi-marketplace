import { useEffect } from 'react';
import { formatPrice } from '../../utils/formatters';

interface ConfirmationModalProps {
  isOpen: boolean;
  productName: string;
  variantLabel: string;
  colorLabel?: string;
  colorHex?: string;
  tenureMonths: number;
  monthlyAmount: number;
  productPrice: number;
  totalPayable: number;
  interestRate?: number;
  cashback?: number;
  onClose: () => void;
  onDone: () => void;
}

export default function ConfirmationModal({
  isOpen,
  productName,
  variantLabel,
  colorLabel,
  colorHex,
  tenureMonths,
  monthlyAmount,
  productPrice,
  totalPayable,
  interestRate,
  cashback,
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
        className="relative z-10 w-full max-w-[440px] rounded-t-[var(--radius-lg)] sm:rounded-[var(--radius-lg)] bg-[var(--color-bg)] p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300"
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
            className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full shadow-sm"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          >
            <svg
              width="28"
              height="28"
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
            Your plan is confirmed!
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
          className="mt-5 rounded-[var(--radius-md)] p-4 space-y-3"
          style={{ backgroundColor: 'var(--color-bg-subtle)' }}
        >
          {/* Product Header */}
          <div className="border-b border-gray-200/80 pb-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span
                  className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  Selected Product
                </span>
                <h4
                  className="mt-0.5 text-[15px] font-bold leading-snug"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {productName}
                </h4>
              </div>
              <span
                className="shrink-0 rounded-[var(--radius-sm)] px-2 py-0.5 text-[11px] font-semibold tracking-tight"
                style={{
                  backgroundColor: 'var(--color-primary-light)',
                  color: 'var(--color-primary)',
                }}
              >
                {variantLabel}
              </span>
            </div>

            {/* Color / Finish (when applicable) */}
            {colorLabel && (
              <div className="mt-2 flex items-center justify-between text-[12px]">
                <span style={{ color: 'var(--color-text-secondary)' }}>Color / Finish</span>
                <span className="inline-flex items-center gap-1.5 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                  {colorHex && (
                    <span
                      className="inline-block h-3 w-3 rounded-full border border-black/15 shadow-2xs"
                      style={{ backgroundColor: colorHex }}
                      aria-hidden="true"
                    />
                  )}
                  {colorLabel}
                </span>
              </div>
            )}

            {/* Total / Current Product Price */}
            <div className="mt-1.5 flex items-center justify-between text-[12px]">
              <span style={{ color: 'var(--color-text-secondary)' }}>Product Price</span>
              <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {formatPrice(productPrice)}
              </span>
            </div>
          </div>

          {/* Selected EMI Plan & Monthly Amount */}
          <div className="grid grid-cols-2 gap-3 pt-0.5">
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
                Selected Plan
              </span>
              <p
                className="text-[14px] font-bold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {tenureMonths} Months
              </p>
              {interestRate !== undefined && (
                <p className="text-[10px] font-medium text-[var(--color-text-secondary)]">
                  {interestRate === 0 ? 'No-cost EMI (0%)' : `${interestRate}% interest`}
                </p>
              )}
            </div>
          </div>

          {/* Cashback Amount (when applicable) */}
          {cashback !== undefined && cashback > 0 && (
            <div
              className="flex items-center justify-between rounded-[var(--radius-sm)] px-2.5 py-1.5"
              style={{
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success-text)',
              }}
            >
              <span className="text-[11px] sm:text-[12px] font-semibold">
                Cashback applied
              </span>
              <span className="text-[12px] sm:text-[13px] font-bold">
                +{formatPrice(cashback)}
              </span>
            </div>
          )}

          {/* Total Payable */}
          <div className="border-t border-gray-200/80 pt-3 flex items-center justify-between">
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

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={onDone}
            className="w-full rounded-[var(--radius-pill)] py-3 text-[14px] font-bold text-white shadow-md transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            Return to Marketplace
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-[var(--radius-pill)] py-2 text-[13px] font-semibold transition-colors hover:bg-gray-100"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Back to Product
          </button>
        </div>
      </div>
    </div>
  );
}
