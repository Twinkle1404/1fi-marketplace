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
    <div className="flex flex-wrap gap-2.5 sm:gap-3" role="radiogroup" aria-label="Product Variants">
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
              className="flex items-center gap-2 rounded-[var(--radius-pill)] border border-dashed border-gray-300 px-4 py-2 sm:py-2.5 text-[13px] font-medium opacity-50 cursor-not-allowed"
              style={{
                backgroundColor: 'var(--color-bg-subtle)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <span>{variant.label}</span>
              <span className="rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-500">
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
            className="flex items-center gap-1.5 rounded-[var(--radius-pill)] border px-4 py-2 sm:px-5 sm:py-2.5 text-[13px] sm:text-[14px] transition-all duration-200 hover:border-[#CFC0F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            style={{
              backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg)',
              color: isSelected ? '#FFFFFF' : 'var(--color-text-primary)',
              borderColor: isSelected ? 'var(--color-primary)' : '#E5E7EB',
              boxShadow: isSelected ? '0 3px 12px rgba(113, 45, 220, 0.28)' : 'none',
              fontWeight: isSelected ? 700 : 500,
            }}
          >
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
