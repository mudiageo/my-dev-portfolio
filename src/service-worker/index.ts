/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

// import fetchEvent from './fetchEvent';
// import installEvent from './installEvent';

// has to be var, because we need function scope
 importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'); 

 importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js'); 

 importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js'); 


declare var self: ServiceWorkerGlobalScope;
declare var store
store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses'); 
 // Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval 


import { build, timestamp, files } from '$service-worker';
const applicationCache = `applicationCache-v${timestamp}`;
const staticCache = `staticCache-v${timestamp}`;
const returnSSRpage = (path) =>
  caches.open("ssrCache").then((cache) => cache.match(path));
     console.log('installing service worker');

  

 if (workbox) { 

  console.log(`Yay! Workbox is loaded 🎉`); 

} else { 

  console.log(`Boo! Workbox didn't load 😬`); 

} 

 

// Workbox with custom handler to use IndexedDB for cache. 

workbox.routing.registerRoute( 

  new RegExp('/graphql(/)?'), 

  // Uncomment below to see the error thrown from Cache Storage API. 

  //workbox.strategies.staleWhileRevalidate(), 

  async ({ 

    event 

  }) => { 

    return staleWhileRevalidate(event); 

  }, 

  'POST' 

); 
/**
* Intercepts requests made by the page so we can decide what to do with each one.
*/


/**
 * Takes care of the installation of the service worker, as well as the creation of the cache.
 */
  
self.addEventListener('install', (event: ExtendableEvent): void => {
   console.log('installing service worker');

   event.waitUntil(
      Promise.all([
      caches
        .open("ssrCache")
        .then((cache) => cache.addAll(["/", "/posts", "/projects", "/posts/offline"])),
      caches.open(applicationCache).then((cache) => cache.addAll(build)),
      caches.open(staticCache).then((cache) => cache.addAll(files)),
    ])
      .then(self.skipWaiting())
   );
});

self.addEventListener('fetch', async (event: FetchEvent): void => {

	const request = event.request;
   console.log(request)
   const requestURL = new URL(request.url);

   // We will cache all POST requests, but in the real world, you will probably filter for
	// specific URLs like if(... || event.request.url.href.match(`https://api-eu-west-2.graphcms.com/v2/ckzehv4xm2yp701z534u201vt/master`))
	if(event.request.url.href.match(`https://api-eu-west-2.graphcms.com/v2/ckzehv4xm2yp701z534u201vt/master`)){
		
		// Init the cache. We use Dexie here to simplify the code. You can use any other
		// way to access IndexedDB of course.
		event.respondWith(staleWhileRevalidate(event)); 
			}
 	else {


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
  {
     event.respondWith(caches.match(request).then((cacheRes) => cacheRes || fetch(request)));
 }

}
});

// Removes old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim(),
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys
            .filter(
              (key) =>
                key !== applicationCache &&
                key !== staticCache &&
                key !== "postsCache" &&
                key !== "ssrCache"
            )
            .map((key) => caches.delete(key))
        );
      })
      .then(self.skipWaiting())
      .then(() => console.log("activated"))
  );
});

async function staleWhileRevalidate(event) { 

	let promise = null; 
 
	let cachedResponse = await getCache(event.request.clone()); 
 
	let fetchPromise = fetch(event.request.clone()) 
 
	  .then((response) => { 
 
		setCache(event.request.clone(), response.clone()); 
 
		return response; 
 
	  }) 
 
	  .catch((err) => { 
 
		console.error(err); 
 
	  }); 
 
	return cachedResponse ? Promise.resolve(cachedResponse) : fetchPromise; 
 
  } 
 
   
 
  async function serializeResponse(response) { 
 
	let serializedHeaders = {}; 
 
	for (var entry of response.headers.entries()) { 
 
	  serializedHeaders[entry[0]] = entry[1]; 
 
	} 
 
	let serialized = { 
 
	  headers: serializedHeaders, 
 
	  status: response.status, 
 
	  statusText: response.statusText 
 
	}; 
 
	serialized.body = await response.json(); 
 
	return serialized; 
 
  } 
 
   
 
  async function setCache(request, response) { 
 
	var key, data; 
 
	let body = await request.json(); 
 
	let id = CryptoJS.MD5(body.query).toString(); 
 
   
 
	var entry = { 
 
	  query: body.query, 
 
	  response: await serializeResponse(response), 
 
	  timestamp: Date.now() 
 
	}; 
 
	idbKeyval.set(id, entry, store); 
 
  } 
 
   
 
  async function getCache(request) { 
 
	let data; 
 
	try { 
 
	  let body = await request.json(); 
 
	  let id = CryptoJS.MD5(body.query).toString(); 
 
	  data = await idbKeyval.get(id, store); 
 
	  if (!data) return null; 
 
   
 
	  // Check cache max age. 
 
	  let cacheControl = request.headers.get('Cache-Control'); 
 
	  let maxAge = cacheControl ? parseInt(cacheControl.split('=')[1]) : 3600; 
 
	  if (Date.now() - data.timestamp > maxAge * 1000) { 
 
		console.log(`Cache expired. Load from API endpoint.`); 
 
		return null; 
 
	  } 
 
   
 
	  console.log(`Load response from cache.`); 
 
	  return new Response(JSON.stringify(data.response.body), data.response); 
 
	} catch (err) { 
 
	  return null; 
 
	} 
 
  } 
 
   
 
  async function getPostKey(request) { 
 
	let body = await request.json(); 
 
	return JSON.stringify(body); 
 
  }