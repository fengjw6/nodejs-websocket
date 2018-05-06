
var users = new Map();
users.set('test@gmail.com', '123');

exports.isValidUser = function (email, pwd) {
    return users.has(email) && users.get(email) === pwd;
};