export default function ProductDetailSkeleton() {
  return (
    <div className="w-full px-4 pt-4 pb-20 flex flex-col space-y-5">
      {/* Back button placeholder */}
      <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200" />

      {/* 1. Image Skeleton */}
      <div className="w-full rounded-[18px] border border-gray-100 bg-white p-4 shadow-xs">
        <div
          className="aspect-square w-full max-w-[260px] mx-auto animate-pulse rounded-[12px] bg-gray-100"
        />
      </div>

      {/* 2. Color Selector Skeleton */}
      <div className="space-y-2">
        <div className="h-3.5 w-16 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-7 w-7 animate-pulse rounded-full bg-gray-200"
            />
          ))}
        </div>
      </div>

      {/* 3. Variant Selector Skeleton */}
      <div className="space-y-2">
        <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
          <div className="h-7 w-16 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      {/* 4-6. Title & Price Skeleton */}
      <div className="space-y-2 pt-1">
        <div className="h-3 w-14 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-3.5 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-7 w-28 animate-pulse rounded bg-gray-200 pt-1" />
      </div>

      {/* 7. EMI Plans Skeleton */}
      <div className="space-y-2 pt-2">
        <div className="h-3.5 w-48 animate-pulse rounded bg-gray-200" />
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 w-full animate-pulse rounded-[14px] border border-gray-100 bg-white"
          />
        ))}
      </div>

      {/* 8. CTA Button Skeleton */}
      <div className="pt-2">
        <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}
