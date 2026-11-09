/* sw.js : 紬 保全パートナー用の裏方。通信できるときは常に最新、できないときだけ保存分を使う */
var CACHE='tsumugi-v3';
self.addEventListener('install',function(){self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==self.location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(function(r){if(r&&r.status===200){var c=r.clone();caches.open(CACHE).then(function(x){x.put(e.request,c)}).catch(function(){})}return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(h){return h||caches.match('./index.html')})}));
});
