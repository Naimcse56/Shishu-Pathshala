/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "index.html",
    "revision": "551e023e0cd72db4766d86361362ad8a"
  }, {
    "url": "icon.svg",
    "revision": "9a88593d0169c4f48569941734f3a98f"
  }, {
    "url": "icon-512.png",
    "revision": "ed4ce2924aa51200c30426ac8ca6dfa1"
  }, {
    "url": "icon-512-maskable.png",
    "revision": "21d0323507e7ce3e79832354ba6cf32c"
  }, {
    "url": "icon-192.png",
    "revision": "72ce85d0faf35ba088b5b1851fbf2bbb"
  }, {
    "url": "favicon.ico",
    "revision": "922394f435db058ab439e7bd308c9522"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "38df12e82f90a975bc0b877482868730"
  }, {
    "url": "assets/web-DwmURcae.js",
    "revision": null
  }, {
    "url": "assets/web-CHIyltJV.js",
    "revision": null
  }, {
    "url": "assets/index-Dvf8s9AD.js",
    "revision": null
  }, {
    "url": "assets/index-Dq3uBZIh.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "38df12e82f90a975bc0b877482868730"
  }, {
    "url": "favicon.ico",
    "revision": "922394f435db058ab439e7bd308c9522"
  }, {
    "url": "icon-192.png",
    "revision": "72ce85d0faf35ba088b5b1851fbf2bbb"
  }, {
    "url": "icon-512-maskable.png",
    "revision": "21d0323507e7ce3e79832354ba6cf32c"
  }, {
    "url": "icon-512.png",
    "revision": "ed4ce2924aa51200c30426ac8ca6dfa1"
  }, {
    "url": "icon.svg",
    "revision": "9a88593d0169c4f48569941734f3a98f"
  }, {
    "url": "manifest.webmanifest",
    "revision": "1e845589141fa87ef209054c58d2625f"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
