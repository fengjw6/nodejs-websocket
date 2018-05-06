'use strict';

var utils = require('../utils/writer.js');
var LoginAuth = require('../service/LoginAuthService');

module.exports.loginPost = function loginPost (req, res, next) {
  var authentication = req.swagger.params['authentication'].value;
  LoginAuth.loginPost(authentication)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
