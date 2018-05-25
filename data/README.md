
Minimal PWA
----

> Very simple code to demonstrate Progressive Web Apps.

### Usage

This demo app runs on `localhost`.

```bash
  yarn

  yarn start
```

Then open <http://localhost:8080> with Chrome.

Change `cacheStorageKey` in `sw.js` to update app version.

### Trouble shooting

* Why `-c-1` to disable cache?

`sw.js` can be cached by HTTP Caches, then in debugging we could get unexpected behaviors. Disable the cache to simplify the problem.

### License

MIT
