var CACHE = 'lifeos-v6';
var BASE = '/life-os/';
var FOLDERS = [
  'Study-tracker', 'Journal-tracker', 'JEE-tracker', 'Habit-Tracker',
  'Analytics', 'Pomodoro', 'Expense-Tracker', 'Flashcards'
];
var CHART = 'https://cdn.jsdelivr.net/npm/chart.js';

var FILES = [BASE, BASE + 'index.html'];
FOLDERS.forEach(function(f) {
  FILES.push(BASE + f + '/index.html');
  FILES.push(BASE + f + '/style.css');
  FILES.push(BASE + f + '/script.js');
});

self.addEventListener('install', function(e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      var jobs = FILES.map(function(url) {
        return cache.add(url).catch(function() {});
      });
      jobs.push(
        cache.add(new Request(CHART, { mode: 'no-cors' })).catch(function() {})
      );
      return Promise.all(jobs);
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
      if (res && (res.ok || res.type === 'opaque')) {
        var copy = res.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
      }
      return res;
    }).catch(function() {
      return caches.match(e.request, { ignoreSearch: true });
    })
  );
});
