import Ember from 'ember';

export default Ember.Component.extend({
    messages: [],
    color: '',
    isVisibleBinding: 'messages.length',
    classNames: ['ui', 'message'],
    classNameBindings: ['isVisible::hidden', 'color'],
    init(){
        this._super();
        if(this.isVerified === 0){
            this.set('isVisible', false);
        }
    }
});
