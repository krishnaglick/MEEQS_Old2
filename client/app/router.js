import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});
Router.map(function() {
    this.route('index', { path: '/' });
    this.route('profile');
    this.route('logout');
});

export default Router;
