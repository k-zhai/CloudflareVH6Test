import { Router } from 'service-worker-router'
import * as cfHello from './cf-handle-hello'
import * as cfLogin from './cf-handle-login'

declare const self: ServiceWorkerGlobalScope;

const router = new Router();

router.get('/hello', cfHello);
router.post('/login', cfLogin);

// Set up service worker event listener
// To resolve 'FetchEvent' add 'webworker' to the lib property in your tsconfig.json
self.addEventListener('fetch', (event: FetchEvent) => {
  // Will test event.request against the defined routes
  // and use event.respondWith(handler) when a route matches
  router.handleEvent(event)
})
