const CACHE_NAME = 'my-app-cache-v1';
const urlsToCache = [
  '/main/',                // الصفحة الرئيسية (يمكن استخدام index.html أو فقط /main/)
  '/main/index.html',      // إذا أردت إيداع index.html صراحةً
  '/main/style.css',       // مسار ملف CSS الصحيح
  '/main/photos/logo.png', // مسار الصورة الصحيح
  // يمكنك إضافة المزيد من الأصول بنفس الطريقة، مثلاً:
  // '/main/photos/breakfast/1_breakfast.jpg',
  // '/main/photos/Sandwiches/1.jpg',
  // إلخ.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // نجرب إضافة جميع الملفات باستخدام المسارات الصحيحة،
        // ولو فشل أحدها نستمر مع الباقي
        return cache.addAll(urlsToCache).catch(err => {
          console.warn('بعض الملفات لم تُحمّل أثناء التثبيت:', err);
          return Promise.resolve(); // نتجاهل الخطأ ونبقى نثبت Service Worker
        });
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // إذا وجدنا الموارد في الكاش نُعيدها، وإلا نُنفّذ طلب الشبكة
      return response || fetch(event.request);
    })
  );
});
