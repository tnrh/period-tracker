const CACHE_NAME = 'period-tracker-cache-v1';
    const urlsToCache = [
      '/',
      '/index.html',
      'https://cdn.tailwindcss.com',
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap'
    ];
    
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });
    
    self.addEventListener('fetch', event => {
      event.respondWith(
        caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });

    self.addEventListener('notificationclick', event => {
        event.notification.close();
        event.waitUntil(
            clients.openWindow('/')
        );
    });
