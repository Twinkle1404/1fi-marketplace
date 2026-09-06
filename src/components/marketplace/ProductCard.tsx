import { Link } from 'react-router-dom';
import type { Product } from '../../types';
import ProductImage from '../ui/ProductImage';
import { formatPrice } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
}

function getDisplayPrice(product: Product): number {
  const inStockVariants = product.variants.filter((v) => v.inStock);
  if (inStockVariants.length > 0) {
    return Math.min(...inStockVariants.map((v) => v.price));
  }
  return product.basePrice;
}

function hasNoCostEmi(product: Product): boolean {
  return product.emiPlans.some((plan) => plan.interestRate === 0);
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getDisplayPrice(product);
  const variantCount = product.variants.length;
  const showEmiBadge = hasNoCostEmi(product);

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > price);
  const savings = hasDiscount && product.originalPrice ? product.originalPrice - price : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-gray-200 bg-[var(--color-bg)] transition-all duration-200 hover:border-[var(--color-primary-disabled)] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
      aria-label={`${product.name} by ${product.brand}, ${formatPrice(price)}${hasDiscount && product.originalPrice ? `, original price ${formatPrice(product.originalPrice)}, save ${formatPrice(savings)}` : ''}`}
    >
      {/* Image section with pinned No-cost EMI badge */}
      <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-primary-light)]">
        <ProductImage
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="transition-transform duration-300 group-hover:scale-105"
          containerClassName="w-full h-full"
        />

        {/* Pinned No-cost EMI badge on top-left corner */}
        {showEmiBadge && (
          <span
            className="absolute left-2.5 top-2.5 z-10 rounded-[var(--radius-pill)] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-tight shadow-sm"
            style={{
              backgroundColor: 'var(--color-success-bg)',
              color: 'var(--color-success-text)',
            }}
          >
            No-cost EMI
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:p-4">
        <div>
          <p
            className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {product.brand}
          </p>

          <h3
            className="mt-1 text-[14px] sm:text-[15px] font-bold leading-snug line-clamp-2"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h3>
        </div>

        {/* Price and variant metadata */}
        <div className="mt-3 pt-2 border-t border-gray-100/80">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span
              className="text-[15px] sm:text-[17px] font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {formatPrice(price)}
            </span>

            {hasDiscount && product.originalPrice && (
              <span
                className="text-[11px] sm:text-[12px] font-medium line-through"
                style={{ color: 'var(--color-strikethrough)' }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}

            {hasDiscount && (
              <span
                className="inline-flex items-center rounded-[var(--radius-pill)] px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-tight leading-none"
                style={{
                  backgroundColor: 'var(--color-success-bg)',
                  color: 'var(--color-success-text)',
                }}
              >
                Save {formatPrice(savings)}
              </span>
            )}
          </div>

          <div
            className="mt-1 flex items-center justify-between text-[11px] sm:text-[12px] font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            <span>
              {variantCount} {variantCount === 1 ? 'variant' : 'variants'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
