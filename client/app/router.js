import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});
Router.map(function() {
    this.route('index', { path: '/' });

    this.route('restaurant-locations', function(){
        this.route('results');
    });
    this.route('restaurant-location', { path: '/restaurant-locations/:restaurantLocation_id' });
    this.route('restaurants');
    this.route('restaurant', { path: '/restaurants/:restaurant_id' });

    this.route('ratings');

    this.route('login');
    this.route('register');
    this.route('profile');
    this.route('logout');
});

export default Router;
