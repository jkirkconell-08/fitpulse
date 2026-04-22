/* =========================================================
   FitPulse - Service Worker v1
   ========================================================= */

const CACHE_NAME = 'fitpulse-v11';
const ASSETS = [
  './', './login.html', './onboarding.html', './privacy.html',
  './index.html', './dashboard.html', './comidas.html',
  './ejercicios.html', './progreso.html', './historial.html',
  './medidas.html', './menu.html', './config.html',
  './css/app.css',
  './js/firebase-config.js', './js/storage.js', './js/auth.js',
  './js/cloud-sync.js', './js/app.js', './js/notifications.js',
  './js/charts.js', './js/comidas.js', './js/dashboard.js',
  './js/ejercicios.js', './js/medidas.js',
  './manifest.json', './icon-192.png', './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(c => Promise.allSettled(ASSETS.map(a => c.add(a)))));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.includes('gstatic.com') || event.request.url.includes('googleapis.com') || event.request.url.includes('cdn.jsdelivr.net')) {
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      const fetchP = fetch(event.request).then(resp => {
        if (resp && resp.status === 200) { const c = resp.clone(); caches.open(CACHE_NAME).then(cache => cache.put(event.request, c)); }
        return resp;
      }).catch(() => cached);
      return cached || fetchP;
    })
  );
});

self.addEventListener('message', (event) => {
  if (!event.data) return;
  if (event.data.type === 'SHOW_NOTIFICATION') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body, icon: './icon-192.png', badge: './icon-192.png',
      tag: `fitpulse-${Date.now()}`, vibrate: [200, 100, 200], data: { url: './dashboard.html' }
    });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then(clients => {
      for (const c of clients) { if ('focus' in c) return c.focus(); }
      return self.clients.openWindow('./dashboard.html');
    })
  );
});
