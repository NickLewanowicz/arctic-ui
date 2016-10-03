'use strict';

export default normalizeUrl;

function normalizeUrl(url) {
  var parts = url.split('://');
  return parts[1] && parts[1].indexOf('/') === -1 ? url + '/' : url;
}