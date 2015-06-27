var request = require('supertest');
var assert = require("assert");

var Sails = require('sails');
var sails;
before(function(done) { 
	Sails.lift({ }, function(err, server) { 
		sails = server; if (err) return done(err);
		done(err, sails);
	});
}); 

describe('UsersController', function() {

  describe('#create()', function() {
    it('should create a user', function(done) {
      request(sails.hooks.http.app)
        .post('/api/v1/users')
        .send({ name: 'test', password: 'test' })
        .expect(201);
        done();
    });
  });

  describe('failingTest', function() {
  	it('should fail', function(done) {
  		assert('a' == 'b');
  		done();
  	});
  });

});