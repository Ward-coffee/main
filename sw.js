const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/', 
  '/index.html',
  '/style.css',
  '/photos/logo.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // نجرب إضافة جميع الملفات، ولو فشل أحدها نستمر مع الباقي
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('بعض الملفات لم تُحمّل أثناء التثبيت:', err);
          return Promise.resolve(); // نتجاهل الخطأ ونبقى نثبت السرفس ووركر
        });
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
