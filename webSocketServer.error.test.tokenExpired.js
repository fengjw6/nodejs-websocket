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
    setTimeout(function () {
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

        ws.onerror = function (ev) {
            console.log('Error message: ' + ev.message); // Error message: Unexpected server response: 401
        };
    }, 11000); // wait for 11s so token will be expired
});



