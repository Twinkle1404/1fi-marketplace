export default function ProductDetailSkeleton() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">
      {/* Back button placeholder */}
      <div className="mb-6 h-6 w-36 animate-pulse rounded-full bg-gray-200" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left column: Image Skeleton */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-[var(--radius-lg)] border border-gray-200 bg-[var(--color-bg)] p-4 sm:p-6 shadow-sm">
            <div
              className="aspect-square w-full animate-pulse rounded-[var(--radius-md)]"
              style={{ backgroundColor: 'var(--color-primary-light)', opacity: 0.6 }}
            />
          </div>
        </div>

        {/* Right column: Content Skeleton */}
        <div className="lg:col-span-7 w-full space-y-6">
          <div className="space-y-3">
            {/* Brand */}
            <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
            {/* Title */}
            <div className="h-7 sm:h-9 w-4/5 animate-pulse rounded-md bg-gray-200" />
            {/* Description */}
            <div className="space-y-2 pt-1">
              <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            </div>
            {/* Price */}
            <div className="h-8 sm:h-10 w-36 animate-pulse rounded-md bg-gray-200 pt-2" />
          </div>

          <hr className="border-gray-200/80" />

          {/* Variant Selector Skeleton */}
          <div>
            <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="flex flex-wrap gap-2.5">
              <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
              <div className="h-10 w-24 animate-pulse rounded-full bg-gray-200" />
            </div>
          </div>

          <hr className="border-gray-200/80" />

          {/* EMI Plans Skeleton */}
          <div className="space-y-3">
            <div className="mb-3 h-4 w-36 animate-pulse rounded bg-gray-200" />
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-24 w-full animate-pulse rounded-[var(--radius-md)] border border-gray-200 bg-[var(--color-bg)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
