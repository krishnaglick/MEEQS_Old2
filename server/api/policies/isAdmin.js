/**
 * isAdmin
 *
 * @module      :: isAdmin
 * @description :: Policy to check if the requesting user is an admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = ( req, res, next ) => {
    Users.findOne({ username: req.user.username }).exec((err, user) => {
        if(err) {
            res.status(400);
            res.send(err);
        }
        if(user && !user.isAdmin) {
            res.status(401);
            res.send('You\'re not an admin!');
        }
        if(user && user.isAdmin) {
            return next();
        }
    });
};