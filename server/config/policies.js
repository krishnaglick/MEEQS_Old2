
module.exports.policies = {
  AuthController: {
    '*': true
  },
  RatingsController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  },
  RestaurantLocationsController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  },
  RestaurantsController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  },
  TagCategoriesController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  },
  TagsController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  },
  UsersController: {
    'find': [],
    'findOne': [],
    'populate': [],
    'create': ['protectedAttributes'],
    'update': ['protectedAttributes'],
    'add': ['protectedAttributes'],
    'destroy': ['isAdmin'],
    'remove': ['isAdmin']
  }
};
