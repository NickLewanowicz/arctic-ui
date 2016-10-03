define('mock-socket/websocket', ['exports', 'mock-socket/helpers/delay', 'mock-socket/event-target', 'mock-socket/network-bridge', 'mock-socket/helpers/close-codes', 'mock-socket/helpers/normalize-url', 'mock-socket/event-factory'], function (exports, _mockSocketHelpersDelay, _mockSocketEventTarget, _mockSocketNetworkBridge, _mockSocketHelpersCloseCodes, _mockSocketHelpersNormalizeUrl, _mockSocketEventFactory) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
      throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /*
  * The main websocket class which is designed to mimick the native WebSocket class as close
  * as possible.
  *
  * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
  */

  var WebSocket = (function (_EventTarget) {
    _inherits(WebSocket, _EventTarget);

    /*
    * @param {string} url
    */

    function WebSocket(url) {
      var protocol = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

      _classCallCheck(this, WebSocket);

      _EventTarget.call(this);

      if (!url) {
        throw new TypeError('Failed to construct \'WebSocket\': 1 argument required, but only 0 present.');
      }

      this.binaryType = 'blob';
      this.url = (0, _mockSocketHelpersNormalizeUrl['default'])(url);
      this.readyState = WebSocket.CONNECTING;
      this.protocol = '';

      if (typeof protocol === 'string') {
        this.protocol = protocol;
      } else if (Array.isArray(protocol) && protocol.length > 0) {
        this.protocol = protocol[0];
      }

      /*
      * In order to capture the callback function we need to define custom setters.
      * To illustrate:
      *   mySocket.onopen = function() { alert(true) };
      *
      * The only way to capture that function and hold onto it for later is with the
      * below code:
      */
      Object.defineProperties(this, {
        onopen: {
          configurable: true,
          enumerable: true,
          get: function get() {
            return this.listeners.open;
          },
          set: function set(listener) {
            this.addEventListener('open', listener);
          }
        },
        onmessage: {
          configurable: true,
          enumerable: true,
          get: function get() {
            return this.listeners.message;
          },
          set: function set(listener) {
            this.addEventListener('message', listener);
          }
        },
        onclose: {
          configurable: true,
          enumerable: true,
          get: function get() {
            return this.listeners.close;
          },
          set: function set(listener) {
            this.addEventListener('close', listener);
          }
        },
        onerror: {
          configurable: true,
          enumerable: true,
          get: function get() {
            return this.listeners.error;
          },
          set: function set(listener) {
            this.addEventListener('error', listener);
          }
        }
      });

      var server = _mockSocketNetworkBridge['default'].attachWebSocket(this, this.url);

      /*
      * This delay is needed so that we dont trigger an event before the callbacks have been
      * setup. For example:
      *
      * var socket = new WebSocket('ws://localhost');
      *
      * // If we dont have the delay then the event would be triggered right here and this is
      * // before the onopen had a chance to register itself.
      *
      * socket.onopen = () => { // this would never be called };
      *
      * // and with the delay the event gets triggered here after all of the callbacks have been
      * // registered :-)
      */
      (0, _mockSocketHelpersDelay['default'])(function delayCallback() {
        if (server) {
          if (server.options.verifyClient && typeof server.options.verifyClient === 'function' && !server.options.verifyClient()) {
            this.readyState = WebSocket.CLOSED;

            /* eslint-disable no-console */
            console.error('WebSocket connection to \'' + this.url + '\' failed: HTTP Authentication failed; no valid credentials available');
            /* eslint-enable no-console */

            _mockSocketNetworkBridge['default'].removeWebSocket(this, this.url);
            this.dispatchEvent((0, _mockSocketEventFactory.createEvent)({ type: 'error', target: this }));
            this.dispatchEvent((0, _mockSocketEventFactory.createCloseEvent)({ type: 'close', target: this, code: _mockSocketHelpersCloseCodes['default'].CLOSE_NORMAL }));
          } else {
            this.readyState = WebSocket.OPEN;
            server.dispatchEvent((0, _mockSocketEventFactory.createEvent)({ type: 'connection' }), server, this);
            this.dispatchEvent((0, _mockSocketEventFactory.createEvent)({ type: 'open', target: this }));
          }
        } else {
          this.readyState = WebSocket.CLOSED;
          this.dispatchEvent((0, _mockSocketEventFactory.createEvent)({ type: 'error', target: this }));
          this.dispatchEvent((0, _mockSocketEventFactory.createCloseEvent)({ type: 'close', target: this, code: _mockSocketHelpersCloseCodes['default'].CLOSE_NORMAL }));

          /* eslint-disable no-console */
          console.error('WebSocket connection to \'' + this.url + '\' failed');
          /* eslint-enable no-console */
        }
      }, this);
    }

    /*
    * Transmits data to the server over the WebSocket connection.
    *
    * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#send()
    */

    WebSocket.prototype.send = function send(data) {
      if (this.readyState === WebSocket.CLOSING || this.readyState === WebSocket.CLOSED) {
        throw new Error('WebSocket is already in CLOSING or CLOSED state');
      }

      var messageEvent = (0, _mockSocketEventFactory.createMessageEvent)({
        type: 'message',
        origin: this.url,
        data: data
      });

      var server = _mockSocketNetworkBridge['default'].serverLookup(this.url);

      if (server) {
        server.dispatchEvent(messageEvent, data);
      }
    };

    /*
    * Closes the WebSocket connection or connection attempt, if any.
    * If the connection is already CLOSED, this method does nothing.
    *
    * https://developer.mozilla.org/en-US/docs/Web/API/WebSocket#close()
    */

    WebSocket.prototype.close = function close() {
      if (this.readyState !== WebSocket.OPEN) {
        return undefined;
      }

      var server = _mockSocketNetworkBridge['default'].serverLookup(this.url);
      var closeEvent = (0, _mockSocketEventFactory.createCloseEvent)({
        type: 'close',
        target: this,
        code: _mockSocketHelpersCloseCodes['default'].CLOSE_NORMAL
      });

      _mockSocketNetworkBridge['default'].removeWebSocket(this, this.url);

      this.readyState = WebSocket.CLOSED;
      this.dispatchEvent(closeEvent);

      if (server) {
        server.dispatchEvent(closeEvent, server);
      }
    };

    return WebSocket;
  })(_mockSocketEventTarget['default']);

  WebSocket.CONNECTING = 0;
  WebSocket.OPEN = 1;
  WebSocket.CLOSING = 2;
  WebSocket.CLOSED = 3;

  exports['default'] = WebSocket;
});