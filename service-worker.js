/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["D:/IDEADATE/blog/public/-img/thumb1.png","175e4dc3e89e1cbea0e92b5a1c146ba7"],["D:/IDEADATE/blog/public/-img/thumb2.png","23bf2feaaa96fe9b0dc1d360517785af"],["D:/IDEADATE/blog/public/-img/thumb3.png","243a6e26be207c8fdcb384ec25e6998c"],["D:/IDEADATE/blog/public/-img/thumb4.png","93a317b0c34fcb0dac67d47d2d83c408"],["D:/IDEADATE/blog/public/2020/07/16/Hello-Hexo/index.html","624c02979da0d25251f2980c526fa7ba"],["D:/IDEADATE/blog/public/2020/07/16/hello-world/index.html","fdae1912075b9d7808259e538658eba0"],["D:/IDEADATE/blog/public/2020/07/22/Future/index.html","d234738f4a4aad64eb5fc40cc8a4f42f"],["D:/IDEADATE/blog/public/404.html","39a1ce259e3b54451c0ef4b563ffc93a"],["D:/IDEADATE/blog/public/about/index.html","28cf394eab951f96a4ebaeedf636b1af"],["D:/IDEADATE/blog/public/archives/2020/07/index.html","fabe4cb35d89e88a4f3c6e0d8a9bcda5"],["D:/IDEADATE/blog/public/archives/2020/index.html","fabe4cb35d89e88a4f3c6e0d8a9bcda5"],["D:/IDEADATE/blog/public/archives/index.html","fabe4cb35d89e88a4f3c6e0d8a9bcda5"],["D:/IDEADATE/blog/public/categories/index.html","02f5a8e43a5e37e0927625b722d20809"],["D:/IDEADATE/blog/public/css/main.css","07c42f0ed29201826f01b44518728001"],["D:/IDEADATE/blog/public/img/avatar.png","2d9aa61e592b26e2745f3c161c48c397"],["D:/IDEADATE/blog/public/img/dojm2h.png","a1faa1ff45335643d9c3dd824599f0d1"],["D:/IDEADATE/blog/public/img/favicon.png","5603316bb5bc54a9d5cab14fddd4c510"],["D:/IDEADATE/blog/public/img/loading.gif","15657539044e11a19a1c6c7e3073d1b3"],["D:/IDEADATE/blog/public/img/police_beian.png","b769e8dfde5660239317ed60758dba13"],["D:/IDEADATE/blog/public/index.html","c0ae129d86fcd4aeca47066381a2acf2"],["D:/IDEADATE/blog/public/js/clipboard-use.js","f8982b9e48c880368c3cd559f058f9b9"],["D:/IDEADATE/blog/public/js/color-schema.js","f38030c3d6865667b5cb344abf1345c5"],["D:/IDEADATE/blog/public/js/debouncer.js","b191fcef450414f12dd272f9a75b4576"],["D:/IDEADATE/blog/public/js/lazyload.js","1526525e9fcf5d992a7c884deeec7224"],["D:/IDEADATE/blog/public/js/local-search.js","53461574609e41159a714670d9b66c0b"],["D:/IDEADATE/blog/public/js/main.js","e58bfe07cc0fa76da851c07d037972a3"],["D:/IDEADATE/blog/public/js/utils.js","edf4e1b7dbed6c7aef486133f319b75d"],["D:/IDEADATE/blog/public/lib/hint/hint.min.css","b5f3452bff6af473afc6ec1169990093"],["D:/IDEADATE/blog/public/links/index.html","83c825b8d415817758aaccf2c143ebeb"],["D:/IDEADATE/blog/public/music-cover/1.jpg","bec1dc0d1dc5f1a849429e24f3126ca4"],["D:/IDEADATE/blog/public/music-cover/2.jpg","f4486ecc74e0efced512c2a259932b18"],["D:/IDEADATE/blog/public/music-cover/3.jpg","31f2e027a456e1e7074666fa2bf06548"],["D:/IDEADATE/blog/public/music-cover/4.jpg","9371d4773d0f14f021796f22782b3507"],["D:/IDEADATE/blog/public/sw-register.js","74c746d99bf870720d74378bd520770a"],["D:/IDEADATE/blog/public/sw.js","cd135174904997b6aac7921e5f7e1c07"],["D:/IDEADATE/blog/public/tags/index.html","a52fde51e99df2e5492f683ba21ab5bf"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







