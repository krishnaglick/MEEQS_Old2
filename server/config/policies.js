
module.exports.policies = {
  AuthController: {
    '*': true
  },
  RatingsController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  },
  RestaurantLocationsController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  },
  RestaurantsController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  },
  TagCategoriesController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  },
  TagsController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  },
  UsersController: {
    'find': ['isAuthenticated', 'isVerified'],
    'findOne': ['isAuthenticated', 'isVerified'],
    'populate': ['isAuthenticated', 'isVerified'],
    'create': ['protectedAttributes'],
    'update': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'add': ['isAuthenticated', 'isVerified', 'protectedAttributes'],
    'destroy': ['isAuthenticated', 'isVerified', 'isAdmin'],
    'remove': ['isAuthenticated', 'isVerified', 'isAdmin']
  }
};
