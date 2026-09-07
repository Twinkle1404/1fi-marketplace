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
            className={`group relative flex h-7 w-7 items-center justify-center rounded-full transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ${
              isSelected
                ? 'ring-2 ring-offset-2 ring-[var(--color-primary)]'
                : 'hover:ring-1 hover:ring-gray-300'
            }`}
          >
            <span
              className="h-5 w-5 rounded-full border border-black/15 shadow-2xs"
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
