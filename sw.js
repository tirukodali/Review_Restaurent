let cache_db_name = "my-cache";
// install event
this.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cache_db_name)
    .then((cache) => {
      cache.addAll([

      ])
    })
  )
})
// activate event
self.addEventListener('activate', function(event) {

  var listCache = ['pages-cache-v1', 'blog-posts-cache-v1'];
  console.log("Service Worker activated");
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (listCache.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);

          }
        })
      );
    })
  );
});
// fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(cache_db_name)
    .then((cache) => {
      return cache.match(event.request)
        .then((res) => {
          return res || fetch(event.request)
            .then((res) => {
              cache.put(event.request, res.clone());
              return res;
            });
        });
    })
  )
})
