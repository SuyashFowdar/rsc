import { types, setModel } from '../lib/utils/model';

export default setModel('Route', {
    code: String,
    locations: [{
        type: types.ObjectId,
        ref: 'Location'
    }],
    noOfPeople: Number
});