/**
 * isVerified
 *
 * @module      :: isVerified
 * @description :: Policy to check if the requesting user is verified
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = ( req, res, next ) => {
    Users.findOne({ username: req.user.username }).exec((err, user) => {
        if(err) {
            res.status(400);
            res.send(err);
        }
        if(user && !user.isVerified) {
            res.status(401);
            res.send({message: 'You\'re not verified!'});
        }
        if(user && user.isVerified) {
            return next();
        }
    });
};