# Agritech Farmstead: store + farm site

Static front end (no build step) + Firebase (Auth, Firestore) + Cloudinary (images).

## Files
- `index.html`, `js/store.js`, `css/style.css`: customer storefront (search, categories, cart, sign in, checkout, reviews)
- `admin.html`, `js/admin.js`: admin dashboard (products with image upload, orders, review approval)
- `js/config.js`: **the one file you edit**: keys, phone/WhatsApp, hero slides, categories, starter products
- `js/fb.js`: Firebase + Cloudinary helpers
- `js/icons.js`: inline SVG icons
- `images/`: put the photos here (names listed below)
- `firestore.rules`, `firebase.json`: database security + hosting

## Setup (about 15 minutes)
1. **Firebase**: console.firebase.google.com > create project > add a Web app > paste the config into `js/config.js`.
2. **Auth**: Build > Authentication > enable *Email/Password* and *Google*. Add your domain under Settings > Authorized domains.
3. **Firestore**: Build > Firestore Database > create (production mode, nearest region).
4. **Rules**: `npm i -g firebase-tools && firebase login && firebase use --add && firebase deploy --only firestore:rules` (or paste `firestore.rules` into the console Rules tab).
5. **Cloudinary**: cloudinary.com > Settings > Upload > Add upload preset > Signing mode **Unsigned**. Put the cloud name and preset name in `js/config.js`.
6. **First admin**: open the site, create an account, then Firebase console > Authentication > copy that user's UID. In Firestore create collection `admins`, document ID = the UID, any field (e.g. `role: "admin"`).
7. Open `/admin.html`, sign in, click **Load starter products**, then edit prices and upload images.
8. **Run locally**: `npx serve .` (ES modules need http, not file://). **Deploy**: `firebase deploy` or any static host (Netlify, Vercel, cPanel).

## Works before setup
With the Firebase keys left as placeholders the shop still runs: products show, the cart works and checkout goes straight to WhatsApp. Sign-in, saved orders and the admin need Firebase.

## Photos needed (put in /images, exact names)
Hero (1600x600): hero-dairy.jpg hero-pigs.jpg hero-chicken.jpg hero-ducks.jpg
Promo banners (700x350): promo-dairy.jpg promo-meat.jpg promo-poultry.jpg
Products (square 800x800, also used as the round category tiles): milk.jpg mala.jpg yoghurt.jpg beef.jpg pork.jpg chevon.jpg kienyeji.jpg broiler.jpg eggs.jpg ducks.jpg pigs.jpg
A missing photo shows a neutral grey box with a camera icon.

## Images
Upload product photos in the admin (they go to Cloudinary). For hero and promo banners, upload to Cloudinary, copy the URL and paste it in `SLIDES` / `PROMOS` in `config.js`. URLs are auto-optimised (f_auto, q_auto).

## Not included yet
- Online payment (M-Pesa Daraja / Pesapal needs a secure server or Cloud Function). Orders are saved to Firestore and sent to WhatsApp for now.
- Email/SMS notifications for new orders.

## Restyling
Colours, radius and fonts are CSS variables at the top of `css/style.css`.
