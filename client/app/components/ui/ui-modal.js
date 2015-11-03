import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'modal'],
    
    didInsertElement(){
        var context = this;
        var element = Ember.$(context.get('element'));

        element.modal({
            onShow(){
                return context.triggerPassedInEvent('show');
            },
            onVisible(){
                if(!context.get('open')){
                    context.set('open', true);
                }
                return context.triggerPassedInEvent('visible');
            },
            onHide(){
                return context.triggerPassedInEvent('hide');
            },
            onHidden(){
                if(context.get('open')){
                    context.set('open', false);
                }
                return context.triggerPassedInEvent('hidden');
            },
            onApprove(){
                return context.triggerPassedInEvent('approve');
            },
            onDeny(){
                return context.triggerPassedInEvent('deny');
            }
        });
    },
    triggerPassedInEvent(action){
        if(this.attrs[action]){
            if(typeof this.attrs[action] === "string"){
                return this.sendAction(this.attrs[action]);
            } else {
                return this.attrs[action].apply(this);
            }
        }
    },
    toggleModal: function(){
        var element = Ember.$(this.get('element'));
        if(element){
            element.modal(this.get('open') ? 'show' : 'hide');
            Ember.run.later(() => {
                element.modal('refresh');
            }, 100);
        }
    }.observes('open'),
});
