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
      assert.notOk(err, `Error creating restaurant: \n${err}`);
      assert(res.statusCode == 201,
        `Restaurant was not created.
        \nStatus Code: ${res.statusCode}`);
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
        assert.ok(err, 'User did not receive error when trying to perform admin action (deleting a restaurant)');
        assert.ok(createdRestaurantID, 'Restaurant ID lost :/');
        assert(res.statusCode == 401,
          `User is somehow authorized to delete things.
          \nStatus Code: ${res.statusCode}`);
        done();
      });
  });

  it('should create test tag categories', (done) => {
    user
    .post('/api/v1/tagCategories')
    .send({tagCategories: {name: 'testTagCategory1', description: 'testTagCategoryDesc1'}})
    //Below two lines did not work, need to be able to post arrays!
    //.send({tagCategories: {name: 'testTagCategory2', description: 'testTagCategoryDesc2'}})
    //.send({tagCategories: {name: 'testTagCategory3', description: 'testTagCategoryDesc3'}})
    .end((err, res) => {
      assert.notOk(err, `There was an error: ${err}`);
      assert(res.statusCode == 201, 
        `Not created. Status Code: ${res.statusCode}`);
      done();
    });
  });

  var createdTagID;
  it('should create test tags', (done) => {
    user
      .post('/api/v1/tags')
      .send({tags: {name: 'test'}})
      .end((err, res) => {
        assert.notOk(
          err,
          `Error creating test tags.
          \nError: \n${err}`);
        let tag = res.body.tags;
        createdTagID = tag.tagID;
        assert.ok(createdTagID, 'No tag ID!');
        done();
      });
  });

  it('should create a restaurant location', (done) => {
    assert.ok(createdRestaurantID, 'what the fuck');
    user
      .post('/api/v1/restaurantLocations')
      .send({restaurantLocations: {
        restaurantID: createdRestaurantID,
        tags: createdTagID,
        place_id: 'WIP'
      }})
      .end((err, res) => {
        if(err) console.log(err);
        assert.notOk(
          err,
          `There was an error creating a restaurant location with ID ${createdRestaurantID}`);
        done();
      });
  });

  it('should delete a restaurant', (done) => {
    admin
      .del(`/api/v1/restaurants/${createdRestaurantID}`)
      .end((err, res) => {
        if(err) console.log(err);
        assert.notOk(err, `There was an error: ${err}`);
        assert(res.statusCode == 200, 'Restaurant was not deleted');
        done();
      });
  });
});