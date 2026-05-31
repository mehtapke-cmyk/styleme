const CACHE = 'styleme-v20260531b';
const SHELL = [
  '/',
  '/index.html',
  '/style-v2.css?v=20260529',
  '/script.js?v=20260529',
  '/partials-v2.js?v=20260529',
  '/interactions-v2.js?v=20260529',
  '/style-mobile-refresh.css?v=20260529',
  '/site.webmanifest',
  '/assets/styleme-logo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  // Ne pas intercepter les requêtes externes (Google Analytics, fonts, etc.)
  if (url.origin !== self.location.origin) return;

  // Stratégie : network-first pour les navigations et les ressources critiques
  const isNavigation = e.request.mode === 'navigate' || e.request.destination === 'document';
  const isCritical = ['script', 'style', 'document'].includes(e.request.destination);

  if (isNavigation || isCritical) {
    e.respondWith(
      fetch(e.request).then((networkRes) => {
        // Mettre en cache la réponse réseau pour prochaine fois
        const copy = networkRes.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return networkRes;
      }).catch(() => {
        // Si réseau indisponible, renvoyer le cache si présent
        return caches.match(e.request).then(cached => cached || caches.match('/index.html'));
      })
    );
    return;
  }

  // Par défaut : cache-first pour les autres assets statiques
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
