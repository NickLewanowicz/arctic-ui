export { normalizeURL };
export { cleanURL };
/*
* The native websocket object will transform urls without a pathname to have just a /.
* As an example: ws://localhost:8080 would actually be ws://localhost:8080/ but ws://example.com/foo would not
* change. This function does this transformation to stay inline with the native websocket implementation.
*/

function normalizeURL(url) {
  var parsedUrl = new URI(url);
  var path = parsedUrl.path();
  var query = parsedUrl.query();

  if (path === '/') {
    if (query === '' && url.slice(-1) !== '/') {
      return url + '/';
    }

    if (query !== '' && url.indexOf('/?') === -1) {
      return url.replace('?', '/?');
    }
  }

  return url;
}

/*
* Since the url will be used as a key will need to make sure that it does not
* contain '.' as it will throw ember off
*/

function cleanURL(url) {
  return url.replace(/\./g, '');
}