export default function Skeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4 md:gap-5 lg:gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[var(--radius-md)] border border-[#EEEEEE] shadow-sm"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {/* Image area */}
          <div
            className="aspect-square w-full animate-pulse"
            style={{ backgroundColor: 'var(--color-primary-light)', opacity: 0.6 }}
          />
          {/* Content area */}
          <div className="p-3.5 sm:p-4">
            {/* Brand */}
            <div
              className="mb-2 h-3 w-14 animate-pulse rounded"
              style={{ backgroundColor: '#EBEBEB' }}
            />
            {/* Product name */}
            <div
              className="mb-1.5 h-4 w-4/5 animate-pulse rounded"
              style={{ backgroundColor: '#EBEBEB' }}
            />
            <div
              className="mb-3 h-4 w-3/5 animate-pulse rounded"
              style={{ backgroundColor: '#EBEBEB' }}
            />
            {/* Price row */}
            <div className="flex items-center justify-between pt-1">
              <div
                className="h-5 w-20 animate-pulse rounded"
                style={{ backgroundColor: '#EBEBEB' }}
              />
              <div
                className="h-3 w-12 animate-pulse rounded"
                style={{ backgroundColor: '#EBEBEB' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
