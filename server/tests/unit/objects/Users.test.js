var request = require('supertest'),
		admin,
    user;
var assert = require('chai').assert;

describe('Setup Users', () => {
  it('should login as an admin', (done) => {
    admin = request.agent(sails.hooks.http.app);
    admin
      .post('/login')
      .send({username: 'testadmin', password: 'testadmin'})
      .end((err, res) => { done(); });
  });

  it('should login as a user', (done) => {
    user = request.agent(sails.hooks.http.app);
    user
      .post('/login')
      .send({username: 'testuserverified', password: 'testuserverified'})
      .end((err, res) => { done(); });
  });
});

describe('UsersController', () => {
	var createdUserID;
	it('should create a user', (done) => {
   admin
    .post('/api/v1/users')
    .send({users: { username: 'test', password: 'test12' }})
    .end((err, res) => {
    	assert(res.statusCode == 201, 'User was not created, status code');
    	let users = res.body.users;
    	assert.ok(users, 'User was not created');
    	createdUserID = users.userID;
    	assert.ok(createdUserID, 'Don\'t have user id');
    	done();
    });
	});

	it('should find the created test user', (done) => {
		admin
    .get(`/api/v1/users/${createdUserID}`)
    .end((err, res) => {
    	assert(res.statusCode == 200, 'User not found, status code.');
    	let user = res.body.users;
    	assert.ok(user, 'User not found, truthy test');
    	assert(user.username == 'test', 'Wrong username pulled');
    	done();
    });
	});

	it('should delete created test user', (done) => {
		admin
    .del(`/api/v1/users/${createdUserID}`)
    .end((err, res) => {
      assert.notOk(err, `Error deleting user: \n${err}`);
    	assert(res.statusCode == 200,
        `User not found, did not delete.
        \nStatus Code: ${res.statusCode}`);
    	assert.ok(res.body, 'User not destroyed');
    	done();
    });
	});
});