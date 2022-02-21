import Dexie from 'dexie'
export default (event: FetchEvent): void => {
   const request = event.request;
   console.log(request)
   const requestURL = new URL(request.url);

   // We will cache all POST requests, but in the real world, you will probably filter for
	// specific URLs like if(... || event.request.url.href.match(...))
	if(event.request.method === "POST"){
		
		// Init the cache. We use Dexie here to simplify the code. You can use any other
		// way to access IndexedDB of course.
		var db = new Dexie("post_cache");
		db.version(1).stores({
			post_cache: 'key,response,timestamp'
		})
	
		event.respondWith(
			// First try to fetch the request from the server
			fetch(event.request.clone())
			.then(function(response) {
				// If it works, put the response into IndexedDB
				cachePut(event.request.clone(), response.clone(), db.post_cache);
				return response;
			})
			.catch(function() {
				// If it does not work, return the cached response. If the cache does not
				// contain a response for our request, it will give us a 503-response
				return cacheMatch(event.request.clone(), db.post_cache);
			})
		);
	}
})
 
/**
 * Serializes a Request into a plain JS object.
 * 
 * @param request
 * @returns Promise
 */ 
function serializeRequest(request) {
	  var serialized = {
		url: request.url,
		headers: serializeHeaders(request.headers),
		method: request.method,
		mode: request.mode,
		credentials: request.credentials,
		cache: request.cache,
		redirect: request.redirect,
		referrer: request.referrer
	  };
	
	  // Only if method is not `GET` or `HEAD` is the request allowed to have body.
	  if (request.method !== 'GET' && request.method !== 'HEAD') {
		return request.clone().text().then(function(body) {
		  serialized.body = body;
		  return Promise.resolve(serialized);
		});
	  }
	  return Promise.resolve(serialized);
}
 
/**
 * Serializes a Response into a plain JS object
 * 
 * @param response
 * @returns Promise
 */ 
function serializeResponse(response) {
	  var serialized = {
		headers: serializeHeaders(response.headers),
		status: response.status,
		statusText: response.statusText
	  };
	
	  return response.clone().text().then(function(body) {
		  serialized.body = body;
		  return Promise.resolve(serialized);
	  });
}
 
/**
 * Serializes headers into a plain JS object
 * 
 * @param headers
 * @returns object
 */ 
function serializeHeaders(headers) {
	var serialized = {};
	// `for(... of ...)` is ES6 notation but current browsers supporting SW, support this
	// notation as well and this is the only way of retrieving all the headers.
	for (var entry of headers.entries()) {
		serialized[entry[0]] = entry[1];
	}
	return serialized;
}
 
/**
 * Creates a Response from it's serialized version
 * 
 * @param data
 * @returns Promise
 */ 
function deserializeResponse(data) {
	return Promise.resolve(new Response(data.body, data));
}
 
/**
 * Saves the response for the given request eventually overriding the previous version
 * 
 * @param data
 * @returns Promise
 */
function cachePut(request, response, store) {
	var key, data;
	getPostId(request.clone())
	.then(function(id){
		key = id;
		return serializeResponse(response.clone());
	}).then(function(serializedResponse) {
		data = serializedResponse;
		var entry = {
			key: key,
			response: data,
			timestamp: Date.now()
		};
		store
		.add(entry)
		.catch(function(error){
			store.update(entry.key, entry);
		});
	});
}
	
/**
 * Returns the cached response for the given request or an empty 503-response  for a cache miss.
 * 
 * @param request
 * @return Promise
 */
function cacheMatch(request) {
	return getPostId(request.clone())
	.then(function(id) {
		return store.get(id);
	}).then(function(data){
		if (data) {
			return deserializeResponse(data.response);
		} else {
			return new Response('', {status: 503, statusText: 'Service Unavailable'});
		}
	});
}
 
/**
 * Returns a string identifier for our POST request.
 * 
 * @param request
 * @return string
 */
function getPostId(request) {
	return JSON.stringify(serializeRequest(request.clone()));
}
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