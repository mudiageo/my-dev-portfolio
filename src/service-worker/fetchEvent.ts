
export default (event: FetchEvent): void => {
   const request = event.request;
   console.log(request)
   const requestURL = new URL(request.url);
 if (/(posts)/.test(requestURL.pathname)) {
     const returnOfflinePosts = () => {
       return fetch(event.request).catch(() => {
         return caches
           .open("postsCache")
           .then((cache) => {
             return cache.keys().then((cacheKeys) => {
               return Promise.all(
                 cacheKeys.map((cacheKey) => cache.match(cacheKey))
               );
             });
           })
           .then((cachesResponses) => {
             return Promise.all(
               cachesResponses.map((response) => response.json())
             );
           })
           .then((posts) => {
             const response = new Response(JSON.stringify(posts), {
               statusText: "offline",
             });
             return response;
           });
       });
     };
 event.respondWith(returnOfflinePosts());
  } else if ( /(\/posts\/)(\w+-?)*/.test(requestURL.pathname) && !/(.css)|(.js)$/.test(requestURL.pathname)) {
     const findOfflinePost = () =>
       caches
         .match(request)
         .then((response) => (response ? response : fetch(request)))
         .catch(() => returnSSRpage("/posts/offline"));
 event.respondWith(findOfflinePost());
  } else
     event.respondWith(caches.match(request).then((cacheRes) => cacheRes || fetch(request)));
 
};