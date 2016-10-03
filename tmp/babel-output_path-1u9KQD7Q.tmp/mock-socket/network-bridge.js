define('mock-socket/network-bridge', ['exports', 'mock-socket/helpers/array-helpers'], function (exports, _mockSocketHelpersArrayHelpers) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  /*
  * The network bridge is a way for the mock websocket object to 'communicate' with
  * all available servers. This is a singleton object so it is important that you
  * clean up urlMap whenever you are finished.
  */

  var NetworkBridge = (function () {
    function NetworkBridge() {
      _classCallCheck(this, NetworkBridge);

      this.urlMap = {};
    }

    /*
    * Attaches a websocket object to the urlMap hash so that it can find the server
    * it is connected to and the server in turn can find it.
    *
    * @param {object} websocket - websocket object to add to the urlMap hash
    * @param {string} url
    */

    NetworkBridge.prototype.attachWebSocket = function attachWebSocket(websocket, url) {
      var connectionLookup = this.urlMap[url];

      if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) === -1) {
        connectionLookup.websockets.push(websocket);
        return connectionLookup.server;
      }
    };

    /*
    * Attaches a websocket to a room
    */

    NetworkBridge.prototype.addMembershipToRoom = function addMembershipToRoom(websocket, room) {
      var connectionLookup = this.urlMap[websocket.url];

      if (connectionLookup && connectionLookup.server && connectionLookup.websockets.indexOf(websocket) !== -1) {
        if (!connectionLookup.roomMemberships[room]) {
          connectionLookup.roomMemberships[room] = [];
        }

        connectionLookup.roomMemberships[room].push(websocket);
      }
    };

    /*
    * Attaches a server object to the urlMap hash so that it can find a websockets
    * which are connected to it and so that websockets can in turn can find it.
    *
    * @param {object} server - server object to add to the urlMap hash
    * @param {string} url
    */

    NetworkBridge.prototype.attachServer = function attachServer(server, url) {
      var connectionLookup = this.urlMap[url];

      if (!connectionLookup) {
        this.urlMap[url] = {
          server: server,
          websockets: [],
          roomMemberships: {}
        };

        return server;
      }
    };

    /*
    * Finds the server which is 'running' on the given url.
    *
    * @param {string} url - the url to use to find which server is running on it
    */

    NetworkBridge.prototype.serverLookup = function serverLookup(url) {
      var connectionLookup = this.urlMap[url];

      if (connectionLookup) {
        return connectionLookup.server;
      }
    };

    /*
    * Finds all websockets which is 'listening' on the given url.
    *
    * @param {string} url - the url to use to find all websockets which are associated with it
    * @param {string} room - if a room is provided, will only return sockets in this room
    * @param {class} broadcaster - socket that is broadcasting and is to be excluded from the lookup
    */

    NetworkBridge.prototype.websocketsLookup = function websocketsLookup(url, room, broadcaster) {
      var websockets = undefined;
      var connectionLookup = this.urlMap[url];

      websockets = connectionLookup ? connectionLookup.websockets : [];

      if (room) {
        var members = connectionLookup.roomMemberships[room];
        websockets = members || [];
      }

      return broadcaster ? websockets.filter(function (websocket) {
        return websocket !== broadcaster;
      }) : websockets;
    };

    /*
    * Removes the entry associated with the url.
    *
    * @param {string} url
    */

    NetworkBridge.prototype.removeServer = function removeServer(url) {
      delete this.urlMap[url];
    };

    /*
    * Removes the individual websocket from the map of associated websockets.
    *
    * @param {object} websocket - websocket object to remove from the url map
    * @param {string} url
    */

    NetworkBridge.prototype.removeWebSocket = function removeWebSocket(websocket, url) {
      var connectionLookup = this.urlMap[url];

      if (connectionLookup) {
        connectionLookup.websockets = (0, _mockSocketHelpersArrayHelpers.reject)(connectionLookup.websockets, function (socket) {
          return socket === websocket;
        });
      }
    };

    /*
    * Removes a websocket from a room
    */

    NetworkBridge.prototype.removeMembershipFromRoom = function removeMembershipFromRoom(websocket, room) {
      var connectionLookup = this.urlMap[websocket.url];
      var memberships = connectionLookup.roomMemberships[room];

      if (connectionLookup && memberships !== null) {
        connectionLookup.roomMemberships[room] = (0, _mockSocketHelpersArrayHelpers.reject)(memberships, function (socket) {
          return socket === websocket;
        });
      }
    };

    return NetworkBridge;
  })();

  exports['default'] = new NetworkBridge();
  // Note: this is a singleton
});