import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, primaryTypeClass, rawPayload){
        debugger;
        var results = this._super(store, primaryTypeClass, rawPayload);
        for(var result in results){
            if(!result.restaurantLocationID){
                result.restaurantLocationID = result.place_id;
            }
        }
        return results;
    }
});
