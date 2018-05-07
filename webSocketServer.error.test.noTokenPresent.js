const WebSocket = require('ws');

var ws = new WebSocket('ws://localhost:3001');

ws.onerror = function (ev) {
    console.log('Error message: ' + ev.message); // Error message: Unexpected server response: 401
};