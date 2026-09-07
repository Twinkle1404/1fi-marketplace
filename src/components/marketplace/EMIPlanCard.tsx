import type { EMIPlan } from '../../types';
import { formatPrice } from '../../utils/formatters';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: () => void;
  savings?: number;
}

export default function EMIPlanCard({ plan, isSelected, onSelect, savings }: EMIPlanCardProps) {
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
      className={`plan-row ${isSelected ? 'selected' : ''}`}
    >
      <div className="plan-left">
        <div className="radio" aria-hidden="true">
          <div className="radio-dot" />
        </div>

        <div className="plan-info">
          <div className="amount">
            {formatPrice(plan.monthlyAmount)}/mo
          </div>
          <div className="interest">
            {isNoCost ? 'No-cost EMI' : `${plan.interestRate}% interest`} • {plan.tenureMonths} mos
          </div>
        </div>
      </div>

      {/* Right Badge: Cashback or No-cost EMI */}
      {plan.cashback && plan.cashback > 0 ? (
        <span className="cashback-pill">
          {formatPrice(plan.cashback)} CASHBACK
        </span>
      ) : isNoCost ? (
        <span className="cashback-pill">
          0% INTEREST
        </span>
      ) : savings && savings > 0 ? (
        <span className="cashback-pill">
          SAVE {formatPrice(savings)}
        </span>
      ) : null}
    </div>
  );
}
