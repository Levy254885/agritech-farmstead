import { auth, db, A, F, img, configured } from "./fb.js";
import { SITE, SLIDES, PROMOS, CATEGORIES, PRODUCTS, STATS, STEPS, SERVICES, FAQ } from "./config.js";
import { ic } from "./icons.js";

const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const wa = t => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t)}`;
const kes = n => "KES " + Number(n).toLocaleString("en-KE");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const toast = m => { const t = $("#ts"); t.textContent = m; t.classList.add("on"); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove("on"), 2200) };
let products = PRODUCTS.map((p, i) => ({ ...p, id: "seed-" + i })), cat = "All", q = "", user = null, signup = false;
let cart = JSON.parse(localStorage.getItem("fs-cart") || "{}");

/* static content */
$("#tl").textContent = SITE.tagline; $("#tr").innerHTML = `<span>${ic("phone", 13)} ${SITE.phone}</span><a href="${wa("Hello, I have a question.")}"><span>WhatsApp</span></a>`;
$("#ss").innerHTML = `<option>All</option>` + CATEGORIES.map(c => `<option>${c.name}</option>`).join("");
$("#catl").innerHTML = `<li><button data-c="All">All products</button></li>` + CATEGORIES.map(c => `<li><button data-c="${c.name}">${c.name}</button></li>`).join("");
$("#tiles").innerHTML = CATEGORIES.map(c => `<button class="tile" data-c="${c.name}"><b>${c.image ? `<img src="${img(c.image, 160)}" alt="" loading="lazy" onerror="this.remove()">` : ic("leaf", 28)}</b><span>${c.name}</span></button>`).join("");
$("#promos").innerHTML = PROMOS.map(p => `<div class="pm" style="background-color:${p.color};${p.image ? `background-image:url('${img(p.image, 700)}')` : ''}"><small>${p.small}</small><h3>${p.title}</h3><button class="btn" data-c="${p.cat}">${p.btn}</button></div>`).join("");
$("#abt").textContent = SITE.about;
$("#fg").innerHTML = `<div><h4>${SITE.name}</h4><p>${SITE.tagline}. Based in ${SITE.location}.</p></div><div><h4>Shop</h4><ul>${CATEGORIES.slice(0, 5).map(c => `<li><a href="#shop" data-c="${c.name}">${c.name}</a></li>`).join("")}</ul></div><div><h4>Company</h4><ul><li><a href="#about">About us</a></li><li><a href="#reviews">Reviews</a></li><li><a href="admin.html">Staff login</a></li></ul></div><div><h4>Contact</h4><ul><li>${SITE.phone}</li><li>${SITE.email}</li><li><a href="${wa("Hello, I would like to order.")}">Chat on WhatsApp</a></li></ul></div>`;
$("#cp").textContent = `© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.`;

/* hero */
let cur = 0, tm;
SLIDES.forEach((s, i) => {
  const d = document.createElement("div"); d.className = "sl"; d.style.backgroundColor = s.color; if (s.image) d.style.backgroundImage = `url('${img(s.image, 1600)}')`;
  d.innerHTML = `<div class="in"><span class="tag">${s.tag}</span><h1>${s.title}</h1><p>${s.text}</p><button class="btn" data-c="${s.cat}">Shop now</button></div>`; $("#sls").appendChild(d);
  const b = document.createElement("button"); b.setAttribute("role", "tab"); b.setAttribute("aria-label", "Slide " + (i + 1)); b.onclick = () => go(i); $("#dt").appendChild(b);
});
function go(i) { cur = (i + SLIDES.length) % SLIDES.length; $$(".sl").forEach((s, k) => s.classList.toggle("on", k === cur)); $$("#dt button").forEach((b, k) => b.setAttribute("aria-selected", k === cur)); clearInterval(tm); tm = setInterval(() => go(cur + 1), SITE.slideSeconds * 1000) }
$("#nx").onclick = () => go(cur + 1); $("#pv").onclick = () => go(cur - 1);
let sx = 0; $(".hero").addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
$(".hero").addEventListener("touchend", e => { const d = e.changedTouches[0].clientX - sx; if (Math.abs(d) > 50) go(cur + (d < 0 ? 1 : -1)) }); go(0);

/* catalogue */
function setCat(c) { cat = c; q = ""; $("#sq").value = ""; $("#ss").value = c; render(); $("#catw").classList.remove("open"); $("#shop").scrollIntoView({ behavior: "smooth" }) }
function render() {
  $$(".tile").forEach(t => t.classList.toggle("on", t.dataset.c === cat));
  const list = products.filter(p => p.inStock !== false && (cat === "All" || p.cat === cat) && (!q || (p.name + " " + p.cat).toLowerCase().includes(q)));
  $("#gt").textContent = q ? `Results for "${q}"` : cat === "All" ? "Top selling products" : cat; $("#gc").textContent = list.length + " item" + (list.length === 1 ? "" : "s");
  $("#grid").innerHTML = list.length ? list.map(p => { const n = cart[p.id]?.qty || 0; return `<article class="card">${p.badge ? `<span class="bd ${p.badge === "Fresh" ? "f" : ""}">${esc(p.badge)}</span>` : ""}
    <div class="ph" data-v="${p.id}"><span class="phi">${ic("camera", 34)}</span>${p.image ? `<img src="${img(p.image)}" alt="${esc(p.name)}" loading="lazy" onerror="this.remove()">` : ""}</div>
    <div class="bo"><small>${esc(p.cat)}</small><h3 data-v="${p.id}" style="cursor:pointer">${esc(p.name)}</h3><div class="pr">${p.price > 0 ? kes(p.price) + ` <small>${esc(p.unit)}</small>` : "<small>Ask for price</small>"}</div>
    <div class="ad">${p.price > 0 ? (n ? `<div class="qty"><button data-m="${p.id}" aria-label="Less">−</button><span>${n}</span><button data-a="${p.id}" aria-label="More">+</button></div>` : `<button class="btn g" data-a="${p.id}">Add to cart</button>`) : `<a class="btn g" href="${wa("Hello, I would like to ask about: " + p.name)}">Ask on WhatsApp</a>`}</div></div></article>` }).join("") : `<div class="em">Nothing matched. <button class="btn g s" data-c="All">See all products</button></div>`;
}
async function loadProducts() {
  if (!configured) return;
  try { const s = await F.getDocs(F.collection(db, "products")); if (!s.empty) { products = s.docs.map(d => ({ id: d.id, ...d.data() })); render(); renderCart() } } catch (e) { console.warn("Using starter products:", e.message) }
}

/* cart */
const save = () => localStorage.setItem("fs-cart", JSON.stringify(cart));
function add(id, d) {
  const p = products.find(x => x.id === id); if (!p) return; const n = (cart[id]?.qty || 0) + d;
  if (n <= 0) delete cart[id]; else { cart[id] = { qty: n, name: p.name, price: p.price, unit: p.unit }; if (d > 0 && n === 1) toast(p.name + " added") } save(); renderCart(); render();
}
function total() { return Object.values(cart).reduce((s, l) => s + l.price * l.qty, 0) }
function renderCart() {
  const ids = Object.keys(cart);
  $("#ci").innerHTML = ids.length ? ids.map(id => { const l = cart[id]; return `<div class="ln"><div><strong>${esc(l.name)}</strong><small>${kes(l.price)} ${esc(l.unit)}</small></div><div class="qty"><button data-m="${id}">−</button><span>${l.qty}</span><button data-a="${id}">+</button></div></div>` }).join("") : `<p style="padding:30px 0;text-align:center;color:var(--mut)">Your cart is empty.</p>`;
  $("#cc").textContent = Object.values(cart).reduce((s, l) => s + l.qty, 0); $("#ct").textContent = kes(total());
}
const panel = (el, on) => { el.classList.toggle("on", on); $("#ov").classList.toggle("on", on || $$(".md.on,.dr.on").length > 0) };
const closeAll = () => { $$(".md,.dr").forEach(e => e.classList.remove("on")); $("#ov").classList.remove("on") };

/* auth */
const authMode = s => { signup = s; $("#at").textContent = s ? "Create account" : "Sign in"; $("#anm").hidden = !s; $("#anm").required = s; $("#sw").textContent = s ? "Have an account? Sign in" : "New here? Create an account" };
A.onAuthStateChanged(auth, u => { user = u; $("#an").textContent = u ? (u.displayName || u.email.split("@")[0]) : "Sign in"; $("#so").hidden = !u; loadReviews() });
$("#ab").onclick = () => { closeAll(); authMode(false); $("#ae").textContent = ""; panel($("#am"), true) };
$("#sw").onclick = () => authMode(!signup);
$("#so").onclick = async () => { await A.signOut(auth); closeAll(); toast("Signed out") };
$("#af").onsubmit = async e => {
  e.preventDefault(); const f = new FormData(e.target); $("#ae").textContent = "";
  try {
    if (signup) { const c = await A.createUserWithEmailAndPassword(auth, f.get("email"), f.get("pw")); await A.updateProfile(c.user, { displayName: f.get("name") }) } else await A.signInWithEmailAndPassword(auth, f.get("email"), f.get("pw"));
    closeAll(); toast("Welcome!");
  } catch (er) { $("#ae").textContent = er.code === "auth/invalid-credential" ? "Wrong email or password." : er.code === "auth/email-already-in-use" ? "That email already has an account." : er.message }
};
$("#gg").onclick = async () => { try { await A.signInWithPopup(auth, new A.GoogleAuthProvider()); closeAll() } catch (er) { $("#ae").textContent = er.message } };

/* checkout */
$("#co").onclick = () => {
  if (!Object.keys(cart).length) return toast("Your cart is empty");
  if (!user && configured) { closeAll(); authMode(false); panel($("#am"), true); return toast("Please sign in to checkout") }
  closeAll(); const f = $("#of"); f.name.value = user?.displayName || ""; panel($("#om"), true);
};
$("#of").onsubmit = async e => {
  e.preventDefault(); const f = new FormData(e.target), items = Object.entries(cart).map(([id, l]) => ({ id, ...l })), tot = total(); $("#oe").textContent = "";
  try {
    if (configured && user) await F.addDoc(F.collection(db, "orders"), { uid: user.uid, email: user.email, name: f.get("name"), phone: f.get("phone"), address: f.get("address"), note: f.get("note"), items, total: tot, status: "new", createdAt: F.serverTimestamp() });
    const lines = items.map(l => `${l.qty} x ${l.name} (${l.unit})`).join("\n");
    window.open(wa(`New order from ${f.get("name")} (${f.get("phone")})\n${lines}\nTotal: ${kes(tot)}\nDeliver to: ${f.get("address")}`), "_blank");
    cart = {}; save(); renderCart(); render(); closeAll(); e.target.reset(); toast("Order placed. We will confirm shortly.");
  } catch (er) { $("#oe").textContent = "Could not save order: " + er.message }
};
$("#myo").onclick = async e => {
  e.preventDefault(); if (!user) { authMode(false); return panel($("#am"), true) } const l = $("#mol"); l.textContent = "Loading..."; panel($("#mo"), true);
  try { const s = await F.getDocs(F.query(F.collection(db, "orders"), F.where("uid", "==", user.uid))); const rows = s.docs.map(d => d.data()).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    l.innerHTML = rows.length ? rows.map(o => `<div class="ln"><div><strong>${kes(o.total)}</strong><small>${o.items.map(i => i.qty + " x " + esc(i.name)).join(", ")}</small></div><span class="tag" style="background:var(--g);color:#fff;border-radius:99px;padding:2px 10px;height:fit-content">${esc(o.status)}</span></div>`).join("") : "No orders yet." } catch (er) { l.textContent = er.message }
};

/* reviews */
const stars = n => "★".repeat(n) + "☆".repeat(5 - n);
async function loadReviews() {
  if (!configured) return $("#rvg").innerHTML = `<div class="em"><strong>Be our first reviewer</strong></div>`;
  try { const s = await F.getDocs(F.query(F.collection(db, "reviews"), F.where("approved", "==", true))); const r = s.docs.map(d => d.data());
    $("#rvg").innerHTML = r.length ? r.map(x => `<div class="rv"><div class="st">${stars(x.rating)}</div><p>${esc(x.text)}</p><small>${esc(x.name)}</small></div>`).join("") : `<div class="em"><strong>Be our first reviewer</strong><p style="color:var(--mut)">Bought from us or visited the farm? Tell us below.</p></div>` } catch (e) { }
}
$("#rf").onsubmit = async e => {
  e.preventDefault(); if (!user) { authMode(false); panel($("#am"), true); return toast("Please sign in to review") } const f = new FormData(e.target);
  try { await F.addDoc(F.collection(db, "reviews"), { uid: user.uid, name: user.displayName || user.email.split("@")[0], rating: +f.get("rating"), text: f.get("text"), approved: false, createdAt: F.serverTimestamp() }); e.target.reset(); toast("Thanks! Your review will show once approved.") } catch (er) { toast(er.message) }
};

/* events */
document.addEventListener("click", e => {
  const c = e.target.closest("[data-c]"); if (c) { e.preventDefault(); setCat(c.dataset.c) }
  const v = e.target.closest("[data-v]"); if (v) openProduct(v.dataset.v);
  const a = e.target.closest("[data-a]"); if (a) add(a.dataset.a, 1); const m = e.target.closest("[data-m]"); if (m) add(m.dataset.m, -1);
});
$("#sf").onsubmit = e => { e.preventDefault(); q = $("#sq").value.trim().toLowerCase(); cat = $("#ss").value; render(); $("#shop").scrollIntoView({ behavior: "smooth" }) };
$("#ss").onchange = () => { cat = $("#ss").value; q = ""; render() };
$("#catb").onclick = () => $("#catw").classList.toggle("open");
$("#cb").onclick = () => { closeAll(); panel($("#dr"), true) }; $("#cx").onclick = $("#ov").onclick = closeAll;
$("#bg").onclick = () => $("#lk").classList.toggle("open"); $("#lk").onclick = () => $("#lk").classList.remove("open");
render(); renderCart(); loadProducts(); loadReviews();

/* extra sections */
$("#stats").innerHTML = STATS.map(x => `<div><b>${x.n}</b><span>${x.l}</span></div>`).join("");
$("#steps").innerHTML = STEPS.map((x, i) => `<div class="box"><span class="num">${i + 1}</span><b class="bi">${ic(x.icon, 26)}</b><h3>${x.t}</h3><p>${x.d}</p></div>`).join("");
$("#svc").innerHTML = SERVICES.map(x => `<div class="box"><b class="bi">${ic(x.icon, 26)}</b><h3>${x.t}</h3><p>${x.d}</p><a class="btn g s" style="margin-top:10px" href="${wa("Hello, I am interested in: " + x.t)}">Ask us</a></div>`).join("");
$("#faqs").innerHTML = FAQ.map(x => `<details class="box" style="margin-bottom:10px"><summary style="font-weight:600;cursor:pointer">${x.q}</summary><p style="margin-top:8px;color:var(--mut)">${x.a}</p></details>`).join("");

/* product details */
function openProduct(id) {
  const p = products.find(x => x.id === id); if (!p) return; const n = cart[id]?.qty || 0;
  $("#pm").innerHTML = `<div class="pd">${p.image ? `<img src="${img(p.image, 700)}" alt="${esc(p.name)}" onerror="this.remove()">` : `<div class="ph" style="border-radius:12px"><span class="phi">${ic("camera", 44)}</span></div>`}<div><small style="color:var(--mut)">${esc(p.cat)}</small><h3 style="font-size:22px;margin:4px 0">${esc(p.name)}</h3><p style="color:var(--mut)">${esc(p.desc || "")}</p>
  <div class="pr" style="font-size:24px;margin:12px 0">${p.price > 0 ? kes(p.price) + ` <small>${esc(p.unit)}</small>` : "<small>Ask for price</small>"}</div>
  ${p.price > 0 ? `<button class="btn g" data-a="${p.id}" style="width:100%">Add to cart${n ? " (" + n + " in cart)" : ""}</button>` : ""}
  <a class="btn" style="width:100%;display:block;margin-top:8px" href="${wa("Hello, I would like to order: " + p.name)}">Order on WhatsApp</a></div></div>`;
  closeAll(); panel($("#pm"), true);
}

/* contact form */
$("#mf").onsubmit = async e => {
  e.preventDefault(); const f = new FormData(e.target), d = { name: f.get("name"), phone: f.get("phone"), text: f.get("text") };
  try { if (configured) await F.addDoc(F.collection(db, "messages"), { ...d, createdAt: F.serverTimestamp() }) } catch (er) { console.warn(er.message) }
  window.open(wa(`Message from ${d.name} (${d.phone}): ${d.text}`), "_blank"); e.target.reset(); toast("Message sent. Thank you!");
};

$$("[data-ic]").forEach(e => e.innerHTML = ic(e.dataset.ic, +e.dataset.s || 20));
