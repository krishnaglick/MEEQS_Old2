var request = require('supertest');

describe('UsersController', function() {

  describe('#create()', function() {
    it('should create a user', function (done) {
      request(sails.hooks.http.app)
        .post('/api/v1/users')
        .send({ name: 'test', password: 'test' })
        .expect(201);
        done();
    });
  });

});