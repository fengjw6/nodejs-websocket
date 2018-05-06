
var expect = require('chai').expect;
var loginAuthService = require('../service/LoginAuthService');

var valid_auth = {
    email: 'test@gmail.com',
    password: '123'
};

var invalid_auth = {
    email: 'wrong@email.com',
    password: '000'
};

describe('Test login auth service', function() {
    it('Good case', function() {
        loginAuthService.loginPost(valid_auth)
            .then(function (response) {
                // resolve case
                expect(response).to.have.property('token');
            });
    });

    it('Error case', function () {
        loginAuthService.loginPost(invalid_auth)
            .then()
            .catch(function (reason) {
                // reject case
                expect(reason).to.have.property('message');
            });
    });
});




