import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'select',
    classNames: ['ui', 'dropdown'],
    didInsertElement(){
        var context = this;

        this._super();
        this.set('dropdown', this.$().dropdown({
            onAdd(value, text, element){
                console.log(value);
            },
            onChange(value, text, element){
                context.set('updating', true);
                var array = context.$().dropdown('get value');
                context.set('value', array[array.length-1]);
                context.set('updating', false);
            },
            allowAdditions: this.attrs.allowAdditions || false
        }));
        if(this.get('value')){
            this.notifyPropertyChange('value');
        }
    },
    update: function(){
        if(!this.get('updating')){
            this.$().dropdown('set value', this.get('value.id'));
        }
    }.observes('value')
});
