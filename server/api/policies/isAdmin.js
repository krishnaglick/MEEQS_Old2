/**
 * isAdmin
 *
 * @module      :: isAdmin
 * @description :: Policy to check if the requesting user is an admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = ( req, res, next ) => {
    function isAdmin(username) {
        debugger;
        Users.findOne({ username: username }, function (err, user) {
            if (err || !user) {
                console.log('Error: ', err);
                console.log('User: ', user);
                debugger;
                return false;
            }

            console.log('isAdmin:', user.isAdmin);
            debugger;
            return user.isAdmin;
        });
    }

    if(isAdmin(req.user.username)) {
        return next();
    }
    else {
        res.status(401);
        debugger;
        res.send('You\'re not an admin!')
    }
};