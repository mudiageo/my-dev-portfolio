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
   event.waitUntil(
		caches
			.open(FILES)
			.then((cache) => cache.addAll(to_cache))
			.then(() => {
				worker.skipWaiting();
			})
	);
});

self.addEventListener('fetch', async (event: FetchEvent): void => {

	const request = event.request;
   console.log(request)
   const requestURL = new URL(request.url);

   // We will cache all POST requests, but in the real world, you will probably filter for
	// specific URLs like if(... || event.request.url.href.match(`https://api-eu-west-2.graphcms.com/v2/ckzehv4xm2yp701z534u201vt/master`))
	if(event.request.method === 'POST'){
		
		// Init the cache. We use Dexie here to simplify the code. You can use any other
		// way to access IndexedDB of course.
		event.respondWith(staleWhileRevalidate(event)); 
			}

else {
if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

	const url = new URL(event.request.url);

	// don't try to handle e.g. data: URIs
	const isHttp = url.protocol.startsWith('http');
	const isDevServerRequest =
		url.hostname === self.location.hostname && url.port !== self.location.port;
	const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
	const skipBecauseUncached = event.request.cache === 'only-if-cached' && !isStaticAsset;

	if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
		event.respondWith(
			(async () => {
				// always serve static files and bundler-generated assets from cache.
				// if your application has other URLs with data that will never change,
				// set this variable to true for them and they will only be fetched once.
				const cachedAsset = isStaticAsset && (await caches.match(event.request));

				return cachedAsset || fetchAndCache(event.request);
			})()
		);
	}

}
 	
});

// Removes old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
		caches.keys().then(async (keys) => {
			// delete old caches
			for (const key of keys) {
				if (key !== FILES) await caches.delete(key);
			}

			worker.clients.claim();
		})
	);
});
/**
 * Fetch the asset from the network and store it in the cache.
 * Fall back to the cache if the user is offline.
 */
async function fetchAndCache(request: Request) {
	const cache = await caches.open(`offline${timestamp}`);

	try {
		const response = await fetch(request);
		cache.put(request, response.clone());
		return response;
	} catch (err) {
		const response = await cache.match(request);
		if (response) return response;

		throw err;
	}
}

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
 mi
	

          let slug =  body.data.project.slug || body.data.post.slug || body.query

          let id = CryptoJS.MD5(slug).toString()

	 
   
 
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
 
	  let slug =  body.data.project.slug || body.data.post.slug || body.query
           let id = CryptoJS.MD5(slug).toString()
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
