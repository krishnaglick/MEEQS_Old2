import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function() {
    this.route('index', { path: '/' });

    this.route('restaurants', { path: '/restaurants' });
    this.route('restaurant', { path: '/restaurants/:id' });
    this.route('restaurant-location', { path: '/restaurants/:id/:locationID' })
    this.route('restaurant-rate', { path: '/restaurants/:id/:locationID/rate' });

    this.route('ratings', { path: '/ratings' });

    this.route('tag-categories', { path: '/tag-categories' });
    this.route('tags', { path: '/tags' });

    this.route('users', { path: '/users' });
    this.route('user', { path: '/users/:id' });
    this.route('user-profile', { path: '/users/:id/profile' });
    this.route('user-ratings', { path: '/users/:id/ratings' });

    this.route('login', { path: '/login' });
    this.route('register', { path: '/register' });
});

export default Router;
