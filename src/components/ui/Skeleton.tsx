export default function Skeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[var(--radius-md)]"
          style={{ backgroundColor: 'var(--color-bg)' }}
        >
          {/* Image area */}
          <div
            className="aspect-square animate-pulse"
            style={{ backgroundColor: 'var(--color-primary-light)', opacity: 0.5 }}
          />
          {/* Content area */}
          <div className="p-3">
            {/* Brand */}
            <div
              className="mb-2 h-3 w-12 animate-pulse rounded"
              style={{ backgroundColor: 'var(--color-bg-subtle)' }}
            />
            {/* Product name */}
            <div
              className="mb-2 h-4 w-full animate-pulse rounded"
              style={{ backgroundColor: 'var(--color-bg-subtle)' }}
            />
            {/* Price row */}
            <div className="flex items-center justify-between">
              <div
                className="h-4 w-16 animate-pulse rounded"
                style={{ backgroundColor: 'var(--color-bg-subtle)' }}
              />
              <div
                className="h-3 w-14 animate-pulse rounded"
                style={{ backgroundColor: 'var(--color-bg-subtle)' }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
