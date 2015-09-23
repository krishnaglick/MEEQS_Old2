import Ember from 'ember';

export default Ember.Component.extend({
    tagName: Ember.computed('formify', function(){
        return this.get('formify') ? 'form' : 'div';
    }),
    classNames: ['ui', 'modal'],
    classNameBindings: ['formify:form'],

    didInsertElement(){
        var context = this;
        var element = Ember.$(context.get('element'));

        element.modal({
            onHidden(){
                if(context.get('open')){
                    context.set('open', false);
                }
            },
            onApprove(){
                return context.triggerPassedInEvent('approve');
            },
            onDeny(){
                return context.triggerPassedInEvent('deny');
            }
        });
    },
    triggerPassedInEvent(action) {
        return this.attrs[action].apply(this);
    },
    toggleModal: function(){
        var element = Ember.$(this.get('element'));
        if(element){
            element.modal(this.get('open') ? 'show' : 'hide');
        }
    }.observes('open'),
});
