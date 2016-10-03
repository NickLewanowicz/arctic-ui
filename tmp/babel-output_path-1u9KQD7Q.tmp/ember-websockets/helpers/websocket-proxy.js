define('ember-websockets/helpers/websocket-proxy', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var events = ['close', 'error', 'message', 'open'];
  var _Array$prototype = Array.prototype;
  var filter = _Array$prototype.filter;
  var indexOf = _Array$prototype.indexOf;
  var forEach = _Array$prototype.forEach;
  var assert = _ember['default'].assert;

  exports['default'] = _ember['default'].ObjectProxy.extend({

    /*
    * {
    *    url: 'String'
    *    type: 'String' (such as 'open', 'message', 'close', and 'error')
    *    callback: The function to envoke
    *    context: The context of the function
    * }
    */
    listeners: null,

    protocols: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.listeners = [];
      this.setupInternalListeners();
    },

    /*
    * Adds a callback function into the listeners array which will
    * be invoked later whenever a given `type` event happens.
    *
    * type: must be either 'open', 'message', 'close', 'error'
    */
    on: function on(type, callback, context) {
      assert(type + ' is not a recognized event name. Please use on of the following: ' + events.join(', '), indexOf.call(events, type) !== -1);
      assert('The second argument must be a function.', typeof callback === 'function');

      this.listeners.push({ url: this.socket.url, type: type, callback: callback, context: context });
    },

    /*
    * Removes a callback function from the listeners array. This callback
    * will not longer be invoked when the given `type` event happens.
    */
    off: function off(type, callback) {
      this.listeners = filter.call(this.listeners, function (listeners) {
        return !(listeners.callback === callback && listeners.type === type);
      });
    },

    /*
    * Message is the message which will be passed into the native websockets send method
    * and shouldStringify is a boolean which determines if we should call JSON.stringify on
    * the message.
    */
    send: function send(message) {
      var shouldStringify = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      if (shouldStringify && JSON && JSON.stringify) {
        message = JSON.stringify(message);
      }

      assert('Cannot send message to the websocket while it is not open.', this.readyState() === WebSocket.OPEN);

      this.socket.send(message);
    },

    close: function close() {
      this.socket.close();
    },

    reconnect: function reconnect() {
      this.set('socket', new WebSocket(this.socket.url, this.get('protocols')));
      this.setupInternalListeners();
    },

    setupInternalListeners: function setupInternalListeners() {
      var _this = this;

      forEach.call(events, function (eventName) {
        _this.socket['on' + eventName] = function (event) {
          _ember['default'].run(function () {
            var activeListeners = filter.call(_this.listeners, function (listener) {
              return listener.url === event.currentTarget.url && listener.type === eventName;
            });

            // TODO: filter active listeners for contexts that are not destroyed
            forEach.call(activeListeners, function (item) {
              if (item.context) {
                item.callback.call(item.context, event);
              } else {
                item.callback(event);
              }
            });
          });
        };
      });
    },

    /*
    * A helper method to get access to the readyState of the websocket.
    */
    readyState: function readyState() {
      return this.socket.readyState;
    }
  });
});