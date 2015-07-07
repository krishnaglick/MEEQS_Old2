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

describe('Restaurant Tests', () => {
	var createdRestaurantID;
	it('should create a restaurant', (done) => {
   user
    .post('/api/v1/restaurants')
    .send({restaurants: { name: 'test restaurant', description: 'I am a test restaurant!' }})
    .end((err, res) => {
    	assert(res.statusCode == 201, 'Restaurant was not created, status code');
    	let restaurant = res.body.restaurants;
    	assert.ok(restaurant, 'Restaurant was not created, returned restaurant');
    	createdRestaurantID = restaurant.restaurantID;
    	assert.ok(createdRestaurantID, 'Don\'t have restaurant id');
    	done();
    });
	});

	it('should fail to delete a restaurant', (done) => {
		user
			.del(`/api/v1/restaurants/${createdRestaurantID}`)
			.end((err, res) => {
				assert.ok(err, 'No error when user tries to delete something!');
				assert.ok(createdRestaurantID, 'Restaurant ID lost :/');
				assert(res.statusCode == 401, 'User is somehow authorized to delete things');
				done();
			});
	});

	it('should create test tags', (done) => {
		user
			.post('/api/v1/tags')
			.send({tags: {name: 'test'}})
			.end((err, res) => {
				//WIP
				if(err) console.log(err);
				done();
			});
	});

	it('should create a restaurant location', (done) => {
		user
			.post('/api/v1/restaurantLocations')
			.send({
				restaurantID: createdRestaurantID,
				tags: 'test',
				placeID: 'WIP'
			})
			.end((err, res) => {
				if(err) console.log(err);
				done(); //WIP
			});
	});

	it('should delete a restaurant', (done) => {
		admin
			.del(`/api/v1/restaurants/${createdRestaurantID}`)
			.end((err, res) => {
				assert.notOk(err, `There was an error: ${err}`);
				assert(res.statusCode == 200, 'Restaurant was not deleted');
				assert(res.body == null, 'Restaurant not destroyed');
				done();
			});
	});
});