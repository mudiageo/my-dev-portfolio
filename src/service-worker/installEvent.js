"use strict";
exports.__esModule = true;
var _service_worker_1 = require("$service-worker");
var applicationCache = "applicationCache-v".concat(_service_worker_1.timestamp);
var staticCache = "staticCache-v".concat(_service_worker_1.timestamp);
var returnSSRpage = function (path) {
    return caches.open("ssrCache").then(function (cache) { return cache.match(path); });
};
console.log('installing service worker');
exports["default"] = (function (event) {
    console.log('installing service worker');
    event.waitUntil(Promise.all([
        caches
            .open("ssrCache")
            .then(function (cache) { return cache.addAll(["/", "/posts", "/projects", "/posts/offline"]); }),
        caches.open(applicationCache).then(function (cache) { return cache.addAll(_service_worker_1.build); }),
        caches.open(staticCache).then(function (cache) { return cache.addAll(_service_worker_1.files); }),
    ])
        .then(self.skipWaiting(), console.log('ssrcsched')));
});
