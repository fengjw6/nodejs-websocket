
// dummy user database
var users = new Map();
users.set('test@gmail.com', '123');

/**
 * Dummy data service to check validity of user information
 * @param email
 * @param pwd
 * @returns {*|Promise<boolean>|boolean}
 */
exports.isValidUser = function (email, pwd) {
    return users.has(email) && users.get(email) === pwd;
};