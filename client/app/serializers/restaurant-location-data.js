import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    serialize(snapshot, options){
        var savable = this._super(snapshot, options);
        savable.place_id = savable.placeID;
        delete savable.placeID;
        return savable;
    }
});
