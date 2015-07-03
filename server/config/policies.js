
module.exports.policies = {
  //Need Auth Mocking!
  AuthController: {
    '*': true
  },
  /*RatingsController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': ['isAuthenticated', 'protectedAttributes'],
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': ['isAuthenticated', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  },
  RestaurantLocationsController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': ['isAuthenticated', 'protectedAttributes'],
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': ['isAuthenticated', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  },
  RestaurantsController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': ['isAuthenticated', 'protectedAttributes'],
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': ['isAuthenticated', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  },
  TagCategoriesController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': ['isAuthenticated', 'protectedAttributes'],
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': ['isAuthenticated', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  },
  TagsController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': ['isAuthenticated', 'protectedAttributes'],
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': ['isAuthenticated', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  },
  UsersController: {
    'find': 'isAuthenticated',
    'findOne': true, //Need to get auth mocking so this can be isAuthenticated
    'populate': 'isAuthenticated',
    'create': 'protectedAttributes',
    'update': ['isAuthenticated', 'protectedAttributes'],
    'add': 'protectedAttributes',
    'destroy': ['isAuthenticated', 'isAdmin'],
    'remove': ['isAuthenticated', 'isAdmin']
  }*/
};
