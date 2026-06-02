const CACHE = 'styleme-v20260601';
const SHELL = [
  '/',
  '/index.html',
  '/style-v2.css?v=20260529',
  '/style-mobile-refresh.css',
  '/site.webmanifest',
  '/assets/styleme-logo.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request)
      .then(networkRes => {
        const copy = networkRes.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, copy));
        return networkRes;
      })
      .catch(() => caches.match(e.request))
  );
});
