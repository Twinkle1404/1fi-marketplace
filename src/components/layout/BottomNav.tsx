import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: '/shop',
    label: 'Shop',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="14" x="2" y="3" rx="2" />
        <line x1="8" x2="16" y1="21" y2="21" />
        <line x1="12" x2="12" y1="17" y2="21" />
      </svg>
    ),
  },
  {
    to: '/emi-dues',
    label: 'EMI Dues',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7h10M7 12h10M7 17h10" />
      </svg>
    ),
  },
  {
    to: '/limit',
    label: 'Limit',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 14 14" />
      </svg>
    ),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function isShopActive(path: string): boolean {
  return (
    path === '/shop' ||
    path.startsWith('/shop/') ||
    path.startsWith('/product/') ||
    path.startsWith('/marketplace/')
  );
}

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav aria-label="Main navigation" className="bottom-nav">
      {navItems.map((item) => {
        const isActive = item.to === '/shop'
          ? isShopActive(location.pathname)
          : location.pathname === item.to;

        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={`nav-item ${isActive ? 'active' : ''}`}
            aria-label={item.label}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}
