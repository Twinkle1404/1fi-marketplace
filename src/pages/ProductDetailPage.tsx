import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import type { ColorVariant, EMIPlan, ProductVariant } from '../types';
import VariantSelector from '../components/marketplace/VariantSelector';
import ColorSelector from '../components/marketplace/ColorSelector';
import EMIPlanList from '../components/marketplace/EMIPlanList';
import CTAButton from '../components/marketplace/CTAButton';
import ConfirmationModal from '../components/marketplace/ConfirmationModal';
import SectionLabel from '../components/ui/SectionLabel';
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
    <div className="w-full pb-32 lg:pb-16">
      {/* ── Top Bar with Back Navigation ── */}
      <div className="w-full border-b border-gray-200/80 bg-[var(--color-bg)]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back to Marketplace"
            className="group inline-flex items-center gap-2 text-sm font-bold transition-colors hover:text-[var(--color-primary)]"
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
              className="transition-transform group-hover:-translate-x-1"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Back to Marketplace</span>
          </button>

          <span
            className="text-xs font-semibold uppercase tracking-wider hidden sm:inline"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            1Fi Verified Partner
          </span>
        </div>
      </div>

      {/* ── Main Product Detail Content (Responsive 2-column on desktop) ── */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Product Image Card */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-20 rounded-[var(--radius-lg)] border border-gray-200 bg-[var(--color-bg)] p-4 sm:p-6 shadow-sm">
              <div className="relative aspect-square w-full overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-primary-light)]">
                <ProductImage
                  src={selectedColor?.imageUrl || product.imageUrl}
                  alt={`${product.brand} ${product.name}`}
                  containerClassName="w-full h-full"
                />

                {/* Pinned badges on top-left of image */}
                <div className="absolute left-3.5 top-3.5 z-10 flex flex-wrap items-center gap-1.5">
                  {product.isNew && (
                    <span
                      className="rounded-[var(--radius-pill)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm"
                      style={{ backgroundColor: 'var(--color-new-badge)' }}
                    >
                      NEW
                    </span>
                  )}

                  {product.emiPlans.some((p) => p.interestRate === 0) && (
                    <span
                      className="rounded-[var(--radius-pill)] px-3 py-1 text-[11px] font-bold tracking-tight shadow-sm"
                      style={{
                        backgroundColor: 'var(--color-success-bg)',
                        color: 'var(--color-success-text)',
                      }}
                    >
                      No-cost EMI available
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Variants, EMI Plans, Action */}
          <div className="lg:col-span-7 w-full flex flex-col space-y-6">
            {/* Header info */}
            <div>
              <span
                className="text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.05em]"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {product.brand}
              </span>

              <h1
                className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {product.name}
              </h1>

              <p
                className="mt-2.5 text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed"
              >
                {product.description}
              </p>

              {/* Price display */}
              <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                <span
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {formatPrice(currentPrice)}
                </span>

                {hasDiscount && product.originalPrice && (
                  <span
                    className="text-base sm:text-lg font-medium line-through"
                    style={{ color: 'var(--color-strikethrough)' }}
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                )}

                {hasDiscount && (
                  <span
                    className="inline-flex items-center rounded-[var(--radius-pill)] px-2.5 py-1 text-xs sm:text-sm font-bold tracking-tight"
                    style={{
                      backgroundColor: 'var(--color-success-bg)',
                      color: 'var(--color-success-text)',
                    }}
                  >
                    Save {formatPrice(savings)}
                  </span>
                )}

                <span
                  className="w-full sm:w-auto text-xs sm:text-sm font-medium"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  (inclusive of all taxes)
                </span>
              </div>
            </div>

            <hr className="border-gray-200/80" />

            {/* ── Color / Finish Selector Section ── */}
            {product.colorVariants && product.colorVariants.length > 0 && (
              <>
                <section aria-labelledby="color-heading">
                  <SectionLabel
                    id="color-heading"
                    title="Select Finish"
                    activeValue={selectedColor?.label}
                    className="mb-3"
                  />

                  <ColorSelector
                    colors={product.colorVariants}
                    selectedColor={selectedColor}
                    onSelect={(color) => setSelectedColor(color)}
                  />
                </section>

                <hr className="border-gray-200/80" />
              </>
            )}

            {/* ── Variant Selector Section ── */}
            <section aria-labelledby="variant-heading">
              <SectionLabel
                id="variant-heading"
                title="Select Variant"
                activeValue={selectedVariant?.label}
                className="mb-3"
              />

              <VariantSelector
                variants={product.variants}
                selectedVariantId={selectedVariant?.id ?? ''}
                onSelect={(variant) => setSelectedVariant(variant)}
              />

              {isOutOfStock && (
                <p className="mt-2.5 text-xs sm:text-sm font-medium text-red-500">
                  This variant is currently out of stock. Please select another variant to proceed.
                </p>
              )}
            </section>

            <hr className="border-gray-200/80" />

            {/* ── EMI Plans Section ── */}
            <section aria-labelledby="emi-heading">
              <SectionLabel
                id="emi-heading"
                title="Choose EMI Plan"
                activeValue={selectedPlan ? `${selectedPlan.tenureMonths} Months` : null}
                className="mb-3"
              />

              <EMIPlanList
                plans={dynamicEmiPlans}
                selectedPlanId={selectedPlanId}
                onSelect={(plan) => setSelectedPlanId(plan.id)}
              />
            </section>

            {/* ── Desktop Inline CTA Button ── */}
            <div className="hidden lg:block pt-4">
              <CTAButton
                label={ctaLabel}
                onClick={() => setIsConfirmationOpen(true)}
                disabled={isCtaDisabled}
              />
              <p className="mt-2 text-center text-xs text-[var(--color-text-secondary)]">
                Instant approval with 1Fi Credit Limit • No paperwork
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom CTA Bar (Mobile & Tablet) ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-bg)]/95 px-4 py-3.5 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
        <div className="w-full max-w-lg mx-auto">
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
