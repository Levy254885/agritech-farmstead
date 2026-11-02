import { auth, db, A, F, img, uploadImage } from "./fb.js";
import { CATEGORIES, PRODUCTS } from "./config.js";
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const kes = n => "KES " + Number(n).toLocaleString("en-KE");
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const toast = m => { const t = $("#ts"); t.textContent = m; t.classList.add("on"); setTimeout(() => t.classList.remove("on"), 2200) };
let prods = [], started = false;
$("#pc").innerHTML = CATEGORIES.map(c => `<option>${c.name}</option>`).join("");

$("#lf").onsubmit = async e => { e.preventDefault(); const f = new FormData(e.target); $("#le").textContent = ""; try { await A.signInWithEmailAndPassword(auth, f.get("email"), f.get("pw")) } catch (er) { $("#le").textContent = "Wrong email or password." } };
$("#out").onclick = () => A.signOut(auth);
A.onAuthStateChanged(auth, async u => {
  $("#login").hidden = !!u; $("#app").hidden = true; $("#deny").hidden = true; if (!u) return;
  const ok = (await F.getDoc(F.doc(db, "admins", u.uid))).exists();
  if (!ok) return $("#deny").hidden = false;
  $("#app").hidden = false; if (!started) { started = true; start() }
});
$("#tabs").onclick = e => { const t = e.target.dataset.t; if (!t) return; $$("#tabs button[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === t)); ["products", "orders", "reviews", "messages"].forEach(x => $("#" + x).hidden = x !== t) };

function start() {
  F.onSnapshot(F.collection(db, "products"), s => { prods = s.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.name.localeCompare(b.name)); drawProducts() });
  F.onSnapshot(F.query(F.collection(db, "orders"), F.orderBy("createdAt", "desc")), s => drawOrders(s.docs));
  F.onSnapshot(F.collection(db, "messages"), s => { $("#ml").innerHTML = s.docs.map(d => d.data()).sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).map(m => `<tr><td>${m.createdAt ? new Date(m.createdAt.seconds * 1000).toLocaleString("en-KE") : ""}</td><td>${esc(m.name)}<br><small>${esc(m.phone)}</small></td><td>${esc(m.text)}</td><td><a class="btn g s" href="https://wa.me/${esc(m.phone.replace(/\D/g, ""))}">Reply</a></td></tr>`).join("") || `<tr><td colspan="4">No messages yet.</td></tr>` });
  F.onSnapshot(F.collection(db, "reviews"), s => drawReviews(s.docs));
}
function drawProducts() {
  $("#pl").innerHTML = prods.map(p => `<tr><td>${p.image ? `<img src="${img(p.image, 120)}" alt="">` : ""}</td><td>${esc(p.name)}</td><td>${esc(p.cat)}</td><td>${p.price > 0 ? kes(p.price) + " " + esc(p.unit) : "Ask"}</td><td>${p.inStock === false ? "Out" : "In"}</td>
  <td class="row"><button class="btn g s" data-e="${p.id}">Edit</button><button class="btn r s" data-d="${p.id}">Delete</button></td></tr>`).join("") || `<tr><td colspan="6">No products yet. Click "Load starter products".</td></tr>`;
}
$("#pl").onclick = async e => {
  const ed = e.target.dataset.e, de = e.target.dataset.d;
  if (ed) { const p = prods.find(x => x.id === ed), f = $("#pf"); f.id.value = p.id; for (const k of ["name", "cat", "price", "unit", "badge", "desc", "image"]) f[k].value = p[k] ?? ""; f.inStock.checked = p.inStock !== false; setPrev(p.image); $("#pft").textContent = "Edit product"; scrollTo({ top: 0, behavior: "smooth" }) }
  if (de && confirm("Delete this product?")) { await F.deleteDoc(F.doc(db, "products", de)); toast("Deleted") }
};
const setPrev = u => { const i = $("#prev"); i.hidden = !u; if (u) i.src = img(u, 120) };
const clearForm = () => { $("#pf").reset(); $("#pf").id.value = ""; $("#pf").image.value = ""; setPrev(""); $("#pft").textContent = "Add product" };
$("#pcancel").onclick = clearForm;
$("#pfile").onchange = async e => { const f = e.target.files[0]; if (!f) return; $("#pe").textContent = "Uploading to Cloudinary..."; try { const u = await uploadImage(f); $("#pf").image.value = u; setPrev(u); $("#pe").textContent = "" } catch (er) { $("#pe").textContent = er.message } };
$("#pf").onsubmit = async e => {
  e.preventDefault(); const f = e.target, data = { name: f.name.value.trim(), cat: f.cat.value, price: +f.price.value, unit: f.unit.value.trim(), badge: f.badge.value, desc: f.desc.value.trim(), image: f.image.value, inStock: f.inStock.checked };
  try { if (f.id.value) await F.setDoc(F.doc(db, "products", f.id.value), data); else await F.addDoc(F.collection(db, "products"), data); toast("Saved"); clearForm() } catch (er) { $("#pe").textContent = er.message }
};
$("#seed").onclick = async () => { if (!confirm("Add the starter products from config.js?")) return; for (const p of PRODUCTS) await F.addDoc(F.collection(db, "products"), { ...p, inStock: true }); toast("Starter products added") };

function drawOrders(docs) {
  const S = ["new", "confirmed", "delivered", "cancelled"];
  $("#ol").innerHTML = docs.map(d => { const o = d.data(); return `<tr><td>${o.createdAt ? new Date(o.createdAt.seconds * 1000).toLocaleString("en-KE") : ""}</td><td>${esc(o.name)}<br><small>${esc(o.phone)}<br>${esc(o.address)}</small></td>
  <td>${o.items.map(i => i.qty + " x " + esc(i.name)).join("<br>")}</td><td>${kes(o.total)}</td><td><select data-o="${d.id}">${S.map(s => `<option ${s === o.status ? "selected" : ""}>${s}</option>`).join("")}</select></td></tr>` }).join("") || `<tr><td colspan="5">No orders yet.</td></tr>`;
}
$("#ol").onchange = async e => { if (e.target.dataset.o) { await F.updateDoc(F.doc(db, "orders", e.target.dataset.o), { status: e.target.value }); toast("Status updated") } };

function drawReviews(docs) {
  $("#rl").innerHTML = docs.map(d => { const r = d.data(); return `<tr><td>${esc(r.name)}</td><td>${"★".repeat(r.rating)}</td><td>${esc(r.text)}</td><td class="row">${r.approved ? "<small>Live</small>" : `<button class="btn g s" data-ap="${d.id}">Approve</button>`}<button class="btn r s" data-rd="${d.id}">Delete</button></td></tr>` }).join("") || `<tr><td colspan="4">No reviews yet.</td></tr>`;
}
$("#rl").onclick = async e => { const a = e.target.dataset.ap, d = e.target.dataset.rd; if (a) await F.updateDoc(F.doc(db, "reviews", a), { approved: true }); if (d && confirm("Delete review?")) await F.deleteDoc(F.doc(db, "reviews", d)) };
