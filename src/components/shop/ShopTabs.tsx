import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
] as const;

export default function ShopTabs() {
  const location = useLocation();

  return (
    <div className="mx-[var(--space-4)] mt-[var(--space-5)]">
      <nav
        aria-label="Shop sections"
        className="flex gap-1 rounded-[var(--radius-pill)] p-1"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex-1 rounded-[var(--radius-pill)] px-2 py-2.5 text-center text-[12px] font-medium leading-tight transition-all duration-200"
              style={{
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 500,
                boxShadow: isActive ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {tab.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
