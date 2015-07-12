import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('index', { path: '/' });

    this.route('restaurant-locations', { path: '/restaurantLocations' });
    this.route('restaurant-location', { path: '/restaurantLocations/:restaurantLocation_id' });
    this.route('restaurants', { path: '/restaurants' });
    this.route('restaurant', { path: '/restaurants/:restaurant_id' });

    this.route('ratings', { path: '/ratings' });

    this.route('login', { path: '/login' });
    this.route('register', { path: '/register' });
    this.route('profile', { path: '/profile' });
});

export default Router;
