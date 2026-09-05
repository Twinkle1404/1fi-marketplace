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
      className="group relative cursor-pointer rounded-[var(--radius-md)] border-2 p-3.5 transition-all duration-200 focus:outline-none"
      style={{
        backgroundColor: isSelected ? 'rgba(237, 232, 255, 0.35)' : 'var(--color-bg)',
        borderColor: isSelected ? 'var(--color-primary)' : '#E5E7EB',
        boxShadow: isSelected ? '0 2px 12px rgba(113, 45, 220, 0.12)' : 'none',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          {/* Tenure and No-cost badge */}
          <div className="flex items-center gap-2">
            <span
              className="text-[15px] font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {plan.tenureMonths} months
            </span>
            {isNoCost && (
              <span
                className="rounded-[var(--radius-sm)] px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: 'var(--color-success)' }}
              >
                No-cost EMI
              </span>
            )}
          </div>

          {/* Monthly amount */}
          <div className="mt-1.5 flex items-baseline gap-1">
            <span
              className="text-[18px] font-bold tracking-tight"
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
            className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px]"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span>Total payable: <strong className="font-semibold text-[var(--color-text-primary)]">{formatPrice(plan.totalPayable)}</strong></span>
            <span>•</span>
            <span>{isNoCost ? '0% interest' : `${plan.interestRate}% interest`}</span>
          </div>
        </div>

        {/* Radio Indicator */}
        <div
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-200"
          style={{
            borderColor: isSelected ? 'var(--color-primary)' : '#D1D5DB',
            backgroundColor: isSelected ? 'var(--color-primary)' : 'transparent',
          }}
          aria-hidden="true"
        >
          {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
        </div>
      </div>
    </div>
  );
}
