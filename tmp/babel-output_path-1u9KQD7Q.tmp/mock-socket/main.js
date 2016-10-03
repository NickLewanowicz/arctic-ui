define('mock-socket/main', ['exports', 'mock-socket/server', 'mock-socket/socket-io', 'mock-socket/websocket'], function (exports, _mockSocketServer, _mockSocketSocketIo, _mockSocketWebsocket) {
  'use strict';

  var Server = _mockSocketServer['default'];
  exports.Server = Server;

  var WebSocket = _mockSocketWebsocket['default'];
  exports.WebSocket = WebSocket;

  var SocketIO = _mockSocketSocketIo['default'];
  exports.SocketIO = SocketIO;
});