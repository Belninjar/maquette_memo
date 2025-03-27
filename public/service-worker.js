// Un service worker minimaliste (Create React App en génère un auto, par exemple)

// Version de cache (à incrémenter quand on change des fichiers)
const CACHE_NAME = 'story-app-cache-v1';

// Liste des URLs à mettre en cache si on veut du offline
const urlsToCache = ['/index.html', '/', '/manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
