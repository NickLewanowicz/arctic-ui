import Ember from 'ember';

var bind = Ember.run.bind;
var assert = Ember.assert;
var ObjectProxy = Ember.ObjectProxy;

export default ObjectProxy.extend({

  /*
  * {
  *    url: 'String'
  *    type: 'String'
  *    callback: The function to envoke
  *    context: The context of the function
  *    ref: The actual callback function with is given to socketio
  * }
  */
  listeners: null,

  init: function init() {
    this._super.apply(this, arguments);
    this.listeners = [];
  },

  /*
  * This method simply passes the arguments to the socketio on method except it binds the callback function to
  * the run loop.
  */
  on: function on(type, callback, context) {
    assert('The second argument must be a function.', typeof callback === 'function');

    var bindedCallback = bind(context, callback);
    this.listeners.push({ url: this.socket.io.uri, type: type, callback: callback, context: context, ref: bindedCallback });
    this.socket.on(type, bindedCallback);
  },

  off: function off(type, callback) {
    var _this = this;

    assert('The second argument must be a function.', typeof callback === 'function');
    var listeners = this.listeners.filter(function (listener) {
      return listener.callback === callback && listener.url === _this.socket.io.uri && listener.type === type;
    });

    if (listeners) {
      listeners.forEach(function (item) {
        return _this.socket.off(type, item.ref);
      });
    }

    this.listeners = this.listeners.filter(function (l) {
      return listeners.indexOf(l) === -1;
    });
  },

  /*
  * This method passes the argument to the socketio emit method.
  */
  emit: function emit() {
    this.socket.emit.apply(this.socket, arguments);
  },

  close: function close() {
    var _this2 = this;

    this.listeners = this.listeners.filter(function (listener) {
      return listener.url === _this2.socket.io.uri;
    });
    this.socket.close.apply(this.socket, arguments);
  },

  send: function send() {
    this.socket.send.apply(this.socket, arguments);
  },
  connect: function connect() {
    this.socket.connect.apply(this.socket, arguments);
  }
});