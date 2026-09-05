import { Outlet, Navigate, useLocation } from 'react-router-dom';
import ShopTabs from '../components/shop/ShopTabs';

export default function ShopPage() {
  const location = useLocation();

  // If user hits exactly /shop, redirect to the first tab
  if (location.pathname === '/shop') {
    return <Navigate to="/shop/top-brands" replace />;
  }

  return (
    <div>
      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden px-[var(--space-5)] pb-10 pt-12"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary-gradient-start), var(--color-primary-gradient-end))',
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
        }}
      >
        {/* Subtle CSS grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10">
          <h1 className="text-[22px] font-bold leading-tight text-white">
            Shop smarter with 1Fi
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-white/80">
            Explore products and flexible EMI options from top brands and stores.
          </p>
        </div>
      </section>

      {/* ── Tabs ── */}
      <ShopTabs />

      {/* ── Tab Content ── */}
      <div className="px-[var(--space-4)] py-[var(--space-5)]">
        <Outlet />
      </div>
    </div>
  );
}
