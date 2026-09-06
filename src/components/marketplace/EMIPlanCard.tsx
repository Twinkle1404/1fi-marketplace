import type { EMIPlan } from '../../types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
}

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  const isNoCost = plan.interestRate === 0;

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group relative cursor-pointer rounded-[var(--radius-md)] border-2 p-4 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      style={{
        backgroundColor: isSelected ? 'var(--color-primary-light)' : 'var(--color-bg)',
        borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-icon-muted)',
        boxShadow: isSelected ? '0 4px 16px rgba(113, 45, 220, 0.12)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* Tenure and No-cost badge */}
          <div className="flex items-center gap-2">
            <span
              className="text-[15px] font-bold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {plan.tenureMonths} Months
            </span>
            {isNoCost && (
              <span
                className="rounded-[var(--radius-pill)] px-2.5 py-0.5 text-[10px] font-bold tracking-tight shadow-sm"
                style={{
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success-text)',
                }}
              >
                No-cost EMI
              </span>
            )}
          </div>

          {/* Monthly amount */}
          <div className="mt-1.5 flex items-baseline gap-1">
            <span
              className="text-[20px] font-bold tracking-tight"
              style={{ color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)' }}
            >
              {formatPrice(plan.monthlyAmount)}
            </span>
            <span
              className="text-[12px] font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              / month
            </span>
          </div>

          {/* Total payable and Interest rate */}
          <div
            className="mt-2.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span>Total payable: <strong className="font-semibold text-[var(--color-text-primary)]">{formatPrice(plan.totalPayable)}</strong></span>
            <span>•</span>
            <span className={isNoCost ? 'font-semibold text-[var(--color-success)]' : ''}>
              {isNoCost ? '0% interest' : `${plan.interestRate}% interest`}
            </span>
          </div>
        </div>

        {/* Radio Indicator with Checkmark for selected state (border + tint + checkmark) */}
        <div
          className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200"
          style={{
            borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-icon-muted)',
            backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
          }}
          aria-hidden="true"
        >
          {isSelected && (
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-bg)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
