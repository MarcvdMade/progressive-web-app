const cacheName = 'content';
const filesToCache = [
    '/index.html',
    '/main.css',
    '/main.js',
    '/Project.js',
    '/Tag.js'
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            cache.addAll(filesToCache);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return res || fetch(event.request);
        })
    );
});