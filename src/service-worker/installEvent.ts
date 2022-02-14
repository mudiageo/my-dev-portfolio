import { build, timestamp, files } from '$service-worker';
const applicationCache = `applicationCache-v${timestamp}`;
const staticCache = `staticCache-v${timestamp}`;
const returnSSRpage = (path) =>
  caches.open("ssrCache").then((cache) => cache.match(path));
  
export default (event: ExtendableEvent): void => {
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
};