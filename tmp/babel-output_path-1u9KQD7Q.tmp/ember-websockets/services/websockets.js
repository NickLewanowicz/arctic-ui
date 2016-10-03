define('ember-websockets/services/websockets', ['exports', 'ember', 'ember-websockets/helpers/websocket-proxy', 'ember-websockets/helpers'], function (exports, _ember, _emberWebsocketsHelpersWebsocketProxy, _emberWebsocketsHelpers) {
  'use strict';

  var Service = _ember['default'].Service;
  var get = _ember['default'].get;
  var set = _ember['default'].set;

  exports['default'] = Service.extend({
    /*
      A hash of open websocket connections. This
      allows multiple components to share the same connection.
       {
        'websocket-url': WebSocket Proxy object
      }
    */
    sockets: {},

    /*
      socketFor returns a websocket proxy object. On this object there is a property `socket`
      which contains the actual websocket object. This websocket object is cached based off of the url meaning
      multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      /*
        Websockets allows either a string or array of strings to be passed as the second argument.
        Normalize both cases into an array of strings so we can just deal with arrays.
      */
      if (typeof protocols === 'string') {
        protocols = [protocols];
      }

      /*
        Normalize the url as native websockets add a / to the end of the url:
        http://example.com:8000 becomes: http://example.com:8000/
         Since the url will be used as a key will need to make sure that it does not
        contain '.' as it will throw ember off
      */
      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = (0, _emberWebsocketsHelpers.cleanURL)(normalizedUrl);

      /*
       */
      var existingProxy = get(this, 'sockets.' + cleanedUrl);

      if (existingProxy && this.isWebSocketOpen(existingProxy.socket)) {
        return existingProxy;
      }

      /*
        we can get to this place if the websocket has been closed and we are trying to reopen
        or we are creating a proxy for the first time
      */
      var newWebSocket = this.createSocket(normalizedUrl, protocols);

      if (existingProxy) {
        /*
          If there is an existing socket in place we simply update the websocket object and not
          the whole proxy as we dont want to destroy the previous listeners.
        */
        existingProxy.socket = newWebSocket;
        return existingProxy;
      }

      var newProxy = this.createProxy(newWebSocket, protocols);

      set(this, 'sockets.' + cleanedUrl, newProxy);

      return newProxy;
    },

    closeSocketFor: function closeSocketFor(url) {
      var cleanedUrl = (0, _emberWebsocketsHelpers.cleanURL)((0, _emberWebsocketsHelpers.normalizeURL)(url));
      get(this, 'sockets.' + cleanedUrl).socket.close();
    },

    isWebSocketOpen: function isWebSocketOpen(websocket) {
      return websocket.readyState !== WebSocket.CLOSED;
    },

    createSocket: function createSocket(url, options) {
      return new WebSocket(url, options);
    },

    createProxy: function createProxy(socket, protocols) {
      return _emberWebsocketsHelpersWebsocketProxy['default'].create({ content: this, protocols: protocols, socket: socket });
    }
  });
});