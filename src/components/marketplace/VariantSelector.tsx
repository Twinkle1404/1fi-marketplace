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
    <div className="storage-row" role="radiogroup" aria-label="Product Variants">
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
              className="storage-pill"
              style={{ opacity: 0.5, cursor: 'not-allowed', borderColor: '#E5E7EB', color: 'var(--text-light)' }}
            >
              <span>{variant.label} (Out of stock)</span>
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
            className={`storage-pill ${isSelected ? 'selected' : ''}`}
          >
            <span>{variant.label}</span>
          </button>
        );
      })}
    </div>
  );
}
