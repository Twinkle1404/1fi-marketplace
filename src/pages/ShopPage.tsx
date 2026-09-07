import { Outlet, Navigate, useLocation } from 'react-router-dom';
import ShopTabs from '../components/shop/ShopTabs';

export default function ShopPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // If user hits /shop?tab=marketplace redirect directly to marketplace tab
  if (location.pathname === '/shop' && searchParams.get('tab') === 'marketplace') {
    return <Navigate to="/shop/marketplace" replace />;
  }

  // If user hits exactly /shop, redirect to top-brands tab
  if (location.pathname === '/shop') {
    return <Navigate to="/shop/top-brands" replace />;
  }

  return (
    <div className="w-full">
      {/* ── Hero Section (Faithfully matching 1Fi reference) ── */}
      <section className="hero">
        {/* Sparkle Badge */}
        <div className="hero-badge">
          <span>✨</span>
          <span>NO-COST EMIS</span>
        </div>

        {/* Headline */}
        <h1>
          Shop today,
          <em>Pay later using</em>
          Mutual funds.
        </h1>

        {/* Subtitle */}
        <p>
          No credit score required. No extra charges. Backed by your investments.
        </p>

        {/* Angled Devices Graphic on Right */}
        <div className="absolute -bottom-4 -right-4 w-[160px] h-[150px] pointer-events-none select-none opacity-90">
          <img
            src="/products/macbook-air-m4-midnight.jpg"
            alt=""
            className="absolute right-0 bottom-0 w-[135px] rounded-xl shadow-xl transform -rotate-6 object-cover"
          />
          <img
            src="/products/iphone-17-pro-orange.jpg"
            alt=""
            className="absolute right-8 bottom-0 w-[60px] rounded-lg shadow-2xl transform rotate-6 object-cover"
          />
        </div>
      </section>

      {/* ── Tabs ── */}
      <ShopTabs />

      {/* ── Tab Content ── */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}
