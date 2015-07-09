import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('index', { path: '/' });

    this.route('restaurants', { path: '/restaurants' });
    this.route('restaurant', { path: '/restaurants/:restaurant_id' });
    this.route('restaurant-location', { path: '/restaurants/:restaurant_id/:restaurantLocation_id' });
    this.route('restaurant-rate', { path: '/restaurants/:restaurant_id/:restaurantLocation_id/rate' });

    this.route('ratings', { path: '/ratings' });

    this.route('tag-categories', { path: '/tag-categories' });
    this.route('tags', { path: '/tags' });

    this.route('users', { path: '/users' });
    this.route('user', { path: '/users/:user_id' });
    this.route('user-profile', { path: '/users/:user_id/profile' });
    this.route('user-ratings', { path: '/users/:user_id/ratings' });

    this.route('login', { path: '/login' });
    this.route('register', { path: '/register' });
});

export default Router;
