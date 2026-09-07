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

function getLowestMonthlyEmi(product: Product): number | null {
  if (!product.emiPlans || product.emiPlans.length === 0) return null;
  return Math.min(...product.emiPlans.map((plan) => plan.monthlyAmount));
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getDisplayPrice(product);
  const lowestMonthlyEmi = getLowestMonthlyEmi(product);
  const variantSubtitle = product.variants[0]?.label;

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > price);
  const savings = hasDiscount && product.originalPrice ? product.originalPrice - price : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-3 shadow-xs transition-all duration-200 hover:border-gray-200 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#712DDC]"
      aria-label={`${product.name} by ${product.brand}, ${formatPrice(price)}${hasDiscount && product.originalPrice ? `, original price ${formatPrice(product.originalPrice)}, save ${formatPrice(savings)}` : ''}`}
    >
      {/* Light neutral image area with generous padding & centered product */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[#F7F7F8] p-2 flex items-center justify-center">
        <ProductImage
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
          containerClassName="w-full h-full flex items-center justify-center"
        />

        {product.isNew && (
          <div className="absolute left-2 top-2 z-10">
            <span className="rounded-md bg-[#D62E20] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-xs">
              NEW
            </span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col justify-between pt-2.5 pb-1 px-1">
        <div>
          <h3 className="text-[13px] sm:text-[14px] font-bold text-gray-900 leading-snug line-clamp-1">
            {product.name}
          </h3>

          {variantSubtitle && (
            <p className="mt-0.5 text-[11px] text-gray-500 truncate">
              {variantSubtitle}
            </p>
          )}

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[14px] sm:text-[15px] font-bold text-gray-900">
              {formatPrice(price)}
            </span>

            {hasDiscount && product.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Lowest EMI Pill */}
        {lowestMonthlyEmi !== null && (
          <div className="mt-2">
            <span className="inline-block rounded-full bg-[#EBFBF2] px-2.5 py-0.5 text-[11px] font-semibold text-[#1E7E43]">
              From {formatPrice(lowestMonthlyEmi)}/mo
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
