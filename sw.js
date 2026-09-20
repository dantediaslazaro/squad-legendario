const CACHE_NAME = "squad-lendario-v1";
const OFFLINE_URL = "index.html";

const ASSETS = [
  "./",
  "./manifest.json",
  "./sw.js",
  "./index.html",
  "./images/icon.png",
  "./images/icon-192.png",
  "./images/icon-512.png",
  "./images/bg-intro.jpg",
  "./images/bg1.jpg",
  "./images/bg2.jpg",
  "./images/bg3.jpg",
  "./images/bg4.jpg",
  "./images/bg5.jpg",
  "./images/bg6.jpg",
  "./images/bg7.jpg",
  "./images/bg8.jpg",
  "./images/bg9.jpg",
  "./images/bg10.jpg",
  "./sounds/laser.wav",
  "./sounds/boss-damage.wav",
  "./sounds/opening.wav",
  "./sounds/congrats.wav",
  "./sounds/special.wav",
  "./sounds/pop.wav",
  "./sounds/gameover.wav",
  "./sounds/char-damage-1.wav",
  "./sounds/char-damage-2.wav",
  "./sounds/char-damage-3.wav",
  "./sounds/char-damage-4.wav",
  "./sounds/char-damage.mp3",
  "./sounds/663943_13444791-lq.mp3",
  "./sounds/bg/p1.wav",
  "./sounds/bg/p2.wav",
  "./sounds/bg/p3.wav",
  "./sounds/bg/p4.wav",
  "./sounds/bg/p5.wav",
  "./sounds/bg/p6.wav",
  "./sounds/bg/p7.wav",
  "./sounds/bg/p8.wav",
  "./sounds/bg/p9.wav",
  "./sounds/bg/p10.wav"
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null))
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((resp) => {
      if (resp) return resp;
      return fetch(e.request).then((netResp) => {
        if (
          netResp &&
          netResp.status === 200 &&
          netResp.type === "basic"
        ) {
          const copy = netResp.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
        }
        return netResp;
      });
    }).catch(() => caches.match(OFFLINE_URL))
  );
});
