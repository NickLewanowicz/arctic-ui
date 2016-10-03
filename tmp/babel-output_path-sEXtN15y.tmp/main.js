'use strict';

import MockServer from './server';
import MockSocketIO from './socket-io';
import MockWebSocket from './websocket';

var Server = MockServer;
export { Server };
var WebSocket = MockWebSocket;
export { WebSocket };
var SocketIO = MockSocketIO;
export { SocketIO };