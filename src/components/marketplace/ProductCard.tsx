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
  const plan12 = product.emiPlans.find((p) => p.tenureMonths === 12);
  if (plan12) return plan12.monthlyAmount;
  return Math.min(...product.emiPlans.map((plan) => plan.monthlyAmount));
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = getDisplayPrice(product);
  const lowestMonthlyEmi = getLowestMonthlyEmi(product);
  const variantSubtitle = product.variants[0]?.label
    ? `${product.variants[0].label}${product.colorVariants && product.colorVariants.length > 0 ? ` • ${product.colorVariants[0].label}` : ''}`
    : product.brand;

  const hasDiscount = Boolean(product.originalPrice && product.originalPrice > price);

  return (
    <Link
      to={`/marketplace/products/${product.id}`}
      className="card"
      style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
      aria-label={`${product.name} by ${product.brand}, ${formatPrice(price)}`}
    >
      <div className="card-img" style={{ position: 'relative' }}>
        {product.isNew && (
          <span
            className="badge-new"
            style={{ top: 8, left: 8, fontSize: '9.5px', padding: '3px 8px' }}
          >
            NEW
          </span>
        )}
        <ProductImage
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover"
          containerClassName="w-full h-full"
        />
      </div>

      <h3>{product.name}</h3>
      <div className="variant">{variantSubtitle}</div>

      <div className="price-row">
        <span className="price">{formatPrice(price)}</span>
        {hasDiscount && product.originalPrice && (
          <span className="price-strike">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      {lowestMonthlyEmi !== null && (
        <div style={{ marginTop: 'auto' }}>
          <span className="emi-pill">From {formatPrice(lowestMonthlyEmi)}/mo</span>
        </div>
      )}
    </Link>
  );
}
