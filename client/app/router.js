import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('Ratings');
  this.route('RestaurantLocations');
  this.route('Restaurants');
  this.route('TagCategories');
  this.route('Tags');
  this.route('Users');
});

export default Router;
