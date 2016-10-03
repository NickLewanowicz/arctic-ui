define('ember-websockets/services/socket-io', ['exports', 'ember-websockets/services/websockets', 'ember-websockets/helpers/socketio-proxy'], function (exports, _emberWebsocketsServicesWebsockets, _emberWebsocketsHelpersSocketioProxy) {
  'use strict';

  exports['default'] = _emberWebsocketsServicesWebsockets['default'].extend({
    isWebSocketOpen: function isWebSocketOpen(socket) {
      return socket.io.readyState !== 'closed';
    },

    createSocket: function createSocket(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var newSocketIO = io(url, options);
      newSocketIO.connect();
      return newSocketIO;
    },

    createProxy: function createProxy(socket) {
      return _emberWebsocketsHelpersSocketioProxy['default'].create({ content: this, socket: socket });
    }
  });
});