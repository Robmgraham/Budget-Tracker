const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME ="data-cache-v1";

const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/public/style.css"

]

//install
self.addEventListener("install", function(evt) {
    //pre cache data
    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then(
            (cache) => cache.add("/api/icons"))
    );

    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll
        (FILES_TO_CACHE))
    );

    //tells browser to activate the service worker immediately
    //when it has finished installing
    self.skipWaiting();
});


//activate service worker and remove old data from the cache
self.addEventListener("activate", function(evt){
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CHACHE_NAME) {
                        console.log("removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// fetch for use offline
self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/api/")) {
        console.log(' [Service Worker] Fetch (data)');
      evt.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        }).catch(err => console.log(err))
      );
  
      return;
    }
  
    evt.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(evt.request).then(response => {
          return response || fetch(evt.request);
        });
      })
    );
  });
  