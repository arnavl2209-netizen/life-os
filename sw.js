var CACHE = 'lifeos-v1';
var PAGES = [
  '/life-os/',
  '/life-os/index.html',
  '/life-os/Study-tracker/index.html',
  '/life-os/Journal-tracker/index.html',
  '/life-os/JEE-tracker/index.html',
  '/life-os/Habit-Tracker/index.html',
  '/life-os/Analytics/index.html',
  '/life-os/Pomodoro/index.html'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PAGES);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) {
          return key !== CACHE;
        }).map(function(key) {
          return caches.delete(key);
        })
      );
    })
  );
});
