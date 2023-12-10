/// <reference lib="webworker" />


const fetchHandler = async (event: FetchEvent) => {
  console.log('fetch 1', event);
  if(event.request.url.startsWith("https://api.backendless.com") && event.request.method=="GET"){
    try {
      const networkResponse = await fetch(event.request);
      if (networkResponse.ok) {
        const cache = await caches.open("MyCache_1");
        cache.put(event.request, networkResponse.clone());
      }
      return networkResponse;
    } catch (error) {
      const cachedResponse = await caches.match(event.request);
      return cachedResponse || Response.error();
    }
  } return;
};
self.addEventListener("fetch",fetchHandler as any);

importScripts("ngsw-worker.js");

console.log('custom SW!')
