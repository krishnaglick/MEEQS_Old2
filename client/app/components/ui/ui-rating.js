import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'rating'],
    didInsertElement(){
        this._super();

        var element = Ember.$(this.get('element'));
        element.rating({
            initialRating: this.get('value') || 0,
            maxRating: this.get('max-rating') || 5,
            clearable: this.get('clearable') || true
        });
        if(this.get('enabled') === false){
            element.rating('disable');
        }

        element.rating('setting', 'onRate', (value) => {
            this.set('value', value);
        });
    }
});
