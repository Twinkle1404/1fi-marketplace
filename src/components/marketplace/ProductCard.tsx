import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
}

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
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
  const [imgError, setImgError] = useState(false);
  const price = getDisplayPrice(product);
  const variantCount = product.variants.length;
  const showEmiBadge = hasNoCostEmi(product);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block overflow-hidden rounded-[var(--radius-md)] transition-shadow hover:shadow-md"
      style={{
        backgroundColor: 'var(--color-bg)',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
      }}
      aria-label={`${product.name} by ${product.brand}, ${formatPrice(price)}`}
    >
      {/* Image section */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        {!imgError ? (
          <img
            src={product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary-disabled)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* No-cost EMI badge */}
        {showEmiBadge && (
          <span
            className="absolute left-2 top-2 rounded-[var(--radius-sm)] px-2 py-1 text-[10px] font-semibold text-white"
            style={{ backgroundColor: 'var(--color-success)' }}
          >
            No-cost EMI
          </span>
        )}
      </div>

      {/* Product info */}
      <div className="px-3 pb-3 pt-2.5">
        <p
          className="text-[11px] font-medium uppercase tracking-wide"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {product.brand}
        </p>

        <h3
          className="mt-0.5 line-clamp-2 text-[14px] font-semibold leading-snug"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {product.name}
        </h3>

        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-1">
          <span
            className="text-[15px] font-bold sm:text-[16px]"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {formatPrice(price)}
          </span>

          <span
            className="text-[11px] shrink-0"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {variantCount} {variantCount === 1 ? 'variant' : 'variants'}
          </span>
        </div>
      </div>
    </Link>
  );
}
