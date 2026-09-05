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
    <div className="flex flex-wrap gap-2.5" role="radiogroup" aria-label="Product Variants">
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
              className="flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-dashed border-gray-300 px-3.5 py-2 text-[13px] font-medium opacity-50 cursor-not-allowed transition-all"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span>{variant.label}</span>
              <span className="text-[10px] font-semibold text-red-500">Out of stock</span>
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
            className="flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-4 py-2 text-[13px] font-medium transition-all duration-200"
            style={{
              backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg)',
              color: isSelected ? '#FFFFFF' : 'var(--color-text-primary)',
              borderColor: isSelected ? 'var(--color-primary)' : '#E5E7EB',
              boxShadow: isSelected ? '0 2px 8px rgba(113, 45, 220, 0.25)' : 'none',
              fontWeight: isSelected ? 600 : 500,
            }}
          >
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
