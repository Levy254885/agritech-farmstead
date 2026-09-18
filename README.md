# Agritech Farmstead

Production-ready website and farm shop for **Agritech Farmstead** — a Kenyan dairy farm.

**Repository:** https://github.com/Levy254885/agritech-farmstead  
**Phone / WhatsApp:** 0758 342 670 (`https://wa.me/254758342670`)

## Features

- Marketing site (Home, About, Dairy Farming, Products, Farm, Sustainability, Blog, Contact)
- Farm Shop with categories, search, filter, sort
- Product detail pages with **View details** and **Order on WhatsApp**
- Persistent shopping cart
- Checkout via **WhatsApp only** (no online payment integration)
- Admin area (`/admin`) — dashboard, products, orders
- Firebase-ready architecture with demo data mode
- Logo in header/footer (`public/logo-light.svg`)
- Vercel-ready SPA routing

## Quick start

```bash
git clone https://github.com/Levy254885/agritech-farmstead.git
cd agritech-farmstead
npm install
cp .env.example .env
# Leave VITE_USE_DEMO_DATA=true until Firebase is configured
npm run dev
```

Open http://localhost:5173

## Ordering flow

1. Customer browses `/shop` and adds items to cart
2. Checkout collects name, phone, delivery/pickup details
3. **Order via WhatsApp** opens a pre-filled message to **0758342670**
4. Farm confirms availability and arranges payment on WhatsApp

No M-Pesa or card payment is processed in the app.

## Environment

See `.env.example`. Demo mode works without Firebase credentials.

## Deploy on Vercel

1. Import this repo
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output: `dist`
5. `vercel.json` handles SPA rewrites

Logo and static assets under `public/` are served as-is.

## Admin

- `/admin/login` — in demo mode any email/password works
- Production: Firebase Auth + document in `admins/{uid}`

## License

Private — Agritech Farmstead.
