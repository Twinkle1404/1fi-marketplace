import type { EMIPlan } from '../../types';
import EMIPlanCard from './EMIPlanCard';

interface EMIPlanListProps {
  plans: EMIPlan[];
  selectedPlanId: string;
  onSelect: (plan: EMIPlan) => void;
  savings?: number;
}

export default function EMIPlanList({ plans, selectedPlanId, onSelect, savings }: EMIPlanListProps) {
  return (
    <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="EMI Plans">
      {plans.map((plan) => (
        <EMIPlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedPlanId}
          onSelect={() => onSelect(plan)}
          savings={savings}
        />
      ))}
    </div>
  );
}
