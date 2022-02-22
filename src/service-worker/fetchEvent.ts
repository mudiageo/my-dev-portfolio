import Dexie from 'dexie'
export default async (event: FetchEvent): void => {

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
};
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