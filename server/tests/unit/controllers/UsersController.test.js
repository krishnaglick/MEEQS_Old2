var request = require('supertest');
var assert = require('assert');

describe('UsersController', () => {
	var createdUserID;
	it('should create a user', (done) => {
		request(sails.hooks.http.app)
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
		request(sails.hooks.http.app)
    .get(`/api/v1/users/${createdUserID}`)
    .end((err, res) => {
    	assert(res.statusCode == 200, 'User not found');
    	let users = res.body.users;
    	assert.ok(users, 'User not found');
    	assert(users.username == 'test', 'Wrong username pulled');
    	done();
    });
	});

	it('should delete created test user', (done) => {
		request(sails.hooks.http.app)
    .get(`/api/v1/users/destroy/${createdUserID}`)
    .end((err, res) => {
    	assert(res.statusCode == 200, 'User not found');
    	assert(res.body == null, 'User not destroyed');
    	done();
    });
	});

	var potato = {
    	users: [
    		{username: 'potato1', password: 'test12'},
    		{username: 'potato2', password: 'test12'},
    		{username: 'potato3', password: 'test12'}
    	]
    };

	it('should create multiple users', (done) => {
		request(sails.hooks.http.app)
    .post('/api/v1/users')
    .send(potato)
    .end((err, res) => {
    	assert(res.statusCode == 201, 'User was not created');
    	let users = res.body.users;
    	assert.ok(users, 'User was not created');
    	assert(users.length == 3, 'All users were not created.')
    	createdUserID = [
    		users[0].userID,
    		users[1].userID,
    		users[2].userID
    	];
    	assert(createdUserID.length == 3, 'Don\'t have user ids');
    	done();
    });
	});
});