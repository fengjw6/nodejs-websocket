'use strict';

var fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = require('connect')();
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var serverPort = 8081;

// swaggerRouter configuration
var options = {
  swaggerUi: path.join(__dirname, '/swagger.json'),
  controllers: path.join(__dirname, './controllers'),
  useStubs: process.env.NODE_ENV === 'development' // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync(path.join(__dirname,'api/swagger.yaml'), 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {

  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });

});

// websocket server
var WebSocketServer = require('ws').Server;
var auth = require('./utils/auth');

var wss = new WebSocketServer({
    verifyClient: function (info, cb) {
        var token = info.req.headers.token;
        if (!token) {
            // no token present
            console.error('no token present!!!');
            cb(false, 401, 'Unauthorized');
        } else {
            auth.verify_token(token, function (err, decoded) {
                if (err) {
                    // cannot decode, wrong token
                    console.error('wrong token!!!');
                    cb(false, 401, 'Unauthorized')
                } else {
                    if (decoded.expire <= Date.now()) {
                        // token is expired
                        console.error('token is expired!!!');
                        cb(false, 401, 'Unauthorized')
                    } else {
                        console.log('correct token!!!');
                        cb(true)
                    }
                }
            })
        }
    },
    port: 3001
}, function () {
    console.log('Websocket server is listening on port 3001! (http://localhost:3001)')
});

wss.on('connection', function connection(ws) {

    // send server time every 5s
    setInterval(function () {
        ws.send('server time is ' + Date.now());
    }, 5000);
});
