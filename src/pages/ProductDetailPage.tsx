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
    <div className="w-full pb-32">
      {/* ── Top Bar with Back Navigation ── */}
      <div className="w-full border-b border-gray-100 bg-[var(--color-bg)]/95 backdrop-blur-md sticky top-0 z-30 px-4 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to Marketplace"
          className="group inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-[var(--color-primary)]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="transition-transform group-hover:-translate-x-0.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back</span>
        </button>

        <span
          className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider"
        >
          1Fi Marketplace
        </span>
      </div>

      {/* ── Centered Vertical Flow Inside App Shell ── */}
      <div className="w-full px-4 pt-4 flex flex-col space-y-4">
        {/* 1. Product Image Card */}
        <div className="w-full rounded-[24px] border border-gray-100 bg-white p-4 shadow-xs">
          <div className="relative aspect-[4/3] w-full max-w-[280px] mx-auto overflow-hidden rounded-[16px] bg-white flex items-center justify-center">
            <ProductImage
              src={selectedColor?.imageUrl || product.imageUrl}
              alt={`${product.brand} ${product.name}`}
              className="object-contain max-h-full max-w-full"
              containerClassName="w-full h-full flex items-center justify-center"
            />

            {/* Badges */}
            <div className="absolute left-2.5 top-2.5 z-10 flex flex-wrap items-center gap-1">
              {product.isNew && (
                <span className="rounded-md bg-[#D62E20] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                  NEW
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 2. Color (Finish) */}
        {product.colorVariants && product.colorVariants.length > 0 && (
          <section aria-labelledby="color-heading" className="space-y-2">
            <h2 id="color-heading" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
              COLOR
            </h2>
            <ColorSelector
              colors={product.colorVariants}
              selectedColor={selectedColor}
              onSelect={(color) => setSelectedColor(color)}
            />
          </section>
        )}

        {/* 3. Storage / Variant */}
        <section aria-labelledby="variant-heading" className="space-y-2">
          <h2 id="variant-heading" className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
            {product.colorVariants && product.colorVariants.length > 0 ? 'STORAGE' : 'VARIANT'}
          </h2>
          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id ?? ''}
            onSelect={(variant) => setSelectedVariant(variant)}
          />
          {product.colorVariants && product.colorVariants.length > 0 && (
            <p className="text-xs text-gray-400 font-normal">
              Available in {product.colorVariants.length} finishes
            </p>
          )}
          {isOutOfStock && (
            <p className="text-xs font-medium text-red-500">
              This variant is currently out of stock. Please select another variant to proceed.
            </p>
          )}
        </section>

        {/* 4. Product Name & Selected Summary */}
        <div className="pt-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 leading-snug">
            {product.name}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500 font-normal">
            {selectedColor ? `${selectedColor.label} / ` : ''}{selectedVariant?.label}
          </p>

          {/* 5. Price */}
          <div className="mt-2.5 flex items-baseline gap-2 flex-wrap">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              {formatPrice(currentPrice)}
            </span>

            {hasDiscount && product.originalPrice && (
              <span className="text-sm font-normal text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}

            {hasDiscount && (
              <span className="inline-flex items-center rounded-full bg-[#EBFBF2] px-2.5 py-0.5 text-xs font-semibold text-[#1E7E43]">
                Save {formatPrice(savings)}
              </span>
            )}
          </div>
        </div>

        {/* 6. EMI Plans */}
        <section aria-labelledby="emi-heading" className="space-y-2.5 pt-2">
          <div className="flex items-center gap-2" id="emi-heading">
            <span className="h-3.5 w-1 rounded-full bg-[#712DDC]" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#712DDC]">
              EMI PLANS BACKED BY MUTUAL FUNDS
            </h2>
          </div>

          <EMIPlanList
            plans={dynamicEmiPlans}
            selectedPlanId={selectedPlanId}
            onSelect={(plan) => setSelectedPlanId(plan.id)}
            savings={savings}
          />
        </section>

        {/* 7. CTA */}
        <div className="pt-2">
          <CTAButton
            label={ctaLabel}
            onClick={() => setIsConfirmationOpen(true)}
            disabled={isCtaDisabled}
          />
        </div>
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
