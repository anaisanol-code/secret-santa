self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("santa").then(cache =>
      cache.addAll(["./","./index.html","./style.css"])
    )
  );
});
