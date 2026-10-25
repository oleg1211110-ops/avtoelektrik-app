/*! © 2026 Дмитриев Олег Сергеевич · АвтоЭлектрик PRO · AVTOELEKTRIK-PRO.KZ · Все права защищены · AO-FP-15bae8fbeee15c6337a79231769485da */
/* Офлайн-кэш приложения. Версия подставляется при сборке (tools/build.py). */
const VERSION = 'ao-02b76753ff';
const SHELL = [
  './', 'index.html', 'manifest.webmanifest',
  'i18n/ru.json', 'i18n/en.json', 'i18n/kk.json',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/favicon-64.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* страница и данные — сначала из сети (свежие коды и каталог), без сети — из кэша;
   остальное (переводы, значки) — из кэша */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const fresh = req.mode === 'navigate' || url.pathname.endsWith('/data/db.json') || url.pathname.endsWith('/index.html');
  if (fresh) {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match('index.html')))
    );
  } else {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(VERSION).then(c => c.put(req, copy));
      return res;
    })));
  }
});
