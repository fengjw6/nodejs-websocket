'use strict';


/**
 * Generate jwt token for user
 *
 * authentication Authentication 
 * returns Token
 **/
exports.loginPost = function(authentication) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "token" : "token"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

