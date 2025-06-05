// sw.js
const CACHE_NAME = 'ward-menu-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/manifest.json',
  '/photos/logo.png',
  // أضف هنا أي ملفات أخرى تريد تخزينها مؤقتًا (مثل الصور أو ملفات JS)
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        return response || fetch(event.request);
      })
  );
});
