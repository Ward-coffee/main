const cacheName = "menu-cache-v1";
const assets = [
  "/",
  "/index.html",
  "/style.css",
  "/photos/logo.png"
  // يمكنك إضافة صور أخرى هنا لاحقًا إذا أردت دعم التصفح بدون إنترنت بشكل أوسع
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
