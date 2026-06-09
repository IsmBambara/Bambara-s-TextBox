// Service worker minimal pour Bambara's TextBox.
// Strategie "reseau d'abord" : on charge toujours la derniere version en ligne,
// et on retombe sur le cache uniquement si hors connexion.
const CACHE = "btb-shell-v1";

self.addEventListener("install", (e) => { self.skipWaiting(); });

self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
