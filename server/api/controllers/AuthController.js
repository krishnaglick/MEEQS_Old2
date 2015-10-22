var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false,
        index: false
    },

    login: function(req, res) {
        //Lets see what this does...
        passport.authenticate('local', { session: false }, function(err, user, info) {
            if ((err) || (!user)) {
              res.status(401);
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                  res.status(400);
                  res.send(err);
                }
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        return res.send({
            message: "Logged out.",
            user: false
        });
    },

    auth: (req, res) => {
        if(req.user) {
            return res.ok({user: req.user.toJSON()});
        }
        else if(req.session.passport.user) {
            User.findOne(req.session.passport.user).exec((err, data) => {
                return res.ok({user: data.toJSON()});
            });
        }
        return res.badRequest({error:'Missing or Invalid Session'});
    }
};

