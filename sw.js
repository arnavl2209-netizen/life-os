var CACHE = 'lifeos-v5';
var PAGES = [
  '/life-os/',
  '/life-os/index.html',
  '/life-os/Study-tracker/index.html',
  '/life-os/Journal-tracker/index.html',
  '/life-os/JEE-tracker/index.html',
  '/life-os/Habit-Tracker/index.html',
  '/life-os/Analytics/index.html',
  '/life-os/Pomodoro/index.html',
  '/life-os/Expense-Tracker/index.html',
  '/life-os/Flashcards/index.html'
];

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(PAGES);
    })
  );
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request).then(function(res) {
      var copy = res.clone();
      caches.open(CACHE).then(function(cache) { cache.put(e.request, copy); });
      return res;
    }).catch(function() {
      return caches.match(e.request);
    })
  );
});
