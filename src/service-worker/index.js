"use strict";
exports.__esModule = true;
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/naming-convention */
console.log('installing service worker');
var fetchEvent_1 = require("./fetchEvent");
var installEvent_1 = require("./installEvent");
/**
 * Takes care of the installation of the service worker, as well as the creation of the cache.
 */
self.addEventListener('install', installEvent_1["default"]);
/**
 * Intercepts requests made by the page so we can decide what to do with each one.
 */
self.addEventListener('fetch', fetchEvent_1["default"]);
// Removes old caches
self.addEventListener("activate", function (event) {
    event.waitUntil(clients.claim(), caches
        .keys()
        .then(function (keys) {
        return Promise.all(keys
            .filter(function (key) {
            return key !== applicationCache &&
                key !== staticCache &&
                key !== "postsCache" &&
                key !== "ssrCache";
        })
            .map(function (key) { return caches["delete"](key); }));
    })
        .then(self.skipWaiting())
        .then(function () { return console.log("activated"); }));
});
