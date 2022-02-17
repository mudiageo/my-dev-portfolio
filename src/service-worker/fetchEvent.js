"use strict";
exports.__esModule = true;
exports["default"] = (function (event) {
    var request = event.request;
    var requestURL = new URL(request.url);
    if (/(posts)/.test(requestURL.pathname)) {
        var returnOfflinePosts = function () {
            return fetch(event.request)["catch"](function () {
                return caches
                    .open("postsCache")
                    .then(function (cache) {
                    return cache.keys().then(function (cacheKeys) {
                        return Promise.all(cacheKeys.map(function (cacheKey) { return cache.match(cacheKey); }));
                    });
                })
                    .then(function (cachesResponses) {
                    return Promise.all(cachesResponses.map(function (response) { return response.json(); }));
                })
                    .then(function (posts) {
                    var response = new Response(JSON.stringify(posts), {
                        statusText: "offline"
                    });
                    return response;
                });
            });
        };
        event.respondWith(returnOfflinePosts());
    }
    else if (/(\/posts\/)(\w+-?)*/.test(requestURL.pathname) && !/(.css)|(.js)$/.test(requestURL.pathname)) {
        var findOfflinePost = function () {
            return caches
                .match(request)
                .then(function (response) { return (response ? response : fetch(request)); })["catch"](function () { return returnSSRpage("/posts/offline"); });
        };
        event.respondWith(findOfflinePost());
    }
    else
        event.respondWith(caches.match(request).then(function (cacheRes) { return cacheRes || fetch(request); }));
});
