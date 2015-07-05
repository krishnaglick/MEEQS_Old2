var Sails = require('sails'),
    sails;

before(function(done) {
  Sails.lift({
    // configuration for testing purposes
    models: {
      connection: 'test',
      migrate: 'drop'
    },
    hooks: {
      grunt: false
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    // here you can load fixtures, etc.
    sails.models.users.create({
      username: 'testadmin',
      password: 'testadmin',
      email: 'test@test.com',
      isVerified: true,
      isAdmin: true
    }).exec((err, data) => {
      if(err) {
        done(err, sails);
      }
    });

    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  Sails.lower(done);
});