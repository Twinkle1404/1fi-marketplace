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
      <div className="w-full px-4 pt-4">
        <section
          className="relative w-full overflow-hidden rounded-[28px] p-5 sm:p-6 text-white shadow-sm min-h-[195px] flex flex-col justify-between"
          style={{
            background: 'linear-gradient(135deg, #712DDC 0%, #5B1CB4 100%)',
          }}
        >
          {/* Sparkle Badge */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
              <span className="text-xs">✨</span>
              <span>NO-COST EMIS</span>
            </div>

            {/* Headline */}
            <h1 className="mt-3 text-[21px] font-extrabold leading-[1.2] text-white tracking-tight">
              Shop today, <br />
              <span className="italic font-medium">Pay later using</span> <br />
              Mutual funds.
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-[11px] leading-relaxed text-white/85 max-w-[210px]">
              No credit score required. No extra charges. Backed by your investments.
            </p>
          </div>

          {/* Angled Devices Graphic on Right */}
          <div className="absolute -bottom-4 -right-4 w-[160px] h-[150px] pointer-events-none select-none">
            <img
              src="/products/macbook-air-m4-midnight.jpg"
              alt=""
              className="absolute right-0 bottom-0 w-[140px] rounded-xl shadow-xl transform -rotate-6 object-cover"
            />
            <img
              src="/products/iphone-17-pro-orange.jpg"
              alt=""
              className="absolute right-8 bottom-0 w-[65px] rounded-lg shadow-2xl transform rotate-6 object-cover"
            />
          </div>
        </section>
      </div>

      {/* ── Tabs ── */}
      <ShopTabs />

      {/* ── Tab Content ── */}
      <div className="w-full px-4 py-4">
        <Outlet />
      </div>
    </div>
  );
}
