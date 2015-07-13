import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, primaryTypeClass, rawPayload){
        var highest_id = Math.max.apply(Math, rawPayload['restaurantLocations'].map((result) => { return result.restaurantLocationID; }));
        if(isNaN(highest_id)){
            highest_id = 0;
        }
        rawPayload['restaurantLocations'].forEach((result) => {
            if(!result[this.primaryKey]){
                result.soft = true;
                result[this.primaryKey] = highest_id;
                highest_id++;
            }
        });

        var results = this._super(store, primaryTypeClass, rawPayload);
        return results;
    }
});
