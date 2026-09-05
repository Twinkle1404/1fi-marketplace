import { Link } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';

export default function TopBrandsPage() {
  return (
    <EmptyState
      title="Top Brands"
      description="Your favourite brands and exclusive deals will appear here soon."
      action={
        <Link
          to="/shop/marketplace"
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-5 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <span>Explore 1Fi Marketplace</span>
          <span aria-hidden="true">→</span>
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
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      }
    />
  );
}
