/**
 * @param url {string}
 * @returns {string}
 */
export function globalStaticAssets(url) {
  return new URL(`../assets/${url}`, import.meta.url).href;
}

/**
 * @param app {App<Element>}
 * @returns {string}
 */
export function globalVersion(app) {
  return app.version;
}
