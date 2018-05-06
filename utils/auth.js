'use strict';

var jwt = require('jsonwebtoken');
var secret = require('../data/jwt_secret');

exports.generate_token = function (email, expiry_time) {
    var payload = {
        email: email,
        expire: expiry_time
    };

    return jwt.sign(payload, secret.get_secret());
};
