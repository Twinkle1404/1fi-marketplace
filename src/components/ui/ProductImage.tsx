import { useEffect, useState } from 'react';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}

export default function ProductImage({
  src,
  alt,
  className = '',
  containerClassName = '',
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const shouldRenderImg = Boolean(src && src.trim() !== '' && !hasError);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${containerClassName}`}
      style={{ backgroundColor: 'var(--color-primary-light)' }}
    >
      {shouldRenderImg ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`h-full w-full object-contain ${className}`}
          loading="lazy"
        />
      ) : (
        <div
          data-placeholder="true"
          className="flex h-full w-full items-center justify-center rounded-[inherit] border-2 border-dashed border-[var(--color-primary-disabled)] p-6 transition-colors"
          style={{ backgroundColor: 'var(--color-primary-light)' }}
          aria-label={`Image placeholder for ${alt}`}
        >
          {/* Outlined minimal image/photo icon, centered, no text */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="opacity-70"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      )}
    </div>
  );
}
