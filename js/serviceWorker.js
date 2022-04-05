const cacheName = 'content';
const filesToCache = [
    '/index.html',
    '/style/main.css',

];

self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
    const allowList = [cacheName];

    event.waitUntil(caches.keys().then((keys) => {
        return Promise.all(keys.map((key) => {
            if (!allowList.includes(key)) {
                return caches.delete(key);
            }
        }))
    }))
})