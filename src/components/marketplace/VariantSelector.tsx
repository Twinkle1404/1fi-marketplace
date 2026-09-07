import type { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Product Variants">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        const isOutOfStock = !variant.inStock;

        if (isOutOfStock) {
          return (
            <button
              key={variant.id}
              type="button"
              disabled
              role="radio"
              aria-checked={false}
              aria-disabled="true"
              className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-gray-300 px-3 py-1.5 text-xs font-medium opacity-50 cursor-not-allowed bg-gray-50 text-gray-400"
            >
              <span>{variant.label}</span>
              <span className="text-[9px] font-bold text-red-500">
                Out of stock
              </span>
            </button>
          );
        }

        return (
          <button
            key={variant.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(variant)}
            className="inline-flex items-center justify-center rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            style={{
              backgroundColor: isSelected ? 'var(--color-primary)' : '#FFFFFF',
              color: isSelected ? '#FFFFFF' : 'var(--color-text-primary)',
              borderColor: isSelected ? 'var(--color-primary)' : '#E5E7EB',
              boxShadow: isSelected ? '0 2px 8px rgba(113, 45, 220, 0.20)' : 'none',
            }}
          >
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
