'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import WebSocket from './websocket';
import EventTarget from './event-target';
import networkBridge from './network-bridge';
import CLOSE_CODES from './helpers/close-codes';
import normalize from './helpers/normalize-url';
import globalObject from './helpers/global-object';
import { createEvent, createMessageEvent, createCloseEvent } from './event-factory';

/*
* https://github.com/websockets/ws#server-example
*/

var Server = (function (_EventTarget) {
  _inherits(Server, _EventTarget);

  /*
  * @param {string} url
  */

  function Server(url) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Server);

    _EventTarget.call(this);
    this.url = normalize(url);
    this._originalWebSocket = null;
    var server = networkBridge.attachServer(this, this.url);

    if (!server) {
      this.dispatchEvent(createEvent({ type: 'error' }));
      throw new Error('A mock server is already listening on this url');
    }

    this.options = Object.assign({
      verifiyClient: null
    }, options);

    this.start();
  }

  /*
   * Alternative constructor to support namespaces in socket.io
   *
   * http://socket.io/docs/rooms-and-namespaces/#custom-namespaces
   */

  /*
  * Attaches the mock websocket object to the global object
  */

  Server.prototype.start = function start() {
    var globalObj = globalObject();

    if (globalObj.WebSocket) {
      this._originalWebSocket = globalObj.WebSocket;
    }

    globalObj.WebSocket = WebSocket;
  };

  /*
  * Removes the mock websocket object from the global object
  */

  Server.prototype.stop = function stop() {
    var globalObj = globalObject();

    if (this._originalWebSocket) {
      globalObj.WebSocket = this._originalWebSocket;
    } else {
      delete globalObj.WebSocket;
    }

    this._originalWebSocket = null;

    networkBridge.removeServer(this.url);
  };

  /*
  * This is the main function for the mock server to subscribe to the on events.
  *
  * ie: mockServer.on('connection', function() { console.log('a mock client connected'); });
  *
  * @param {string} type - The event key to subscribe to. Valid keys are: connection, message, and close.
  * @param {function} callback - The callback which should be called when a certain event is fired.
  */

  Server.prototype.on = function on(type, callback) {
    this.addEventListener(type, callback);
  };

  /*
  * This send function will notify all mock clients via their onmessage callbacks that the server
  * has a message for them.
  *
  * @param {*} data - Any javascript object which will be crafted into a MessageObject.
  */

  Server.prototype.send = function send(data) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.emit('message', data, options);
  };

  /*
  * Sends a generic message event to all mock clients.
  */

  Server.prototype.emit = function emit(event, data) {
    var _this2 = this;

    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
    var websockets = options.websockets;

    if (!websockets) {
      websockets = networkBridge.websocketsLookup(this.url);
    }

    if (typeof options !== 'object' || arguments.length > 3) {
      data = Array.prototype.slice.call(arguments, 1, arguments.length);
    }

    websockets.forEach(function (socket) {
      if (Array.isArray(data)) {
        socket.dispatchEvent.apply(socket, [createMessageEvent({
          type: event,
          data: data,
          origin: _this2.url,
          target: socket
        })].concat(data));
      } else {
        socket.dispatchEvent(createMessageEvent({
          type: event,
          data: data,
          origin: _this2.url,
          target: socket
        }));
      }
    });
  };

  /*
  * Closes the connection and triggers the onclose method of all listening
  * websockets. After that it removes itself from the urlMap so another server
  * could add itself to the url.
  *
  * @param {object} options
  */

  Server.prototype.close = function close() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var code = options.code;
    var reason = options.reason;
    var wasClean = options.wasClean;

    var listeners = networkBridge.websocketsLookup(this.url);

    listeners.forEach(function (socket) {
      socket.readyState = WebSocket.CLOSE;
      socket.dispatchEvent(createCloseEvent({
        type: 'close',
        target: socket,
        code: code || CLOSE_CODES.CLOSE_NORMAL,
        reason: reason || '',
        wasClean: wasClean
      }));
    });

    this.dispatchEvent(createCloseEvent({ type: 'close' }), this);
    networkBridge.removeServer(this.url);
  };

  /*
  * Returns an array of websockets which are listening to this server
  */

  Server.prototype.clients = function clients() {
    return networkBridge.websocketsLookup(this.url);
  };

  /*
  * Prepares a method to submit an event to members of the room
  *
  * e.g. server.to('my-room').emit('hi!');
  */

  Server.prototype.to = function to(room, broadcaster) {
    var _this = this;
    var websockets = networkBridge.websocketsLookup(this.url, room, broadcaster);
    return {
      emit: function emit(event, data) {
        _this.emit(event, data, { websockets: websockets });
      }
    };
  };

  /*
   * Alias for Server.to
   */

  Server.prototype['in'] = function _in() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this.to.apply(null, args);
  };

  return Server;
})(EventTarget);

Server.of = function of(url) {
  return new Server(url);
};

export default Server;