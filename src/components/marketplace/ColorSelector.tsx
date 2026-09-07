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
      className="swatches"
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
            className={`color-swatch ${isSelected ? 'selected' : ''}`}
            style={{ backgroundColor: color.hex }}
          >
            {isSelected && <span className="sr-only"> (Selected)</span>}
          </button>
        );
      })}
    </div>
  );
}
