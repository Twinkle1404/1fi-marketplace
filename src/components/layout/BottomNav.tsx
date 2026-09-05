import { NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--color-icon-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  );
}

function ShopIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--color-icon-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 7v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7l-3-5H6z" />
      <path d="M3 7h18" />
      <path d="M16 11a4 4 0 0 1-8 0" />
    </svg>
  );
}

function EmiIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--color-icon-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 10h20" />
      <path d="M6 16h4" />
      <path d="M14 16h4" />
    </svg>
  );
}

function LimitIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--color-icon-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
      <path d="M16 3v4" />
      <circle cx="19" cy="18" r="3" />
      <path d="M19 16v4" />
      <path d="M17 18h4" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? 'var(--color-primary)' : 'var(--color-icon-muted)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 0 1 12 0v1" />
    </svg>
  );
}

const navItems: NavItem[] = [
  {
    to: '/',
    label: 'Home',
    icon: (active) => <HomeIcon active={active} />,
  },
  {
    to: '/shop',
    label: 'Shop',
    icon: (active) => <ShopIcon active={active} />,
  },
  {
    to: '/emi-dues',
    label: 'EMI Dues',
    icon: (active) => <EmiIcon active={active} />,
  },
  {
    to: '/limit',
    label: 'Limit',
    icon: (active) => <LimitIcon active={active} />,
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: (active) => <ProfileIcon active={active} />,
  },
];

function isShopActive(path: string): boolean {
  return path === '/shop' || path.startsWith('/shop/');
}

export default function BottomNav() {
  const location = useLocation();

  if (location.pathname.startsWith('/product/')) {
    return null;
  }

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-32px)] max-w-[398px] -translate-x-1/2"
    >
      <div className="flex items-center justify-around rounded-[var(--radius-lg)] bg-white px-1 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className="group relative flex min-w-[52px] flex-col items-center gap-0.5 px-1 py-1"
            aria-label={item.label}
          >
            {({ isActive: routerActive }) => {
              const isActive = item.to === '/shop'
                ? isShopActive(location.pathname)
                : routerActive;
              return (
                <>
                  {/* Active indicator bar */}
                  <span
                    className="absolute -top-1 h-[3px] w-6 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    }}
                  />
                  {item.icon(isActive)}
                  <span
                    className="text-[10px] leading-tight transition-colors duration-200"
                    style={{
                      color: isActive ? 'var(--color-primary)' : 'var(--color-icon-muted)',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </span>
                </>
              );
            }}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
