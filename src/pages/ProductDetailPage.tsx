import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import type { EMIPlan, ProductVariant } from '../types';
import VariantSelector from '../components/marketplace/VariantSelector';
import EMIPlanList from '../components/marketplace/EMIPlanList';
import CTAButton from '../components/marketplace/CTAButton';
import ConfirmationModal from '../components/marketplace/ConfirmationModal';
import ProductDetailSkeleton from '../components/ui/ProductDetailSkeleton';
import ErrorState from '../components/ui/ErrorState';

function formatPrice(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN');
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product, loading, error, refetch } = useProduct(id);

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>('');
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Initialize selected variant and plan when product loads
  useEffect(() => {
    if (product) {
      // Prefer first in-stock variant
      const firstInStock = product.variants.find((v) => v.inStock);
      if (firstInStock) {
        setSelectedVariant(firstInStock);
      } else if (product.variants.length > 0) {
        // Fallback if all out of stock
        setSelectedVariant(product.variants[0]);
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
      <div className="px-[var(--space-4)] pt-8">
        <ErrorState onRetry={refetch} />
      </div>
    );
  }

  // Product not found state
  if (!product) {
    return (
      <div className="flex flex-col items-center px-[var(--space-4)] py-16 text-center">
        <div
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>
        <h2
          className="text-[20px] font-bold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Product not found
        </h2>
        <p
          className="mt-2 max-w-[260px] text-[14px] leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          The product you&apos;re looking for is no longer available.
        </p>
        <Link
          to="/shop/marketplace"
          className="mt-6 inline-flex items-center justify-center rounded-[var(--radius-pill)] px-6 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  const isOutOfStock = !selectedVariant || !selectedVariant.inStock;
  const isCtaDisabled = isOutOfStock || !selectedPlan;

  const ctaLabel = isOutOfStock
    ? 'Out of stock'
    : selectedPlan
    ? `Proceed with ${formatPrice(selectedPlan.monthlyAmount)}/mo for ${selectedPlan.tenureMonths} months`
    : 'Select an EMI plan';

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/shop/marketplace');
    }
  };

  return (
    <div className="relative min-h-full pb-32">
      {/* Top Header / Back Button */}
      <div className="sticky top-0 z-30 flex items-center bg-white/90 px-[var(--space-4)] py-3.5 backdrop-blur-md border-b border-gray-100">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to Marketplace"
          className="group flex items-center gap-1.5 text-[14px] font-semibold transition-colors hover:text-[var(--color-primary)]"
          style={{ color: 'var(--color-text-primary)' }}
        >
          <svg
            width="20"
            height="20"
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
          <span>Marketplace</span>
        </button>
      </div>

      <div className="px-[var(--space-4)] pt-3">
        {/* Product Image */}
        <div
          className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-lg)] p-4 flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
        >
          {!imgError ? (
            <img
              src={product.imageUrl}
              alt={`${product.brand} ${product.name}`}
              className="h-full w-full object-contain mix-blend-multiply"
              loading="eager"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-400">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary-disabled)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}

          {/* No-cost EMI badge on image */}
          {product.emiPlans.some((p) => p.interestRate === 0) && (
            <span
              className="absolute left-3 top-3 rounded-[var(--radius-sm)] px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm"
              style={{ backgroundColor: 'var(--color-success)' }}
            >
              No-cost EMI available
            </span>
          )}
        </div>

        {/* Product Information */}
        <div className="mt-4">
          <span
            className="text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {product.brand}
          </span>

          <h1
            className="mt-0.5 text-[22px] font-bold leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {product.name}
          </h1>

          <p
            className="mt-2 text-[14px] leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {product.description}
          </p>

          {/* Price display */}
          <div className="mt-3.5 flex items-baseline gap-2">
            <span
              className="text-[26px] font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {formatPrice(currentPrice)}
            </span>
            <span
              className="text-[12px] font-medium"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              (inclusive of all taxes)
            </span>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* Variant Selector Section */}
        <section aria-labelledby="variant-heading">
          <div className="mb-2.5 flex items-center justify-between">
            <h2
              id="variant-heading"
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Select Variant
            </h2>
            {selectedVariant && (
              <span
                className="text-[12px] font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                {selectedVariant.label}
              </span>
            )}
          </div>

          <VariantSelector
            variants={product.variants}
            selectedVariantId={selectedVariant?.id ?? ''}
            onSelect={(variant) => setSelectedVariant(variant)}
          />

          {isOutOfStock && (
            <p className="mt-2 text-[12px] font-medium text-red-500">
              This variant is currently out of stock. Please select another variant to proceed.
            </p>
          )}
        </section>

        {/* Divider */}
        <hr className="my-5 border-gray-100" />

        {/* EMI Plans Section */}
        <section aria-labelledby="emi-heading">
          <div className="mb-2.5 flex items-center justify-between">
            <h2
              id="emi-heading"
              className="text-[12px] font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Choose EMI Plan
            </h2>
            {selectedPlan && (
              <span
                className="text-[12px] font-semibold"
                style={{ color: 'var(--color-primary)' }}
              >
                {selectedPlan.tenureMonths} Months
              </span>
            )}
          </div>

          <EMIPlanList
            plans={dynamicEmiPlans}
            selectedPlanId={selectedPlanId}
            onSelect={(plan) => setSelectedPlanId(plan.id)}
          />
        </section>
      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-1/2 z-40 w-full max-w-[430px] -translate-x-1/2 bg-white/95 px-4 py-3.5 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <CTAButton
          label={ctaLabel}
          onClick={() => setIsConfirmationOpen(true)}
          disabled={isCtaDisabled}
        />
      </div>

      {/* Confirmation Modal */}
      {selectedPlan && selectedVariant && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          productName={product.name}
          variantLabel={selectedVariant.label}
          tenureMonths={selectedPlan.tenureMonths}
          monthlyAmount={selectedPlan.monthlyAmount}
          totalPayable={selectedPlan.totalPayable}
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
