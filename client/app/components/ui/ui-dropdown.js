import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'select',
    classNames: ['ui', 'dropdown'],
    classNameBindings: ['disabled'],
    attributeBindings: ['multiple'],

    formattedOptions: [],
    multiple: false,
    init(){
        this._super();
        this.set('multiple', this.get('class') && this.get('class').indexOf('multiple') !== -1);
    },
    didInsertElement(){
        var context = this;

        this._super();
        this.set('dropdown', this.$().dropdown({
            onChange(value, text, element){
                let index = context.get('formattedOptions').map((option) => {
                    return option.index + '';
                }).indexOf(value + '');
                let option = context.get('formattedOptions')[index].value;
                
                if(context.attrs.onChange){
                    context.attrs.onChange(value, text, element, option, context.get('dropdown'));
                }
                context.set('updating', true);
                var array = context.$().dropdown('get value');
                context.set('value', array[array.length-1]);
                context.set('updating', false);
            }
        }));
        if(this.get('value')){
            this.notifyPropertyChange('value');
        }
    },
    updateOptions: function(){
        var formattedOptions = [];
        var textProperty = this.get('textProperty'),
            valueProperty = this.get('valueProperty');
        this.get('options').forEach((option) => {
            formattedOptions.push(
                Ember.Object.create({
                    text: option.get(textProperty),
                    index: option.get(valueProperty),
                    value: option
                })
            );
        });
        this.set('formattedOptions', formattedOptions);
    }.observes('options', 'options.isFulfilled').on('init'),
    update: function(){
        if(!this.get('updating')){
            if(this.get('multiple')){
                this.$().dropdown('set exactly', this.get('value').map((value) => {
                    return value+'';
                }));
            } else {
                this.$().dropdown('set value', this.get('value')[this.get('valueProperty')]);
            }
        }
    }.observes('value'),
    updateDisabled: function(){
        var element = this.$().parent('div.ui.dropdown');
        element[this.get('disabled') ? 'addClass' : 'removeClass']('disabled');
    }.observes('disabled')
});
