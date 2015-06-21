/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Policy to check if the requesting user is an admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function ( req, res, next ) {
    function isAdmin(username) {
        Users.findOne({ username: username }, function (err, user) {
            if (err || !user) {
                return false;
            }

            return user.isAdmin;
        });
    }

    if(isAdmin(req.user.username)) {
        return next();
    }
    else {
        res.redirect('/');
    }
};