const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/photos/logo.png',
  // أضف هنا أي أصول أخرى تريد التخزين المؤقت لها
];

// حدث التثبيت: نخزن الأصناف في الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('بعض الملفات لم تُحمّل أثناء التثبيت:', err);
          return Promise.resolve();
        });
      })
  );
  self.skipWaiting();
});

// حدث التفعيل: ننظف الكاش القديم إذا تغير اسمه
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// حدث الجلب: إذا وجدنا المورد في الكاش نعيده، وإلا نذهب للشبكة
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
