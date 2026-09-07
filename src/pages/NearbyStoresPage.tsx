import EmptyState from '../components/ui/EmptyState';

export default function NearbyStoresPage() {
  return (
    <EmptyState
      title="Nearby Stores"
      description="Nearby stores and exclusive deals will appear here soon."
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
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      }
    />
  );
}
