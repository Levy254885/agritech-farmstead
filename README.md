# Agritech Farmstead

Production-ready website and e-commerce platform for **Agritech Farmstead** — a Kenyan dairy farm.

**Repository:** https://github.com/Levy254885/agritech-farmstead

## Features

- Marketing site (Home, About, Dairy Farming, Products, Farm, Sustainability, Blog, Contact)
- Farm Shop with categories, search, filter, sort
- Product detail pages
- Persistent shopping cart (Zustand + localStorage)
- Checkout (delivery / farm pickup, M-Pesa-ready architecture)
- Order confirmation and Firestore order records
- Secure admin area (`/admin`) with dashboard, products, orders
- Firebase Auth, Firestore, Storage architecture
- Demo data mode when Firebase is not configured
- SEO-friendly structure, Vercel-ready SPA routing
- Responsive design (mobile-first through desktop)

## Tech stack

- React 19 + TypeScript + Vite + Tailwind CSS
- React Router, Firebase, Zustand
- Deploy: Vercel-compatible

## Quick start

```bash
git clone https://github.com/Levy254885/agritech-farmstead.git
cd agritech-farmstead
npm install
cp .env.example .env
npm run dev
```

See full README in repo for Firebase setup, collections, admin, and deployment.
