

const staticCacheName = 'uda-rra-app-cache-v1';
const fileToCache = [
    '/',
    'index.html',
    'css/styles.css',
    'data/restaurants.js',
    'img/1.jpg', 'img/2.jpg', 'img/3.jpg', 'img/4.jpg', 'img/5.jpg', 'img/6.jpg', 'img/7.jpg', 'img/8.jpg', 'img/9.jpg', 'img/10.jpg',
    'js/dbhelper.js', 'js/main.js', 'js/restaurant_info.js', 'js/sw-reg.js',
    'sw.js',
]

self.addEventListener('install', function(event) {
    console.log('trying to cache the code');
    event.waitUntil(
        caches.open(staticCacheName)
        .then(function(cache) {
            return cache.addAll(fileToCache)
        })
        .catch(function(err) {
            console.log("error caching files" + err);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
        .then(function(reponse) {
            if (reponse) {
                return reponse;
            } else {
                return fetch(event.request)
                    .then(function(response) {
                        return caches.open(staticCacheName).
                        then(function(cache) {
                            cache.put(event.request.url, response.clone());
                            return response;
                        });
                    });
            }
        }).catch(err => {
            console.log(err);
        })

    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');

    const cacheWhitelist = [staticCacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});