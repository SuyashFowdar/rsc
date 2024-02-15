import { types, setModel } from '../lib/utils/model';

export default setModel('Trip', {
    date: String,
    employee: {
        type: types.ObjectId,
        ref: 'Employee'
    },
    route: {
        type: types.ObjectId,
        ref: 'Route'
    },
    noOfPeople: Number,
    cost: Number
});