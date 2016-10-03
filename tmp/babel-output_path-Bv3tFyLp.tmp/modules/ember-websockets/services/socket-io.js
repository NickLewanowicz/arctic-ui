import WebSocketService from './websockets';
import SocketIOProxy from '../helpers/socketio-proxy';

export default WebSocketService.extend({
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
    return SocketIOProxy.create({ content: this, socket: socket });
  }
});