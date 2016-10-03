define('mock-socket/helpers/message-event', ['exports', 'mock-socket/helpers/event-prototype'], function (exports, _mockSocketHelpersEventPrototype) {
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

  var MessageEvent = (function (_EventPrototype) {
    _inherits(MessageEvent, _EventPrototype);

    function MessageEvent(type) {
      var eventInitConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      _classCallCheck(this, MessageEvent);

      _EventPrototype.call(this);

      if (!type) {
        throw new TypeError('Failed to construct \'MessageEvent\': 1 argument required, but only 0 present.');
      }

      if (typeof eventInitConfig !== 'object') {
        throw new TypeError('Failed to construct \'MessageEvent\': parameter 2 (\'eventInitDict\') is not an object');
      }

      var bubbles = eventInitConfig.bubbles;
      var cancelable = eventInitConfig.cancelable;
      var data = eventInitConfig.data;
      var origin = eventInitConfig.origin;
      var lastEventId = eventInitConfig.lastEventId;
      var ports = eventInitConfig.ports;

      this.type = String(type);
      this.timeStamp = Date.now();
      this.target = null;
      this.srcElement = null;
      this.returnValue = true;
      this.isTrusted = false;
      this.eventPhase = 0;
      this.defaultPrevented = false;
      this.currentTarget = null;
      this.cancelable = cancelable ? Boolean(cancelable) : false;
      this.canncelBubble = false;
      this.bubbles = bubbles ? Boolean(bubbles) : false;
      this.origin = origin ? String(origin) : '';
      this.ports = typeof ports === 'undefined' ? null : ports;
      this.data = typeof data === 'undefined' ? null : data;
      this.lastEventId = lastEventId ? String(lastEventId) : '';
    }

    return MessageEvent;
  })(_mockSocketHelpersEventPrototype['default']);

  exports['default'] = MessageEvent;
});