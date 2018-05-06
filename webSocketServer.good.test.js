// this is test require ws and request
const WebSocket = require('ws');
var request = require('request');

request({
    url: 'http://localhost:8081/v1/auth',
    method: 'POST',
    json: true,
    body: {
        password: '123',
        email: 'test@gmail.com'
    }
}, function (error, response, body){
    // init web socket connection after got token
    var ws = new WebSocket('ws://localhost:3001',{
        headers : {
            "token": body.token
        }
    });

    // consuming server time messages
    ws.on('message', function incoming(data) {
        console.log(data);
    });
});