import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import type { ColorVariant, EMIPlan, ProductVariant } from '../types';
import VariantSelector from '../components/marketplace/VariantSelector';
import ColorSelector from '../components/marketplace/ColorSelector';
import EMIPlanList from '../components/marketplace/EMIPlanList';
import CTAButton from '../components/marketplace/CTAButton';
import ConfirmationModal from '../components/marketplace/ConfirmationModal';
import ProductDetailSkeleton from '../components/ui/ProductDetailSkeleton';
import ProductImage from '../components/ui/ProductImage';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import { formatPrice } from '../utils/formatters';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, refetch } = useProduct(id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedColor, setSelectedColor] = useState<ColorVariant | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  // Initialize selected variant, color, and plan when product loads
  useEffect(() => {
    if (product) {
      // Prefer first in-stock variant
      const firstInStock = product.variants.find((v) => v.inStock);
      if (firstInStock) {
        setSelectedVariant(firstInStock);
      } else if (product.variants.length > 0) {
        setSelectedVariant(product.variants[0]);
      }

      // Prefer first color variant if available
      if (product.colorVariants && product.colorVariants.length > 0) {
        setSelectedColor(product.colorVariants[0]);
      } else {
        setSelectedColor(null);
      }

      // Prefer first 0% EMI plan, otherwise first plan
      const zeroPercentPlan = product.emiPlans.find((p) => p.interestRate === 0);
      if (zeroPercentPlan) {
        setSelectedPlanId(zeroPercentPlan.id);
      } else if (product.emiPlans.length > 0) {
        setSelectedPlanId(product.emiPlans[0].id);
      }
    }
  }, [product]);

  // Current active price based on selected variant
  const currentPrice = selectedVariant?.price ?? product?.basePrice ?? 0;

  // Pricing discount and savings calculation
  const hasDiscount = Boolean(product?.originalPrice && product.originalPrice > currentPrice);
  const savings = hasDiscount && product?.originalPrice ? product.originalPrice - currentPrice : 0;

  // Dynamically calculate EMI plans matching the selected variant's price
  const dynamicEmiPlans = useMemo<EMIPlan[]>(() => {
    if (!product) return [];
    return product.emiPlans.map((plan) => {
      if (plan.interestRate === 0) {
        const monthly = Math.round(currentPrice / plan.tenureMonths);
        return {
          ...plan,
          monthlyAmount: monthly,
          totalPayable: currentPrice,
        };
      }
      const total = Math.round(currentPrice * (1 + plan.interestRate / 100));
      const monthly = Math.round(total / plan.tenureMonths);
      return {
        ...plan,
        monthlyAmount: monthly,
        totalPayable: total,
      };
    });
  }, [product, currentPrice]);

  const selectedPlan = useMemo(() => {
    return dynamicEmiPlans.find((p) => p.id === selectedPlanId) ?? dynamicEmiPlans[0] ?? null;
  }, [dynamicEmiPlans, selectedPlanId]);

  // Loading state
  if (loading) {
    return <ProductDetailSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <ErrorState
          title="Unable to load product"
          message="We couldn't retrieve this product's details. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <EmptyState
          title="Product not found"
          description="The product you're looking for does not exist or is no longer available."
          action={
            <Link
              to="/shop/marketplace"
              className="inline-flex items-center justify-center rounded-[var(--radius-pill)] px-7 py-3 text-sm font-bold text-white shadow-sm transition-opacity hover:opacity-90 active:opacity-80"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              Back to Marketplace
            </Link>
          }
          icon={
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          }
        />
      </div>
    );
  }

  const isOutOfStock = !selectedVariant || !selectedVariant.inStock;
  const isCtaDisabled = isOutOfStock || !selectedPlan;

  const ctaLabel = isOutOfStock
    ? 'Out of stock'
    : selectedPlan
    ? `Proceed — ${formatPrice(selectedPlan.monthlyAmount)}/mo →`
    : 'Select an EMI plan';

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/shop/marketplace');
    }
  };

  return (
    <div id="detailView">
      {/* ── Back Navigation ── */}
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back to Marketplace"
        className="back-btn"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back
      </button>

      {/* 1. Media Card */}
      <div className="media-card">
        {product.isNew && (
          <span className="badge-new">
            NEW
          </span>
        )}
        <div className="media-panel">
          <ProductImage
            src={selectedColor?.imageUrl || product.imageUrl}
            alt={`${product.brand} ${product.name}`}
            className="object-contain max-h-full max-w-full p-4"
            containerClassName="w-full h-full flex items-center justify-center"
          />
        </div>
      </div>

      {/* 2. Color (Finish) */}
      {product.colorVariants && product.colorVariants.length > 0 && (
        <div className="option-block">
          <div className="option-label">COLOR</div>
          <ColorSelector
            colors={product.colorVariants}
            selectedColor={selectedColor}
            onSelect={(color) => setSelectedColor(color)}
          />
        </div>
      )}

      {/* 3. Storage / Variant */}
      <div className="option-block">
        <div className="option-label">
          {product.colorVariants && product.colorVariants.length > 0 ? 'STORAGE' : 'VARIANT'}
        </div>
        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariant?.id ?? ''}
          onSelect={(variant) => setSelectedVariant(variant)}
        />
        {product.colorVariants && product.colorVariants.length > 0 && (
          <div className="finish-note">
            Available in {product.colorVariants.length} finishes
          </div>
        )}
        {isOutOfStock && (
          <p className="mt-2 text-xs font-medium text-red-500">
            This variant is currently out of stock. Please select another variant to proceed.
          </p>
        )}
      </div>

      {/* 4. Product Name & Selected Subtitle */}
      <h1 className="product-title">
        {product.name}
      </h1>
      <div className="product-subtitle">
        {selectedColor ? `${selectedColor.label} • ` : ''}{selectedVariant?.label}
      </div>

      {/* 5. Price */}
      <div className="detail-price-row">
        <span className="detail-price">
          {formatPrice(currentPrice)}
        </span>

        {hasDiscount && product.originalPrice && (
          <span className="detail-price-strike">
            {formatPrice(product.originalPrice)}
          </span>
        )}

        {hasDiscount && (
          <span className="save-pill">
            Save {formatPrice(savings)}
          </span>
        )}
      </div>

      {/* 6. EMI Plans Title */}
      <div className="plans-title">
        <span className="bar" />
        EMI Plans Backed by Mutual Funds
      </div>

      <EMIPlanList
        plans={dynamicEmiPlans}
        selectedPlanId={selectedPlanId}
        onSelect={(plan) => setSelectedPlanId(plan.id)}
        savings={savings}
      />

      {/* 7. CTA Button */}
      <div className="mt-2">
        <CTAButton
          label={ctaLabel}
          onClick={() => setIsConfirmationOpen(true)}
          disabled={isCtaDisabled}
        />
      </div>

      {/* ── Confirmation Modal ── */}
      {selectedPlan && selectedVariant && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          productName={product.name}
          variantLabel={selectedVariant.label}
          colorLabel={selectedColor?.label}
          colorHex={selectedColor?.hex}
          tenureMonths={selectedPlan.tenureMonths}
          monthlyAmount={selectedPlan.monthlyAmount}
          productPrice={currentPrice}
          totalPayable={selectedPlan.totalPayable}
          interestRate={selectedPlan.interestRate}
          cashback={selectedPlan.cashback}
          onClose={() => setIsConfirmationOpen(false)}
          onDone={() => {
            setIsConfirmationOpen(false);
            navigate('/shop/marketplace');
          }}
        />
      )}
    </div>
  );
}
