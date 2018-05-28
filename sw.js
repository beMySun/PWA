var cacheName = 'latestNews-05';
var cacheList = [
    './js/main.js',
    './css/site.css',
    './data/latest.json',
    './index.html'
]

// Cache our known resources during install
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll(cacheList))
  );
});


// Cache any new resources as they are fetched
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })
    .then(function(response) {
      if (response) {
        return response;
      }
      var fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(
        function(response) {
          if(!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(cacheName)
          .then(function(cache) {
            cache.put(event.request, responseToCache);
          });
          return response;
        }
      );
    })
  );
});


// clear old caches
function clearOldCaches() {
  console.log('caches', caches);
  return caches.keys()
    .then(keylist => {
      return Promise.all(
        keylist
          .filter(key => key !== cacheName)
          .map(key => caches.delete(key))
      );
    });
}


// 这个事件会在service worker被激活时发生。你可能不需要这个事件，但是在示例代码中，我们在该事件发生时将老的缓存全部清理掉了：
// self.clients.claim()执行时将会把当前service worker作为被激活的worker。
self.addEventListener('activate', event => {
  console.log('service worker: activate');
  // delete old caches
  event.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
    );
});