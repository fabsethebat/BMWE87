const CACHE='e87-v7';
const ASSETS=["./", "index.html", "manifest.webmanifest", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "img/detail-fog.jpg", "img/detail-smooth.jpg", "img/diffuser.jpg", "img/fan-comic.jpg", "img/fan-edit.jpg", "img/front-left.jpg", "img/front-right.jpg", "img/j0-front.jpg", "img/j0-harbour.jpg", "img/j0-rear.jpg", "img/j1-angel.jpg", "img/j1-low.jpg", "img/j1-sunset.jpg", "img/j2-garage.jpg", "img/j2-matte.jpg", "img/mirror.jpg", "img/now-quad.jpg", "img/now-rain.jpg", "img/now-street.jpg", "img/now-wash.jpg", "img/real-front.webp", "img/real-head.webp", "img/rear-dusk.jpg", "img/rear-left.jpg", "img/render-front.webp", "img/render-rear.webp", "img/render-side.webp", "img/rim-front.webp", "img/rim-rear.webp", "img/sheet-full.jpg", "img/sheet-side.jpg", "img/spoiler.jpg", "img/wheel-summer.webp", "img/wheel-winter.webp", "vid/graffiti.jpg", "vid/graffiti.mp4", "vid/model.jpg", "vid/model.mp4", "vid/toy.jpg", "vid/toy.mp4"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok && (new URL(e.request.url).origin===location.origin || e.request.url.includes('fonts.g'))){const copy=res.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy));}
    return res;}).catch(()=>caches.match('index.html'))));
});
