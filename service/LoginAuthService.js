'use strict';

var users = require('../data/users');
var auth = require('../utils/auth');

/**
 * Generate jwt token for user
 *
 * authentication Authentication 
 * returns Token
 **/
exports.loginPost = function(authentication) {
  return new Promise(function(resolve, reject) {

      if (users.isValidUser(authentication.email, authentication.password)) {

          // for example, let token expires in 10s
          var expire = Date.now() + 10 * 1000;

          resolve({
              token: auth.generate_token(authentication.email, expire)
          });
      } else {
          reject({
              message: "Invalid user data!"
          });
      }
  });
}

