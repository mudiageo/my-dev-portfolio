/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */

import fetchEvent from './fetchEvent';
import installEvent from './installEvent';

// has to be var, because we need function scope
declare var self: ServiceWorkerGlobalScope;

/**
 * Takes care of the installation of the service worker, as well as the creation of the cache.
 */
 importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'); 

 importScripts('https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js'); 

 importScripts('https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval-iife.min.js'); 

  
self.addEventListener('install', installEvent);
 // Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval 

 const store = new idbKeyval.Store('GraphQL-Cache', 'PostResponses'); 

  

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
self.addEventListener('fetch', fetchEvent);

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

