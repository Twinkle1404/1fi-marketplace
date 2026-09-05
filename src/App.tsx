import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import BottomNav from './components/layout/BottomNav';
import ShopPage from './pages/ShopPage';
import TopBrandsPage from './pages/TopBrandsPage';
import NearbyStoresPage from './pages/NearbyStoresPage';
import MarketplaceHome from './pages/MarketplaceHome';

/* ── Placeholder pages ── */

function HomePage() {
  return (
    <div className="flex flex-col items-center px-[var(--space-4)] py-16 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5H4a1 1 0 0 1-1-1V9.5z" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>Welcome to 1Fi</h2>
      <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        Your financial dashboard will appear here.
      </p>
    </div>
  );
}

function EmiDuesPage() {
  return (
    <div className="flex flex-col items-center px-[var(--space-4)] py-16 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M2 10h20" />
          <path d="M6 16h4" />
          <path d="M14 16h4" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>EMI Dues</h2>
      <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        Track and manage your EMI payments here.
      </p>
    </div>
  );
}

function LimitPage() {
  return (
    <div className="flex flex-col items-center px-[var(--space-4)] py-16 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7" />
          <path d="M16 3v4" />
          <circle cx="19" cy="18" r="3" />
          <path d="M19 16v4" />
          <path d="M17 18h4" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>Credit Limit</h2>
      <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        View and manage your available credit limit.
      </p>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="flex flex-col items-center px-[var(--space-4)] py-16 text-center">
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)]"
        style={{ backgroundColor: 'var(--color-primary-light)' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 12 0v1" />
        </svg>
      </div>
      <h2 className="text-[18px] font-semibold" style={{ color: 'var(--color-text-primary)' }}>Profile</h2>
      <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
        Manage your account settings and preferences.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />}>
            <Route path="top-brands" element={<TopBrandsPage />} />
            <Route path="nearby-stores" element={<NearbyStoresPage />} />
            <Route path="marketplace" element={<MarketplaceHome />} />
          </Route>
          <Route path="/emi-dues" element={<EmiDuesPage />} />
          <Route path="/limit" element={<LimitPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </AppShell>
      <BottomNav />
    </BrowserRouter>
  );
}
