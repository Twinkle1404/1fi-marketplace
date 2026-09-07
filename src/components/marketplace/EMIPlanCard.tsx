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
  const cashbackValue = plan.cashback || (savings && savings > 0 ? savings : undefined);

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
      className={`group relative flex items-center justify-between gap-3 cursor-pointer rounded-2xl border p-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#712DDC] ${
        isSelected
          ? 'border-[#712DDC] bg-[#FAF8FF]/60 shadow-[0_2px_12px_rgba(113,45,220,0.08)]'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex items-center gap-3.5">
        {/* Custom Radio Button matching 1Fi reference */}
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
            isSelected ? 'border-[#712DDC]' : 'border-gray-300 group-hover:border-gray-400'
          }`}
          aria-hidden="true"
        >
          {isSelected && <div className="h-2.5 w-2.5 rounded-full bg-[#712DDC]" />}
        </div>

        {/* Plan Details: Tenure × Monthly & Interest */}
        <div>
          <div className="text-[15px] font-bold text-gray-900 leading-tight">
            {formatPrice(plan.monthlyAmount)} × {plan.tenureMonths} months
          </div>
          <div className="mt-1 text-xs text-gray-400 font-normal">
            {isNoCost ? '0% interest' : `${plan.interestRate}% interest`}
            <span className="sr-only">, total payable: {formatPrice(plan.totalPayable)}</span>
          </div>
        </div>
      </div>

      {/* Right Badge: Cashback or No-cost EMI */}
      <div>
        {cashbackValue ? (
          <span className="rounded-full bg-[#EBFBF2] px-2.5 py-1 text-xs font-semibold text-[#1E7E43]">
            +{formatPrice(cashbackValue)} cashback
          </span>
        ) : isNoCost ? (
          <span className="rounded-full bg-[#EBFBF2] px-2.5 py-1 text-xs font-semibold text-[#1E7E43]">
            No-cost EMI
          </span>
        ) : null}
      </div>
    </div>
  );
}
