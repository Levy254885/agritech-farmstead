/* ===== EDIT THIS FILE: keys, contact details and starter content ===== */
export const FIREBASE = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "000000000000",
  appId: "YOUR_APP_ID"
};
// Cloudinary: Settings > Upload > add an UNSIGNED upload preset
export const CLOUDINARY = { cloudName: "YOUR_CLOUD_NAME", uploadPreset: "YOUR_UNSIGNED_PRESET", folder: "farmstead" };

export const SITE = {
  name: "Agritech Farmstead",
  whatsapp: "254700000000",          // no + or spaces
  phone: "+254 700 000 000",
  email: "hello@agritechfarmstead.co.ke",
  location: "Kenya",
  tagline: "Fresh from the farm to your table",
  about: "Agritech Farmstead raises dairy cattle, pigs, goats, chickens and ducks on one farm. We keep our animals healthy and our process simple, from feeding to the final cut. Whether you want a litre of milk, a tray of eggs or meat for the weekend, you buy direct from the people who raised it.",
  slideSeconds: 6
};

// Hero slides. Paste Cloudinary image URLs in `image` (or leave "" for a colour background).
export const SLIDES = [
  { tag: "Dairy",   title: "Fresh milk from our own herd",     text: "Chilled, clean and delivered the same day.",          image: "images/hero-dairy.jpg", color: "#1f6b3a", cat: "Dairy" },
  { tag: "Pigs",    title: "Quality pork, raised with care",    text: "Fresh pork cut to order at KES 600 per kg.",          image: "images/hero-pigs.jpg", color: "#6b4a2f", cat: "Pork" },
  { tag: "Chicken", title: "Kienyeji and broiler chicken",      text: "Free-range kienyeji, fresh broilers and farm eggs.",  image: "images/hero-chicken.jpg", color: "#8a5a12", cat: "Poultry" },
  { tag: "Ducks",   title: "Healthy ducks from our ponds",      text: "Raised on open water and grass. Ask for availability.", image: "images/hero-ducks.jpg", color: "#245b73", cat: "Ducks" }
];

export const PROMOS = [
  { small: "Dairy",   title: "Fresh milk, every morning",   btn: "Shop dairy",   cat: "Dairy",   image: "", color: "#2e7d4f" },
  { small: "Meat",    title: "Beef, pork and chevon",       btn: "Shop meat",    cat: "Beef",    image: "", color: "#8a3b2e" },
  { small: "Poultry", title: "Kienyeji chicken and eggs",   btn: "Shop poultry", cat: "Poultry", image: "images/promo-poultry.jpg", color: "#b0741c" }
];

export const CATEGORIES = [
  { name: "Dairy", image: "images/milk.jpg" }, { name: "Beef", image: "images/beef.jpg" }, { name: "Pork", image: "images/pork.jpg" }, { name: "Goat (Chevon)", image: "images/chevon.jpg" },
  { name: "Poultry", image: "images/kienyeji.jpg" }, { name: "Eggs", image: "images/eggs.jpg" }, { name: "Ducks", image: "images/ducks.jpg" }, { name: "Pigs (live)", image: "images/pigs.jpg" }
];

// Shown until products exist in Firestore. Admin > "Load starter products" copies these into the database.
export const PRODUCTS = [
  { name: "Fresh Milk",         cat: "Dairy",         price: 0,    unit: "",         badge: "Fresh", image: "images/milk.jpg", desc: "Fresh chilled milk. Ask for today's price." },
  { name: "Mala (Fermented Milk)", cat: "Dairy",      price: 0,    unit: "",         badge: "Fresh", image: "images/mala.jpg", desc: "Traditional fermented milk, smooth and tangy. Ask for today's price." },
  { name: "Yoghurt",            cat: "Dairy",         price: 0,    unit: "",         badge: "",      image: "images/yoghurt.jpg", desc: "Creamy farm yoghurt. Ask for flavours and prices." },
  { name: "Beef",               cat: "Beef",          price: 650,  unit: "per kg",   badge: "Hot",   image: "images/beef.jpg", desc: "Fresh cuts from our own cattle." },
  { name: "Pork",               cat: "Pork",          price: 600,  unit: "per kg",   badge: "Hot",   image: "images/pork.jpg", desc: "Clean pork, cut to order." },
  { name: "Chevon (Goat Meat)", cat: "Goat (Chevon)", price: 850,  unit: "per kg",   badge: "",      image: "images/chevon.jpg", desc: "Tender goat meat." },
  { name: "Kienyeji Chicken",   cat: "Poultry",       price: 1500, unit: "per kg",   badge: "Hot",   image: "images/kienyeji.jpg", desc: "Free-range chicken with the village taste." },
  { name: "Broiler Chicken",    cat: "Poultry",       price: 500,  unit: "per kg",   badge: "Fresh", image: "images/broiler.jpg", desc: "Fresh broilers ready for the pot." },
  { name: "Kienyeji Eggs",      cat: "Eggs",          price: 700,  unit: "per tray", badge: "Fresh", image: "images/eggs.jpg", desc: "Farm-fresh free-range eggs." },
  { name: "Ducks",              cat: "Ducks",         price: 0,    unit: "",         badge: "",      image: "images/ducks.jpg", desc: "Live or dressed. Ask for availability." },
  { name: "Pigs (live)",        cat: "Pigs (live)",   price: 0,    unit: "",         badge: "",      image: "images/pigs.jpg", desc: "Ask for breeds and prices." }
];

// ----- Sample copy for the extra sections. Edit freely. -----
export const STATS = [{ n: "4", l: "Farm enterprises" }, { n: "9+", l: "Fresh products" }, { n: "100%", l: "Farm raised" }, { n: "Same day", l: "Fresh orders" }];
export const STEPS = [
  { icon: "cart", t: "Pick your produce", d: "Browse the shop and add what you need to your cart." },
  { icon: "chat", t: "Confirm on WhatsApp", d: "Your order goes straight to us with your details." },
  { icon: "truck", t: "Get it fresh", d: "We prepare it fresh and arrange delivery or pickup." }
];
export const SERVICES = [
  { icon: "home", t: "Farm visits", d: "Come and see how our animals are raised. Ask us to book a visit." },
  { icon: "box", t: "Bulk and restaurant orders", d: "Need more than a family pack? Talk to us about regular supply." },
  { icon: "leaf", t: "Breeding stock", d: "Ask about live pigs and other stock available on the farm." },
  { icon: "scissors", t: "Cuts to order", d: "Tell us how you want your meat cut and packed." }
];
export const FAQ = [
  { q: "How do I order?", a: "Add items to your cart and press checkout. Your order is sent to us on WhatsApp and we confirm availability and delivery." },
  { q: "Where do you deliver?", a: "Message us your location and we will tell you if we can deliver and what it costs." },
  { q: "Is the meat sold per kilogram?", a: "Yes. Beef, pork, chevon and chicken are priced per kg. Eggs are sold per tray." },
  { q: "Can I visit the farm?", a: "Yes, send us a message to arrange a visit." }
];
