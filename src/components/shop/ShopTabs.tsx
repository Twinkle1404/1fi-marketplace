import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
] as const;

export default function ShopTabs() {
  const location = useLocation();

  return (
    <div className="w-full max-w-md sm:max-w-lg mx-auto mt-6 sm:mt-8 px-4">
      <nav
        aria-label="Shop sections"
        className="flex gap-1.5 rounded-[var(--radius-pill)] p-1.5 transition-all"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex-1 rounded-[var(--radius-pill)] px-3 py-2 sm:py-2.5 text-center text-[12px] sm:text-[13px] leading-tight transition-all duration-200"
              style={{
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 700 : 500,
                boxShadow: isActive ? '0 2px 8px rgba(113, 45, 220, 0.12)' : 'none',
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
