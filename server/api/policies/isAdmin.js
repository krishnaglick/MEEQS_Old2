/**
 * isAdmin
 *
 * @module      :: Policy
 * @description :: Policy to check if the requesting user is an admin
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var actionUtil = require( '../../node_modules/sails/lib/hooks/blueprints/actionUtil' );

module.exports = function ( req, res, next ) {
    function isAdmin() {
        return true;
    }

    if(isAdmin())
        return next();
    else
        res.redirect('/');
};