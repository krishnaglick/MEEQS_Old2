/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  AuthController: {
    '*': true
  },
  RatingsController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  },
  RestaurantLocationsController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  },
  RestaurantsController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  },
  TagCategoriesController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  },
  TagsController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  },
  UsersController: {
    '*': ['isAuthenticated', 'protectedAttributes'],
    'destroy': 'isAdmin',
    'remove': 'isAdmin'
  }
};
