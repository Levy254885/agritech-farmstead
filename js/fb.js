import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import * as A from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import * as F from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { FIREBASE, CLOUDINARY } from "./config.js";

const app = initializeApp(FIREBASE);
export const auth = A.getAuth(app);
export const db = F.getFirestore(app);
export { A, F };
export const configured = !FIREBASE.apiKey.startsWith("YOUR_");

// Cloudinary delivery: auto format/quality + width
export const img = (url, w = 600) => url && url.includes("/upload/") ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${w}/`) : url;

export async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file); fd.append("upload_preset", CLOUDINARY.uploadPreset);
  if (CLOUDINARY.folder) fd.append("folder", CLOUDINARY.folder);
  const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`, { method: "POST", body: fd });
  const j = await r.json();
  if (!j.secure_url) throw new Error(j.error?.message || "Upload failed");
  return j.secure_url;
}
