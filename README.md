# 1Fi Marketplace

A modern, mobile-first marketplace application inspired by the **1Fi design language**, featuring product discovery, live search, variant selection, flexible EMI plans (including 0% No-cost EMI), dynamic pricing, and an interactive confirmation flow.

Built as an SDE assignment showcasing clean frontend architecture, component reusability, strict TypeScript typing, and accessible user experience.

---

## 🚀 Live Flow Overview

```text
Shop
  └── 1Fi Marketplace
        └── Product Listing
              ├── Live Search (Name & Brand)
              └── Product Card (Dynamic Lowest Price, EMI Badge)
                    └── Product Detail (/product/:id)
                          ├── Variant Selection (Stock-Aware)
                          ├── EMI Plan Selection (No-cost & Interest Plans)
                          ├── Dynamic Price & Sticky Bottom CTA
                          └── Confirmation Modal
                                └── Plan Summary & Done → Marketplace
```

---

## ✨ Features

- **Mobile-First App Shell**: Centered mobile application container (max 430px) with responsive scaling, designed for mobile financial interfaces while displaying cleanly on tablet and desktop screens.
- **Floating Bottom Navigation**: 5-tab floating pill navigation bar (`Home`, `Shop`, `EMI Dues`, `Limit`, `Profile`) with active indicators and automatic hiding on product detail drill-down.
- **Shop Tabs & Sub-Sections**: Tab navigation between `Top Brands`, `Nearby Stores`, and `1Fi Marketplace`.
- **Product Discovery & Search**: Fast client-side filtering matching product titles and brands with empty state and quick query-clearing controls.
- **Product Cards**: Display lowest available in-stock variant price formatted in Indian currency (`₹`), variant count badges, No-cost EMI highlights, and image load error fallbacks.
- **Interactive Variant Selection**: Instant price recalculation based on selected variant, with clear visual disabled states and "Out of stock" indicators for unavailable items.
- **Flexible EMI Plans**: Radio-group EMI selection with tenure options (3, 6, 9, 12, 18 months), monthly breakdown, total payable, and "No-cost EMI" badges for 0% interest plans.
- **Dynamic Sticky CTA**: Context-aware bottom action bar updating dynamically to `Proceed with ₹X/mo for N months` or disabling when variants are out of stock.
- **Confirmation Modal**: Dialog with backdrop dimming, keyboard escape handling, and complete order summary (Product, Variant, Monthly EMI, Tenure, Total Payable).
- **Comprehensive States**:
  - Skeleton loading placeholders matching the final layout.
  - User-friendly error states with retry capabilities (simulated error toggle available).
  - Empty search states with a single-click reset.
  - Dedicated 404/not-found screen with back navigation.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode, zero `any`)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom 1Fi CSS design tokens
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **State Management**: React local state & custom hooks (no external overhead)

---

## 🏛️ Architecture

The codebase enforces strict separation of concerns:

```text
React Components (UI)
        │
        ▼
Custom Hooks (`useProducts`, `useProduct`)
        │
        ▼
API Service Layer (`fetchProducts`, `fetchProductById`)
        │
        ▼
Mock Data (`mockProducts`)
```

- **Data Encapsulation**: UI components **never** directly import mock data. All data queries flow through the mock API layer with simulated asynchronous network delays (700ms).
- **Design Tokens**: Single source of truth in `src/styles/tokens.css` defining 1Fi primary purples (`#712DDC`), subtle backgrounds, typography, and standard spacing tokens.

---

## 📁 Project Structure

```text
src/
├── api/
│   └── marketplace.ts           # Mock API layer with simulated delay & error toggle
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx         # Mobile frame layout container
│   │   └── BottomNav.tsx        # Floating 5-tab bottom navigation
│   ├── marketplace/
│   │   ├── ConfirmationModal.tsx # Plan confirmation dialog
│   │   ├── CTAButton.tsx        # Reusable primary CTA button
│   │   ├── EMIPlanCard.tsx      # Single selectable EMI card
│   │   ├── EMIPlanList.tsx      # Radio-group EMI list
│   │   ├── ProductCard.tsx      # Marketplace catalog card
│   │   ├── ProductGrid.tsx      # Responsive 2-column grid
│   │   └── VariantSelector.tsx  # Stock-aware variant chips
│   ├── shop/
│   │   └── ShopTabs.tsx         # Top Brands / Nearby / Marketplace switcher
│   └── ui/
│       ├── EmptyState.tsx       # Reusable empty state view
│       ├── ErrorState.tsx       # Reusable error view with retry
│       ├── ProductDetailSkeleton.tsx # Detail page skeleton
│       └── Skeleton.tsx         # Product grid skeleton
├── data/
│   └── mockProducts.ts          # Curated mock products & EMI data
├── hooks/
│   ├── useProduct.ts            # Single product fetching hook
│   └── useProducts.ts           # Product catalog hook
├── pages/
│   ├── MarketplaceHome.tsx      # 1Fi Marketplace catalog & search
│   ├── NearbyStoresPage.tsx     # Nearby stores placeholder
│   ├── ProductDetailPage.tsx    # Complete product detail flow
│   ├── ShopPage.tsx             # Shop layout & tab host
│   └── TopBrandsPage.tsx        # Top brands placeholder
├── styles/
│   ├── global.css               # Reset, typography, Tailwind imports
│   └── tokens.css               # 1Fi design system variables
├── types/
│   └── index.ts                 # Product, Variant, and EMIPlan interfaces
├── App.tsx                      # Root router configuration
└── main.tsx                     # React root mount
```

---

## 🧭 Routes

| Route | Description |
|---|---|
| `/` | Home dashboard placeholder |
| `/shop` | Redirects to default shop tab |
| `/shop/top-brands` | Top Brands placeholder tab |
| `/shop/nearby-stores` | Nearby Stores placeholder tab |
| `/shop/marketplace` | 1Fi Marketplace product listing & search |
| `/product/:id` | Product detail, variant selector, EMI selection & CTA |
| `/emi-dues` | EMI Dues dashboard placeholder |
| `/limit` | Credit limit placeholder |
| `/profile` | User profile placeholder |

---

## 💻 Running Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (version 9 or higher)

### Installation

```bash
# Clone repository (if not already local)
git clone https://github.com/Twinkle1404/1fi-marketplace.git
cd 1fi-marketplace

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser. Open DevTools in mobile view (e.g. iPhone 14 Pro / 390px or 360px) for the optimal experience.

---

## 🏗️ Production Build & Verification

```bash
# Type check with TypeScript
npx tsc -b

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🧪 Testing Error & Edge States

- **Simulate Network Errors**: Set `SIMULATE_RANDOM_ERROR = true` in `src/api/marketplace.ts` to view the error state and verify the **Retry** action.
- **Empty Search**: Enter a query with no matches (e.g., `xyz999`) to test the empty search state and "Clear search" button.
- **Out of Stock**: Select products with out-of-stock options (e.g. `iPhone 16 Pro 1 TB`, `Sony Bravia 77"`, `iPad Air 512 GB`) to test disabled chips and disabled CTA states.
- **Invalid Route**: Navigate to `/product/invalid-id` to view the custom "Product not found" state with a return link.

---

## 📌 Notes & Assumptions

- This is a frontend evaluation assignment; all product data, variants, and EMI plans are mocked in-memory.
- No actual financial transactions or payment gateway integrations are executed.
- Financial calculations for EMI are simplified for demonstration and ensure internal mathematical consistency with variant prices.
