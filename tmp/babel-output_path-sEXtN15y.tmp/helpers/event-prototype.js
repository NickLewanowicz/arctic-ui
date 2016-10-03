'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var EventPrototype = (function () {
  function EventPrototype() {
    _classCallCheck(this, EventPrototype);
  }

  // Noops

  EventPrototype.prototype.stopPropagation = function stopPropagation() {};

  EventPrototype.prototype.stopImmediatePropagation = function stopImmediatePropagation() {};

  // if no arguments are passed then the type is set to "undefined" on
  // chrome and safari.

  EventPrototype.prototype.initEvent = function initEvent() {
    var type = arguments.length <= 0 || arguments[0] === undefined ? 'undefined' : arguments[0];
    var bubbles = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
    var cancelable = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    this.type = String(type);
    this.bubbles = Boolean(bubbles);
    this.cancelable = Boolean(cancelable);
  };

  return EventPrototype;
})();

export default EventPrototype;