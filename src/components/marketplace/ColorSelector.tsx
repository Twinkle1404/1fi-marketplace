import type { ColorVariant } from '../../types';

interface ColorSelectorProps {
  colors: ColorVariant[];
  selectedColor: ColorVariant | null;
  onSelect: (color: ColorVariant) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  onSelect,
}: ColorSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Color Variants"
      className="flex flex-wrap items-center gap-3"
    >
      {colors.map((color) => {
        const isSelected = selectedColor?.label === color.label;
        return (
          <button
            key={color.label}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`${color.label}${isSelected ? ' (Selected)' : ''}`}
            title={color.label}
            onClick={() => onSelect(color)}
            className={`group relative flex h-10 w-10 items-center justify-center rounded-[var(--radius-pill)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
              isSelected
                ? 'ring-2 ring-offset-2 ring-[var(--color-primary)] scale-105'
                : 'hover:scale-105 hover:ring-1 hover:ring-gray-300'
            }`}
          >
            <span
              className="h-7 w-7 rounded-[var(--radius-pill)] border border-black/15 shadow-inner transition-transform"
              style={{ backgroundColor: color.hex }}
            />
            {isSelected && (
              <span className="sr-only"> (Selected)</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
