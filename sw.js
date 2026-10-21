const C="zyzz-pro-v2";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","index.html","sw.js"]).catch(()=>{})));self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))));self.clients.claim();});
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;if(e.request.method!=="GET")return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp));return res;}).catch(()=>caches.match("./"))));});
