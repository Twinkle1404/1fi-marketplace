import { Outlet, Navigate, useLocation } from 'react-router-dom';
import ShopTabs from '../components/shop/ShopTabs';

export default function ShopPage() {
  const location = useLocation();

  // If user hits exactly /shop, redirect to top-brands tab
  if (location.pathname === '/shop') {
    return <Navigate to="/shop/top-brands" replace />;
  }

  return (
    <div className="w-full">
      {/* ── Hero Section ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, var(--color-primary-gradient-start), var(--color-primary-gradient-end))',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}
      >
        {/* Subtle CSS grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 md:py-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white tracking-tight">
            Shop smarter with <em className="italic font-normal">1Fi</em>
          </h1>
          <p className="mt-2.5 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-white/85">
            Explore curated products with flexible, transparent EMI plans and zero hidden charges.
          </p>
        </div>
      </section>

      {/* ── Tabs ── */}
      <ShopTabs />

      {/* ── Tab Content ── */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Outlet />
      </div>
    </div>
  );
}
