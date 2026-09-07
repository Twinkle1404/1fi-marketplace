import { NavLink, useLocation } from 'react-router-dom';

const tabs = [
  { to: '/shop/top-brands', label: 'Top Brands' },
  { to: '/shop/nearby-stores', label: 'Nearby Stores' },
  { to: '/shop/marketplace', label: '1Fi Marketplace' },
] as const;

export default function ShopTabs() {
  const location = useLocation();

  return (
    <nav aria-label="Shop sections" className="tabs">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.to;
        return (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={`tab ${isActive ? 'active' : ''}`}
            style={{ textDecoration: 'none' }}
          >
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
