var request = require('supertest'),
		agent;
var assert = require('chai').assert;

describe('AdminLogin', () => {
	it('should login as admin', (done) => {
		agent = request.agent(sails.hooks.http.app);
		agent
			.post('/login')
			.send({username: 'testadmin', password: 'testadmin'})
			.end((err, res) => {
			  done();
			});
	});
});

describe('UsersController', () => {
	var createdUserID;
	it('should create a user', (done) => {
		agent
    .post('/api/v1/users')
    .send({users: { username: 'test', password: 'test12' }})
    .end((err, res) => {
    	assert(res.statusCode == 201, 'User was not created');
    	let users = res.body.users;
    	assert.ok(users, 'User was not created');
    	createdUserID = users.userID
    	assert.ok(createdUserID, 'Don\'t have user id');
    	done();
    });
	});

	it('should find the created test user', (done) => {
		agent
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
		agent
    .get(`/api/v1/users/destroy/${createdUserID}`)
    .end((err, res) => {
    	//console.log(err);
    	assert(res.statusCode == 200, 'User not found, did not delete');
    	assert(res.body == null, 'User not destroyed');
    	done();
    });
	});
});