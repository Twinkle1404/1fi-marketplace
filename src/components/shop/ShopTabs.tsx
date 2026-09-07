import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
] as const;

export default function ShopTabs() {
  const location = useLocation();

  return (
    <div className="w-full mt-4 px-4">
      <nav
        aria-label="Shop sections"
        className="flex items-center justify-between gap-1"
      >
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.to;
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className="flex-1 rounded-full px-3 py-2 text-center text-xs sm:text-[13px] transition-all duration-200"
              style={{
                backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 500,
                boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.06)' : 'none',
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
