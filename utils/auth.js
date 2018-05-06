'use strict';

var jwt = require('jsonwebtoken');
var secret = require('../data/jwt_secret');

/**
 * Generate token by email from request user and a token expiry time set in service
 * @param email
 * @param expiry_time
 * @returns token
 */
exports.generate_token = function (email, expiry_time) {
    var payload = {
        email: email,
        expire: expiry_time
    };

    return jwt.sign(payload, secret.get_secret());
};

/**
 * Verify the jwt token from connection request
 * @param token
 * @param callback
 */
exports.verify_token = function (token, callback) {
    jwt.verify(token, secret.get_secret(), callback);
};
