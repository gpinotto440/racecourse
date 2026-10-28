// Racecourse service worker: funzionamento offline.
// Quando pubblichi una nuova versione, aumenta il numero qui sotto (v1 -> v2).
const CACHE = "racecourse-v7";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./vendor/jspdf.umd.min.js",
  "./fonts/barlow-400.woff2", "./fonts/barlow-500.woff2", "./fonts/barlow-600.woff2",
  "./fonts/barlow-condensed-600.woff2", "./fonts/barlow-condensed-700.woff2",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png", "./icons/apple-touch-icon.png"
];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate" || new URL(req.url).pathname.endsWith("/libreria.json")) {
    // pagina e libreria condivisa: prima la rete (aggiornamenti), offline la copia salvata
    const key = req.mode === "navigate" ? "./index.html" : "./libreria.json";
    e.respondWith(fetch(req).then(r => { if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(key, c)); } return r; })
      .catch(() => caches.match(key)));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return r;
  })));
});
