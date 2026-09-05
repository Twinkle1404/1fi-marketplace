export default function ProductDetailSkeleton() {
  return (
    <div className="px-[var(--space-4)] pt-4 pb-28">
      {/* Back button placeholder */}
      <div className="mb-4 h-6 w-24 animate-pulse rounded bg-gray-200" />

      {/* Image Skeleton */}
      <div
        className="aspect-square w-full animate-pulse rounded-[var(--radius-lg)]"
        style={{ backgroundColor: 'var(--color-primary-light)', opacity: 0.6 }}
      />

      {/* Content Skeleton */}
      <div className="mt-5 space-y-3">
        {/* Brand */}
        <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
        {/* Title */}
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        {/* Description */}
        <div className="space-y-1.5 pt-1">
          <div className="h-3.5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3.5 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
        {/* Price */}
        <div className="h-7 w-28 animate-pulse rounded bg-gray-200 pt-2" />
      </div>

      {/* Variant Selector Skeleton */}
      <div className="mt-7">
        <div className="mb-3 h-4 w-28 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-20 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* EMI Plans Skeleton */}
      <div className="mt-7 space-y-2.5">
        <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-24 w-full animate-pulse rounded-[var(--radius-md)] border border-gray-200 bg-gray-100"
          />
        ))}
      </div>
    </div>
  );
}
