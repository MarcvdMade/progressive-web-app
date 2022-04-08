const cacheName = 'cache v2';
const filesToCache = [
    '/index.html',
    '/main.css',
    '/dist/main.js',
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("activate", (event) => {
    // Allow list for caches
    const allowList = ['cache v2'];

    // Get all active caches
    event.waitUntil(caches.keys().then((keys) => {
        // Delete all that are not the cache name
        return Promise.all(keys.map((key) => {
            if (!allowList.includes(key)) return caches.delete(key);
        }))
    }))
})

self.addEventListener("fetch", (event) => {
    cacheFirst(event)
    // networkFirst(event)
});

function cacheFirst(event) {
    event.respondWith(caches.open(cacheName).then((cache) => {
        // First go to cache
        return cache.match(event.request.url).then((res) => {
            // Return a cached response if we have one
            if (res) {
                return res;
            } else {
                // Else check network
                return fetch(event.request.url).then((res) => {
                    // Add network res to cache for later visit
                    // cache.put(event.request.url, res.clone());
                    cache.addAll(filesToCache);

                    // Return network res
                    return res;
                })
            }
        })
    }))
}

function networkFirst(event) {
    event.respondWith(caches.open(cacheName).then((cache) => {
        // Go to network first
        return fetch(event.request.url).then((res) => {
            // cache.put(event.request.url, res.clone())
            cache.addAll(filesToCache);

            return res
        }).catch(() => {
            return cache.match(event.request.url);
        })
    }))
}